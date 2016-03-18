// Write your package code here!
var watson = Meteor.npmRequire('watson-developer-cloud');

Watson  = {}; 
 
/*var concept_expansion = watson.concept_expansion({
  "username": "ab137d02-d585-4c0d-8b28-5fe95603d7c1",
  "password": "rm2Pw3idsQvR",
  version: 'v1'
});
 
var params = {
  seeds: ['motrin','tylenol','aspirin'],
  dataset: 'mtsamples',
  label: 'medications'
};
 
concept_expansion.expand(params, function (err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});
*/

/**********insights */



/*var personality_insights = watson.personality_insights({
  "username": "d1b098bb-c34a-4b81-8450-bdec5fdb6927",
  "password": "lxiYKUC7DHek",
  version: 'v2'
});
 
personality_insights.profile({
  text: speech },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
*/

/**** text to speech*/

//var fs = Meteor.npmRequire('fs');
 
Watson.textToSpeech = watson.text_to_speech({
	"username": "688b00ce-1668-4424-83fc-92093d6876ba",
   	"password": "OcpZ2Lj9wfUY",			
  version: 'v1'
});
//sample params
var params = {
  text: '20390, 20, 1, 22, 98, 0 , begin 800',
  voice: 'VoiceEnUsMichael', // Optional voice 
  accept: 'audio/wav'
};
 
// Pipe the synthesized text to a file 
//Watson.textToSpeech.synthesize(params).pipe(fs.createWriteStream('output.wav'));