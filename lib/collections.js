
Auctions= new Mongo.Collection('Auctions');
/*
	auction = {
	
		ownerId: ,
		ownerProfile : {name, picture, reputation}
		auctionName: string,
		description: string,
		items: string
		picture : url,
		startBid : Number,
		currentBid: Number,
		startTime : new Date(),
		endDate : Date(),
		leading : {userProfile,_id }
		score: 0//default

		winner : {userProfile, _id};
	}


*/


AuctionLogs = new Mongo.Collection('AuctionLogs');

/*
	id : auctionId
	logs= [  {  event: {userProfile, activity, date : new Date(),bid, code }  }  ]


	code : 0 -join, 1 - bid

*/

Announcements = new Mongo.Collection('Announcements');
/*

	{

		auctionId,
		announcement,
		date

	}
		
*/

Comments= new Mongo.Collection('Comments');
/*
	Comment = {
		auctionid : 
		content : { name, image, content}
	}
*/


/*USER

	{
		watching : [auctionId]
	}


*/


Notifications = new Mongo.Collection('Notifications');
/*
notification = {
	addressee : userId,
	content   : string,
	details	  : doc/null
	read	  : boolean,
	dismissed : boolean,    
	date 	  : new Date()
	priority  : 1,2,3,
}*/


Users= Meteor.users;


ChartCollection = new Mongo.Collection('ChartCollection');
/*
	{
		_id : auctionId,
		bar : [{bid,userProfile, date }]
	}

*/