Template.layout.onRendered( function(){
		$(".button-collapse").sideNav({
			closeOnClick: true
		});		
				
});

Template.layout.events({
	'click .signIn' : function( e, templ){
		 $('#loginModal').openModal();
	},

	'click .signUp' : function(e,templ){
		$('#registerModal').openModal();
	},

	'click .signOut' : function(){
		onLogout();
	},

	'click .loginFacebook': function(){
		loginMethods.facebook();
	},

	'click .loginGoogle' :function(){
		loginMethods.google();
	},
		'click .loginTwitter' :function(){
		loginMethods.twitter();
	}
});


Template.layout.helpers({
	'auctionPage': function(){
		var path =Router.current().route.getName();
		var route= Router.current().route.path();
		if(path==='auctionPage'||route==='/')
			return true;
		else
			return false;
	}
})