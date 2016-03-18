userSubscribed=[
	{
		username: 'Abhinav',
		online: true
	},
	{
		username: 'Akshay',
		online:false
	},
	{
		username: 'Abhishek',
		online:true
	}
];

Template.auctionSidebar.helpers({
	userSubscribed:function(){
		var id = Template.currentData()._id;

		return Meteor.users.find({'profile.watching': id});
	},

	emptyLobby : function(){
		var id = Template.currentData()._id;
		return Meteor.users.find({'profile.watching': id}).count()===0;
	}
});

Template.userListItem.helpers({
	'online' : function(){
		var doc=Template.currentData();
		return doc.status.online;
	},

	'idle' : function(){
		var doc=Template.currentData();
		return doc.status.idle;
	}
})

