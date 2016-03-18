loginMethods = {

	facebook : function(){

					Meteor.loginWithFacebook({
					  requestPermissions: []
					}, function (err) {
					  if (err){
					    Session.set('errorMessage', err.reason || 'Unknown error');
	
					  }
					  else{
						  	onLogin();
							 
						}
					});
	},

	google : function(){
		

		Meteor.loginWithGoogle({
		  		requestPermissions: []
			}, function (err) {
			  	if (err)
			    Session.set('errorMessage', err.reason || 'Unknown error');
		 		else{
		  			onLogin();

		  		}
		  	}
		 );


	},

  twitter: function(){
    //TODO: twitter not giving mail. wont work for now
    //need to fill email from user later
    Meteor.loginWithTwitter({
      //requestPermissions: ['email']
    },function(err){
      if(err){
        console.log(err);
      }
      else{
      	onLogin();
      }
    });
  }
 };

 onLogin= function(){
 	toaster.login();
 	DeeJay.enqueue('Hello, I am Watson, I oversee auctions on this site,  keeping you updated ');
 		
 };

 onLogout =function(){
 	Meteor.logout();
 	toaster.logout();
 	DeeJay.enqueue('Good Bye. Have an awesome day!');
 };

/****************************/

 toaster= {
 	login : function(){

 		Materialize.toast('logged in',2000,'' ,function(){
 			Materialize.toast('welcome! ' +Meteor.user().profile.name, '2000');
 		});
 	},

 	logout: function() {
 		Materialize.toast('logged out',2000,'',function(){
 			Materialize.toast('Have a great day!',2000);
 		});
 	},

 	promptLogin: function(){
 		Materialize.toast('Please login first',2000);
 	},

 	newNotification : function(priority){
 		Materialize.toast('new notification',2000,'',function(){
 			Materialize.toast('<span><a class="amber-text" href="/notifications">Click here to view notifications</a> </span> ',4000,'rounded');
 		});
 		
 	}
 };


 Meteor.startup(function(){
 	Chart.defaults.global = {
 	    // Boolean - Whether to animate the chart
 	    animation: true,

 	    // Number - Number of animation steps
 	    animationSteps: 60,

 	    // String - Animation easing effect
 	    // Possible effects are:
 	    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
 	    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
 	    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
 	    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
 	    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
 	    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
 	    //  easeOutElastic, easeInCubic]
 	    animationEasing: "easeOutQuart",

 	    // Boolean - If we should show the scale at all
 	    showScale: true,

 	    // Boolean - If we want to override with a hard coded scale
 	    scaleOverride: false,

 	    // ** Required if scaleOverride is true **
 	    // Number - The number of steps in a hard coded scale
 	    scaleSteps: null,
 	    // Number - The value jump in the hard coded scale
 	    scaleStepWidth: null,
 	    // Number - The scale starting value
 	    scaleStartValue: null,

 	    // String - Colour of the scale line
 	    scaleLineColor: "rgba(0,0,0,.1)",

 	    // Number - Pixel width of the scale line
 	    scaleLineWidth: 1,

 	    // Boolean - Whether to show labels on the scale
 	    scaleShowLabels: true,

 	    // Interpolated JS string - can access value
 	    scaleLabel: "<%=value%>",

 	    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
 	    scaleIntegersOnly: true,

 	    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
 	    scaleBeginAtZero: false,

 	    // String - Scale label font declaration for the scale label
 	    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

 	    // Number - Scale label font size in pixels
 	    scaleFontSize: 12,

 	    // String - Scale label font weight style
 	    scaleFontStyle: "normal",

 	    // String - Scale label font colour
 	    scaleFontColor: "#666",

 	    // Boolean - whether or not the chart should be responsive and resize when the browser does.
 	    responsive: true,

 	    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
 	    maintainAspectRatio: false,

 	    // Boolean - Determines whether to draw tooltips on the canvas or not
 	    showTooltips: true,

 	    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
 	    customTooltips: false,

 	    // Array - Array of string names to attach tooltip events
 	    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

 	    // String - Tooltip background colour
 	    tooltipFillColor: "rgba(0,0,0,0.8)",

 	    // String - Tooltip label font declaration for the scale label
 	    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

 	    // Number - Tooltip label font size in pixels
 	    tooltipFontSize: 14,

 	    // String - Tooltip font weight style
 	    tooltipFontStyle: "normal",

 	    // String - Tooltip label font colour
 	    tooltipFontColor: "#fff",

 	    // String - Tooltip title font declaration for the scale label
 	    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

 	    // Number - Tooltip title font size in pixels
 	    tooltipTitleFontSize: 14,

 	    // String - Tooltip title font weight style
 	    tooltipTitleFontStyle: "bold",

 	    // String - Tooltip title font colour
 	    tooltipTitleFontColor: "#fff",

 	    // Number - pixel width of padding around tooltip text
 	    tooltipYPadding: 6,

 	    // Number - pixel width of padding around tooltip text
 	    tooltipXPadding: 6,

 	    // Number - Size of the caret on the tooltip
 	    tooltipCaretSize: 8,

 	    // Number - Pixel radius of the tooltip border
 	    tooltipCornerRadius: 6,

 	    // Number - Pixel offset from point x to tooltip edge
 	    tooltipXOffset: 10,

 	    // String - Template string for single tooltips
 	    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

 	    // String - Template string for multiple tooltips
 	    multiTooltipTemplate: "<%= value %>",

 	    // Function - Will fire on animation progression.
 	    onAnimationProgress: function(){},

 	    // Function - Will fire on animation completion.
 	    onAnimationComplete: function(){}
 	};


 	LineChartOptions={

 	    ///Boolean - Whether grid lines are shown across the chart
 	    scaleShowGridLines : true,

 	    //String - Colour of the grid lines
 	    scaleGridLineColor : "rgba(0,0,0,.05)",

 	    //Number - Width of the grid lines
 	    scaleGridLineWidth : 1,

 	    //Boolean - Whether to show horizontal lines (except X axis)
 	    scaleShowHorizontalLines: true,

 	    //Boolean - Whether to show vertical lines (except Y axis)
 	    scaleShowVerticalLines: true,

 	    //Boolean - Whether the line is curved between points
 	    bezierCurve : true,

 	    //Number - Tension of the bezier curve between points
 	    bezierCurveTension : 0.4,

 	    //Boolean - Whether to show a dot for each point
 	    pointDot : true,

 	    //Number - Radius of each point dot in pixels
 	    pointDotRadius : 4,

 	    //Number - Pixel width of point dot stroke
 	    pointDotStrokeWidth : 1,

 	    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
 	    pointHitDetectionRadius : 20,

 	    //Boolean - Whether to show a stroke for datasets
 	    datasetStroke : true,

 	    //Number - Pixel width of dataset stroke
 	    datasetStrokeWidth : 2,

 	    //Boolean - Whether to fill the dataset with a colour
 	    datasetFill : true,

 	    //String - A legend template
 	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

 	};
 });



/***************************/

function watsonSpeak(announcement){
			var audio = document.createElement('audio');
			var att= document.createAttribute('autobuffer');
			var encoded = encodeURIComponent(announcement);
			audio.setAttributeNode(att);
			audio.src = '/synthesize?announcement='+encoded;
			return audio;
}


DeeJay ={
	queue : [],
	enqueue : function(announcement){

		
		DeeJay.queue.push(watsonSpeak(announcement));
		if(DeeJay.queue.length===1){
			DeeJay.play();
		}

	},
	play : function(){

		function setAudioEvents(element){
			element.onended = function(){
				console.log('ended');
				DeeJay.queue.shift();
				$('#watson').removeClass('active');
				DeeJay.play();
			};




			//$(element).on('canplay',function(){ //wont fire for next queue items
				$('#watson').addClass('active');
				element.play();
			//});


		}

		if(DeeJay.queue.length>0){			
			var audio= DeeJay.queue[0];

			setAudioEvents(audio);			
		}

	},
	reset : function(){
		DeeJay.queue= [];
	},

	jumpQueue : function(announcement){
		var audio= watsonSpeak(announcement);
		audio.onended = function(){
			$('#watson').removeClass('active');
		};
		$(audio).on('canplaythrough',function(){
			$('#watson').addClass('active');
			audio.play();
		});

	}

};

Meteor.startup(function () {
  if(Meteor.isCordova){
    StatusBar.hide();
  }
});
