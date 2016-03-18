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


Template.auctionSidebar.events({
	
	'click #chatButton':function(){
		console.log('lel');

		var hostname=window.location.hostname;
		if(hostname==='localhost')
			window.open( 'http://localhost:3000/chat/'+Session.get('chatRoomId'), '_blank');
		else
		window.open('https://biddu.mybluemix.net/chat/'+Session.get('chatRoomId'),'_blank');
	}
});
