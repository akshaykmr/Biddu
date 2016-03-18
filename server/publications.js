Meteor.publish('notifications',function(){
	return Notifications.find({addressee : this.userId, read : false}, { $sort : { date : -1}});
});

Meteor.publish('allNotifications',function(){
	return Notifications.find({addressee: this.userId});
});


Meteor.publish('allAuctions', function(){
	return Auctions.find();
});

Meteor.publish('auctionLogs', function(auctionId){
	return AuctionLogs.find({_id : auctionId});
});	

Meteor.publish('allUsers',function(){
	return Users.find({},{fields : {profile :1,
									status  :1 } });
});

Meteor.publish('chartData',function(auctionId){
	return ChartCollection.find({_id : auctionId});
});

Meteor.publish('announcements', function(auctionId){
	return Announcements.find({"auctionId": auctionId});
});

Meteor.methods({
	'bid': function(auctionId,bid){
		if(!Meteor.user())
			throw new Meteor.Error('logged out');

		var auction= Auctions.findOne(auctionId);

		var currentBid=auction.currentBid;

		if(!currentBid){
			if(bid>auction.startBid){
				Auctions.update(auctionId, 
					{$set : {currentBid : bid, leading : {userProfile: Meteor.user().profile, id: Meteor.userId()}}, 
					 $inc: {score: 1}
					});
				return {
					pass: true
				};
			}else{

				return {
					pass: false,
					reason: 'bid not high enough -_-"'
				};
			}
		}


		var range=[65,325,1625,6500,16250,312500,65000,162500,3125000];
		var index=0;
		for (var i = 0; i < range.length; i++) {
			if(currentBid>range[i])
				index++;
			else
				break;
		}
		var increment=[3.25,16.25,32.5,65,162.5,325,650,1625,3250];

		if(bid> (currentBid+ increment[index])){ //
			Auctions.update(auctionId, {$set : {currentBid : bid, leading : {userProfile: Meteor.user().profile, id: Meteor.userId()}} });
			return {
				pass: true
			};

		}else{
			return{
				pass: false,
				reason: 'Next minimum bid amount is '+(currentBid+Math.ceil(increment[index])).toString()
			};
		}


	}
});
