Template.accountDropdown.onRendered(function(){
	$("#manageAccountDropdown").dropdown({ hover: true,
		inDuration: 0, 
		constrain_width: false,
		outDuration:100,
		belowOrigin: true
	});	
});

Template.loginDropdown.onRendered(function(){

	$("#signInDropdown").dropdown({ hover: true,
		inDuration: 0,
		constrain_width: true,
		outDuration:100,
		belowOrigin: true
	});	

});


/*********************************************************************/

Template.notifyDropdown.onCreated(function () {

  this.subscribe('notifications');
});

Template.notifyDropdown.onRendered(function(){

	$("#notificationDropdown").dropdown({ hover: true,
		inDuration: 0,
		constrain_width: false,
		outDuration:100,
		belowOrigin: true
	});	

});

Template.notifyDropdown.helpers({
	'notificationEntry' : function(){
		return Notifications.find({read : false},{sort : {date : -1}});
	}
});

/*******************************************************/
