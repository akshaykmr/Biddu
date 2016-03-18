Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',

	waitOn : function(){
		return [Meteor.subscribe('allAuctions') , Meteor.subscribe('allUsers')] ;
	}
});

routeHooks = {
	loggedIn : function(){
		if(!Meteor.user()){
			Router.go('/');

			/*if(Meteor.isClient){
				toaster.promptLogin();
			}
*/
		}else{
			this.next();
		}
	}
};

Router.route('/',function(){

	this.render('landing');
});


Router.route('/auctions', function(){
	this.render('auctions');

	if(Meteor.isClient){

	}
});


Router.route('/notifications',
	{
		template : 'notifications',

		onBeforeAction : routeHooks.loggedIn ,

		action: function(){
			this.render();

			if(Meteor.isClient){

			}
		}
	});

Router.route('/createAuction', {
	template : 'createAuction',
	onBeforeAction: routeHooks.loggedIn,

	action : function(){
		this.render();
	}
});

Router.route('/auctionPage/:id', {
	template: 'auctionPage',
	name : 'auctionPage',

	data : function(){
		return Auctions.findOne({_id :this.params.id });
	},

	waitOn: function(){
		return [
		Meteor.subscribe('auctionLogs',this.params.id),
	    Meteor.subscribe('chartData',this.params.id),
	    Meteor.subscribe('announcements',this.params.id)
	    ];
	},

	action: function(){
		DeeJay.reset();
		this.render();
	}
});


