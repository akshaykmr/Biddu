var production= Meteor.settings.deploy==='true';

Slingshot.createDirective("photos", Slingshot.S3Storage, {  

  bucket: 'biddu',
  acl: 'public-read',
 region: 'ap-southeast-1',
  //DEPLOY
  AWSAccessKeyId : production? Meteor.settings.AWS.AWSAccessKeyId : 'put your own key here',
  AWSSecretAccessKey : production? Meteor.settings.AWS.AWSSecretAccessKey  : 'put your own key here',

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    //var user = Meteor.users.findOne(this.userId);
    return 'photos' + '/'+ this.userId + "/" + file.name;
  }
});
