Template.chatRoom.helpers({
	chatRoomURL: function(){
			return 'https://testbed.dynu.com/r/'+Session.get('chatRoomId');
	}
});