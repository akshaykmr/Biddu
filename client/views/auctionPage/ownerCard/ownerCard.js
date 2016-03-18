Template.ownerCard.helpers({
	'owner' : function(){
		var pData= Template.parentData();
		if(pData.ownerId===Meteor.userId())
			return true;
	}
});

Template.ownerCard.events({
	
});