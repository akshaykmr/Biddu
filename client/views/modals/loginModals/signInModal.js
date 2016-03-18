Template.signInModal.events({
	'click .loginFacebook' : function(e,templ){
		e.preventDefault();
		templ.$('#loginModal').closeModal();
		loginMethods.facebook();
		
	},

	'click .loginGoogle': function(e,templ){
		e.preventDefault();
		templ.$('#loginModal').closeModal();
		loginMethods.google();
	}	
});