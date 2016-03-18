Template.auctionLogs.helpers({
	'event' : function(){

		var compare= function(a, b){return parseInt(b.bid) - parseInt(a.bid) ;};
		
		var id= Template.currentData()._id;
		return AuctionLogs.findOne({_id :id }).logs.sort(compare);
	},
	'emptyLog':function(){
		var id= Template.currentData()._id;
		return AuctionLogs.findOne({_id:id}).logs.length===0;
	}
});