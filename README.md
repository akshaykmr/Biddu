### Hackathon Submission

#####Video demo https://youtu.be/A5FAvjZvsyc
#####Live link https://biddu.au-syd.mybluemix.net
> note: the live link is hosted on a trial bluemix account. If it doesn't open anymore open an issue and I'll 
set up some alternative hosting.


#####Deploying 

1.Create a bluemix instance with node.js template. give a name to it say 'myapp'. will use 'myapp' for rest of the steps.

install cloud foundry online tool.


2.add text-to speech, trade off analytics to myapp.
--both of above can be done using dashboard or the cloud foundry tool

3.add compose for mongodb database from dashboard.
create a mongodb database from compose dashboard and create a user.

3.apply compose settings from dashboard with environment variable "MONGO_URL"using cloudfoundry tool.
eg. (substitute your created username and password which you created in compose)

```cf set-env myapp MONGO_URL 'mongodb://<username>:<password>@yourdatabaseurlfromcomposedashboard'```



#####In the project directory

4.connect to bluemix

```cf api https://api.au-syd.bluemix.net```

5.login using your ibm credentials 

 ```cf login```

 

6. To deploy run
``` cf push myapp -b https://github.com/ind1go/bluemix-buildpack-meteor.git```

access the app from the url seen in dashboard




####iPhone/Apple devices:

1. you must have a mac for this. No need for developer account however since you can run app locally for free in xcode 7.
2. Install meteor tool https://www.meteor.com/install
3.  from project directory ```meteor run ios-device --mobile-server https://my-deployed-app-url-from-dashboard --settings ./settings.json``` 
settings parameter is optional 

This will open a xcode project from where you can run the app simulator or your device.


####Note:
currently facebook and google oauth redirect urls are set for my app. i.e they wont run on a url other than "biddu.au-syd.mybluemix.net"
to fix this create your own facebook/google/twitter appId and keys for oauth and replace them in server/startup.js

Amazon s3 is used to store images for auctions. you need to put in your s3 credentials or the app will select a random image from public folder.
to do this create a new file settings.json in project root.

```//settings.json
{	
	"facebook": {
		"appId": "",
		"secret": ""
	},
	"twitter": {
		"consumerKey": "",
		"secret": ""
	},
	"google": {
		"clientId": "",
		"secret": ""
	},
	"AWS": {
		"AWSAccessKeyId": "your key",
		"AWSSecretAccessKey": "secret"
	},
	"deploy": "true"
}

```
- then set this json as environment variable named "METEOR_SETTINGS" using cf 	env command from cloud foundry tool. 
- now restage your app with ```cf restage myapp``` 
	for settings to take effect.
