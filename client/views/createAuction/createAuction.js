/*Template.createAuction.onRendered(function(){
	this.$('#items').focus();
	this.$('#auctionName').focus();
	console.log('see me?');
});*/

Template.createAuction.events({
	'click #createAuctionSubmit' : function(event, templ){

		event.preventDefault();

		var auctionDetail = {};

		var flag=false;

		var name= templ.$('#auctionName').val().trim();
		if(!name){
			Materialize.toast('auction name is empty!',3000);
			flag=true;
		}else{
			auctionDetail.auctionName=name;
		}

		var items=templ.$('#items').val().trim();

		if(!items){
			Materialize.toast("items field is empty. you've got to sell something!",3000);
			flag=true;
		}else{
			auctionDetail.items=items;
		}

		var description= templ.$('#description').val().trim();
		if(!description){
			Materialize.toast('please add something in the description',3000);
			flag=true;
		}else{
			auctionDetail.description=description;
		}

		var startBid= parseInt(templ.$('#startBid').val().trim());
		if(!startBid){
			Materialize.toast('please enter a starting bid price!',3000);
			flag=true;
		}else{
			if(startBid<=0){
				Materialize.toast('Hosting a giveaway? :P',3000);
				flag=true;
			}
			auctionDetail.startBid=startBid;
		}

		if(flag)
			return;


		var file =templ.find('#fileInput').files[0];




		if(file){

			Materialize.toast('wait for it.....',1000);

			uploader = new Slingshot.Upload("photos");

			uploader.send(file, function (error, url) {
			  if (error) {

			  	Materialize.toast('something went wrong :(',5000);
			  	Materialize.toast('check your s3 configuration',5000);
			    // Log service detailed response.
			    console.error('Error uploading', uploader.xhr.response);

			    var placeholder=['1.jpg','2.jpg','3.jgp'];
			    var randImage = placeholder[Math.floor(Math.random() * placeholder.length)];
			    Materialize.toast('Setting placeholder image..',6000);
			    auctionDetail.picture='/'+randImage;
			  }else{
			  	auctionDetail.picture=url;	
			  }		  
			  	//Session.set('image', url);
			    //Meteor.users.update(Meteor.userId(), {$push: {"profile.files": url}});
			    

			    if(!flag){	//console.log(auctionDetail);

			    	var user= Meteor.user();
			    	var id=Auctions.insert({
			    					ownerId : user._id,
			    					ownerProfile: user.profile,
			    					auctionName : auctionDetail.auctionName,
			    					items: auctionDetail.items,
			    					description: auctionDetail.description,
			    					picture :auctionDetail.picture,
			    					startBid: auctionDetail.startBid,
			    					startTime: new Date(),
			    					score:0,

			    					winner: false});
			    	AuctionLogs.insert({_id : id, logs :[]});
			    	ChartCollection.insert({_id : id, bar:[]});

			    	var goThere= '/auctionPage/'+id;

			    	$("#create-auction").get(0).reset();
			    	console.log('test');

			    	Materialize.toast('wohoo! Auction created :D',2000,'',function(){
			    		Materialize.toast('<span><a class="amber-text" href="'+goThere+'">Click me to go there</a> </span> ',4000,'rounded');
			    	});
			    }
			});
		}else{
			Materialize.toast('please add a picture',2000);
			/* TODO : add random pic later*/
		}

	}
});

