Template.auctionPage.onCreated(function(){
	checkDesktop();
});

Template.auctionPage.helpers({
	'owner': function(){
		return Meteor.users.findOne({_id : this.ownerId});
	},

	'ownerPage' : function(){
		var data= Template.currentData();
		if(data.ownerId===Meteor.userId())
			return true;
	},
	'desktop': function(){
		return Session.get('desktop');
	}
});

Template.auctionPage.events({
	'click #bidButton' : function(event, templ){
		event.preventDefault();

		if(!Meteor.user()){
			Materialize.toast('you need to login !',3000);
			return;
		}
		if(Template.currentData().winner)
			return;
		
		var bid=templ.find('#bid').value;
		console.log('Bid is : '+bid.toString());

		var doc= Template.currentData();
		var userDoc= Meteor.user();
		if(userDoc.profile.watching.indexOf(doc._id)===-1){
			Meteor.users.update(Meteor.userId(), {$push : {'profile.watching' : doc._id}});

			//add announcement here
			var announce= userDoc.profile.name + 'has entered the lobby';
			Announcements.insert({auctionId: doc._id, announcement: announce});


			//log activity

			var eventJoin= {
				userProfile : userDoc.profile,
				activity : 'has joined the lobby !',
				date : new Date(),
				bid:bid-1,
				code: 0
			};
			AuctionLogs.update({_id : doc._id},{$push : {logs : eventJoin}});
			Auctions.update({_id: doc._id},{$inc: {score: 1}});

		}
		var bidLog= function(bid,doc,userDoc){
			var event = {
				userProfile : userDoc.profile,
				activity : 'bids '+bid.toString(),
				date : new Date(),
				bid : bid,
				code :1
			};

			AuctionLogs.update({_id : doc._id},{$push : {logs : event}});

			var announce= userDoc.profile.name +' bids '+ bid ;
			Announcements.insert({auctionId: doc._id, announcement: announce});



			//notify owner
			//Notifications.insert({addressee: doc.ownerId, content: ''})

			ChartCollection.update({_id: doc._id}, {$push : {bar :{date: new Date(), userProfile: userDoc.profile, bid: bid} }});
		};

		Meteor.call('bid',doc._id,bid,function(error,data){
			if(error)
				Materialize.toast('Something went wrong :(',5000);
			else{
				if(data.pass){
					bidLog(bid,doc, Meteor.user());
					Materialize.toast('your bid was successful !',3000);
				}else{
					Materialize.toast(data.reason,3000);
				}
			}
		});

/*		if(doc.currentBid){

			if(bid> doc.currentBid*1.00002){
				Auctions.update(doc._id, {$set : {currentBid : bid, leading : {userProfile: Meteor.user().profile, id: Meteor.userId()}} });
				bidLog(bid,doc, Meteor.user());
				Materialize.toast('your bid was successful !',3000);
			}else{
				Materialize.toast('bid not high enough -_-',3000);
			}

		}else{
			if(bid>= doc.startBid){
				Meteor.call()
				bidLog(bid,doc, Meteor.user());
				Materialize.toast('your bid was successful !',3000);

			}else{
				Materialize.toast('bid not high enough -_-',3000);
			}

		}*/

	},

	'click #stopAuction' : function(event, templ){
		event.preventDefault();
		var data= Template.currentData();

		if(!data.winner){

			Auctions.update(data._id, {$set : {winner: {userProfile: data.leading.userProfile, id: data.leading.id} }});
			Notifications.insert({addressee: data.leading.id, content: 'you have won an auction: "'+data.auctionName+'"', read: false, date: new Date()});
			Notifications.insert({addressee: data.ownerId, content: data.leading.userProfile.name +' has won the auction "'+data.auctionName+'"', read:false, date: new Date()});
		}

	},
	'click #select-info':function(){	
		clearTab();	
		$('.app-tab.info').addClass('visible');
	},
	'click #select-bidding':function(){
		clearTab();
		$('.app-tab.bidding').addClass('visible');
	},
	'click #select-stats':function(){
		clearTab();
		$('.app-tab.stats').addClass('visible');
	}	
});

function clearTab(){
	$('.app-tab.visible').removeClass('visible');
}

function checkDesktop(){
	if($(window).width()>992)
		Session.set('desktop',true);
	else
		Session.set('desktop',false);	
}

function resizeCanvas(){
	var canvas = document.querySelector('canvas');
	if(canvas)
		fitToContainer(canvas);
	function fitToContainer(canvas){
	  //  visually fill the positioned parent
	  canvas.style.width ='100%';
	  canvas.style.height='100%';
	  // set the internal size to match
	  canvas.width  = canvas.offsetWidth;
	  canvas.height = canvas.offsetHeight;
	}
}

Template.auctionPage.onRendered(function(){

	Session.set('desktop',($(window).width()>992?true:false));

	window.onresize=function(){
		checkDesktop();
		resizeCanvas();
	};

	var id= this.data._id;
	var init=true;
	localWatch= AuctionLogs.find({_id :id }).observe({
		added : function(){

		var buzzer = new buzz.sound('/sounds/notificationLoud.ogg');
		if(!init)
		buzzer.play();

	},

		changed: function(){
		var buzzer = new buzz.sound('/sounds/notificationLoud.ogg');
		if(!init)
		buzzer.play();

	},

		removed : function(){
		var buzzer = new buzz.sound('/sounds/notificationLoud.ogg');
		if(!init)
		buzzer.play();

	}
	});

	


	/* here comes watson */

	

	//initial audio here !!
	/*var announcement='testing Watson!, Hello Pikachu';
 	var encoded = encodeURIComponent(announcement);
 	console.log('encoded : '+encoded);*/

	/*var audio = document.createElement('audio');
	var att= document.createAttribute('autobuffer');

	audio.setAttributeNode(att);
	audio.src = '/synthesize?announcement='+encoded;
	audio.play();*/


	announcementWatchdog = Announcements.find().observe({
		added : function(document){
			if(!init){
				DeeJay.enqueue(document.announcement);
			}
		}
	});

	init =false;
	





});

Template.auctionPage.onDestroyed(function(){
	localWatch.stop();
	announcementWatchdog.stop();
});





/***************************************************************/

//Graph.. this better work.

Template.chart.onRendered(function(){

	MyChartData =undefined;
	resizeCanvas();

/*	if(Chart)
		console.log('chart is defined');*/

	var ctx = $("#myChart").get(0).getContext("2d");
	var id= this.data._id;
	loadData(id);

  var myLineChart = new Chart(ctx).Line(MyChartData, LineChartOptions);
	


	var init =true;
	chartWatch = ChartCollection.find({_id : id}).observe({
		added : function(){

			if(!init){
				loadData(id);
				//myLineChart.update()
				//var myLineChart = new Chart(ctx).Line(MyChartData, LineChartOptions);
				addDataToGraph(myLineChart, id);
			}
			
		} ,
		changed : function(){
			if(!init){
				loadData(id);
				//myLineChart.update()
				//var myLineChart = new Chart(ctx).Line(MyChartData, LineChartOptions);
				addDataToGraph(myLineChart, id);
			}

		} ,
		removed : function(){
			loadData(id);
			//myLineChart.update()
			var myLineChart = new Chart(ctx).Line(MyChartData, LineChartOptions);
// # hackathonCode
		} ,
	});
	init=false;

});

Template.chart.onDestroyed(function(){
	chartWatch.stop();
});	

loadData = function(id){
	var contents = ChartCollection.findOne(id).bar;
	MyChartData={};

	MyChartData.labels=contents.map(function(obj){
		return obj.userProfile.name;
	});
	MyChartData.datasets=[];
	MyChartData.datasets.push( {
            label: "Stats",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: contents.map(function(obj){
            	return obj.bid;
            })
        });

};

addDataToGraph = function(myLineChart, id){
	var contents = ChartCollection.findOne(id).bar;
	var set= contents[contents.length -1];
	myLineChart.addData([set.bid],set.userProfile.name);
};


/********/

