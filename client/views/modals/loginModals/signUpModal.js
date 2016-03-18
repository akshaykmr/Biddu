Template.signUpModal.events({
	'click .loginFacebook' : function(e, templ){
		
		
		templ.$('#registerModal').closeModal();
		loginMethods.facebook();
	},

	'click .loginGoogle' : function(e,templ){
		e.preventDefault();
		templ.$('#registerModal').closeModal();
		loginMethods.google();
	},

	'click .loginTwitter' : function(e,templ){
		e.preventDefault();
		templ.$('#registerModal').closeModal();
		loginMethods.twitter();
	}
});