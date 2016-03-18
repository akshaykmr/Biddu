Template.auctions.helpers({
	'auctionItem' : function(){
		return Auctions.find({},{ sort : { score : -1}});
	}
});

Template.auctions.events({
	'click #addAuctionButton' : function(event){
		event.preventDefault();
		if(Meteor.user())
			Router.go('/createAuction');
		else
			Materialize.toast('You need to log in first!',2000);
	}
});

Template.auctions.onRendered(function(){
	$container=$('.masonry-grid');

	alignGrid();


 	function alignGrid(){
	 	$container.masonry({
	 	  columnWidth: 20,
	 	  gutter:10,
	 	  itemSelector: '.masonry-item'
	 	});

	 	$container.masonry('reloadItems');
	 	$container.masonry();
 	}

	 this.watcher=Meteor.setInterval(alignGrid,100);
});

Template.auctions.onDestroyed(function(){
	Meteor.clearInterval(this.watcher);
});	