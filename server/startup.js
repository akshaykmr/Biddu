Meteor.startup(function(){

	//this is just for development environment use environment variables rather than hard coded val.
	ServiceConfiguration.configurations.remove({
	    service: 'facebook'
	});
	
	ServiceConfiguration.configurations.insert({
	    service: 'facebook',
	    appId: '562804387220340',
	    secret: '28720c0f02b51ade887622e8b5ecf8af'
	});

	Accounts.loginServiceConfiguration.remove({
	  service: "google"
	});
	Accounts.loginServiceConfiguration.insert({
	  service: "google",
	  clientId: "560289550843-4ofalbcpciqjtvtag20el7q283qnl3u3.apps.googleusercontent.com",
	  secret: "D-hqAXq-NqseK6iMMZXg3Qze"
	});

	Accounts.loginServiceConfiguration.remove({
	  service: "twitter"
	});
	
	Accounts.loginServiceConfiguration.insert({
	  service: "twitter",
	  consumerKey: "PwdsVBXRneX7REuJ8mclsoyUd",
	  secret: "vrNbytV4fYBB1x9Lg3aTdasYG3K6jDOiVhTnxSeNDoPNZMMwfq",
	  requestPermission: ['email']
	});

});

Accounts.onCreateUser(function(options, user){

	options.profile.rep=100;
	options.profile.watching=[];

	if(user.services.facebook){
		//user.emails=[];
		user.accType= 'facebook';
		options.profile.picture= 'http://graph.facebook.com/'+user.services.facebook.id +'/picture';
		options.profile.gender=user.services.facebook.gender;
		//user.emails.push({address: user.services.facebook.email, verified: true});
	}else if( user.services.google){
		//user.emails=[];
		user.accType= 'google';
		var pictureLink= user.services.google.picture;
		delete user.services.google.picture;
		options.profile.picture= pictureLink;
		//GOOGLE PICTURE IS TOO BIG
		options.profile.gender=user.services.google.gender;
		//user.emails.push({address: user.services.google.email, verified: true});
	}
	else if(user.services.twitter){
		user.accType='twitter';
		options.profile.picture=user.services.twitter.profile_image_url;
		options.profile.firstName=user.services.twitter.screenName;
		user.profile=options.profile;
	}

	if(user.services.facebook||user.services.google){
		var name= options.profile.name;
		delete options.profile.name;
		options.profile.firstName=name.split(' ')[0];
		options.profile.lastName=name.split(' ')[1];
		user.profile = options.profile;
	}

	user.profile.name=options.profile.firstName +' ' + options.profile.lastName;
	 

	 user.addresses= [];

	 return user;

});