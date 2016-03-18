Template.winnerCard.onRendered(function(){
	var data = Template.currentData();


	var parentData= Template.parentData();

	console.log('parentData');
	console.log(Template.parentData());
	if(parentData.winner){
		DeeJay.enqueue('This auction is over.');

		if(parentData.winner.id===Meteor.userId()){
			//var buzzer = new buzz.sound('/sounds/john_cena.ogg');
			
			//buzzer.play();

			DeeJay.enqueue('Congratulations! you have won!');
		}else{
			DeeJay.enqueue(parentData.winner.userProfile.name);
			DeeJay.enqueue(' has won the auction with');
			DeeJay.enqueue(' '+ parentData.currentBid);	
		}
		
	}


	if(data._id ===Meteor.userId()){


		
	}
});