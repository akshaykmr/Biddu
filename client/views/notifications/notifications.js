

Template.notifications.onCreated(function(){
	this.subscribe('allNotifications');
});

Template.notifications.helpers({
	

	'noNotifications': function(){
		return Notifications.find().count()===0;
	},

	'unreadCount': function(){
		return Notifications.find({read: false}).count;
	}
});	
/*******************************************************/


Template.notificationCollection.helpers({
	'notification' : function(){
		return Notifications.find({},{ sort : { date : -1}});
	}
});


Template.collectionItem.onRendered(function(){
	$('.collapsible').collapsible({
	     accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	   });
});

Template.collectionItem.events({
	'click .n-coll-head' : function(e, templ){
		Meteor.call('markNotificationRead',templ.data._id);
	}
});
