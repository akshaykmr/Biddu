Router.route('/synthesize', function(){
  var request = this.request;
  var response= this.response;

  var query= this.params.query;
  /*
    expected query = {
      announcement ,
      voice : optional
    }

  */

  var params={
    text: query.announcement || '',
    //voice: query.voice || 'VoiceEnUsMichael',
    accept: 'audio/wav'
  };


  //sample params
  /*var params = {
    text: 'Akshay has entered the lobby, current price 4000, 5000,3400, 9001, sold!, sold to Josh',
    voice: 'VoiceEnUsMichael', // Optional voice 
    accept: 'audio/ogg'
  };
  */

  //remove head if err
  response.writeHead( 200, { 'content-type' : 'arraybuffer' } );
  Watson.textToSpeech.synthesize(params).pipe(response);


}, {where : 'server'}); 