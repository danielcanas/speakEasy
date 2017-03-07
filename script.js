$(document).ready(function(){
  var audio = new Audio('play3.mp3');
  var sayings = ['would you like to visit webcourses? Then say UCF webcourses','Want to learn Python? Say Amazon Python', 'Want to find an internship? Say Open Microsoft', 'Want to go on facebook? Say open Facebook'];
  
    var app = new Clarifai.App(
    'C-pi-FwrWtxDr5xY7F0wfZSuJPrn8qWQjhnedqDT',
    '_kVxdwqsCJczqalO7A0bM2voHAIAiweGRq-OtXyn'
  );
  
  Webcam.set({
			width: 320,
			height: 240,
			image_format: 'jpeg',
			jpeg_quality: 90
		});
		Webcam.attach( '#video' );

  if (annyang) {

    var mixtape = function(){
            window.open('https://fultongarcia.com');
    }
    
    var resume = function(){
        window.open('https://fultongarcia.com/files/Resume.pdf');
    }

    var chill = function(){
      if(audio.paused){
        audio.play();
        window.open('https://www.netflix.com/browse');

      }
      else{
        audio.pause();
        audio.currentTime = 0;
      }
    }

    
    var print = function(words){
      console.log(words);
    }
    
    
    
    var search = function(term){
      window.open("https://www.google.com/search?q=" + term);
    }
    
    var open = function(website){
        window.open('http://' + website.replace(/\s/g, '') + '.com');
    }
    
    var food = function(restaurants){
      window.open('https://www.google.com/#safe=off&q=restaurants+near+me');
    }
    
    var weather = function(){
      window.open('https://www.google.com/search?q=weather');
    }
    
    var lyrics = function(song){
      window.open("https://www.google.com/#q=lyrics+for+" + song);
    }
    
    var web = function(){
        window.open('https://webcourses.ucf.edu/');
    }
    
    var play = function(song){
      window.open('https://www.youtube.com/results?search_query=' + song);
    }
    
    var orderFood = function(){
      window.open('https://orderup.com/');
    }
    
    
    var knightsMail = function(){
      window.open('https://extranet.cst.ucf.edu/kmailselfsvc');
    }
    
    var amazon = function(term){
        window.open('https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' + term);
    }
    
    var yugioh = function(name){
      window.open('http://yugiohprices.com/search_card?search_text='+name);
    }
    
    var flResident = function(name){
      window.open('https://floridaresidentdb.com/search?fn=zachary&ln=feezor');
    }
    
    var cmdList = function(){
        Webcam.snap(function(data){
           app.models.predict('a7da8026926d481a86df3dd6f7ec3b72', {base64:data.substr(23)}).then(
      function(response) {
          var name = JSON.stringify(response.data.outputs[0].data.concepts[0].id);
          var confidence = JSON.stringify(response.data.outputs[0].data.concepts[0].value);
        console.log(name);
        console.log(confidence);
        if(name === '\"Fulton\"' && confidence > .75){
            var rand = sayings[Math.floor(Math.random() * sayings.length)];
            var msg = new SpeechSynthesisUtterance();
            msg.text = 'hello '+name;
            speechSynthesis.speak(msg);
            $("#content").html('<h4>'+ rand +'</h4><h5>Check Out My Mixtape</h5><h5>Netflix and Chill</h5><h5>Open Facebook</h5><h5>UCF Webcourses</h5><h5>Amazon Python</h5>');
        }
        else if(name === '\"Sydney\"' && confidence > .75){
            var rand = sayings[Math.floor(Math.random() * sayings.length)];
            var msg = new SpeechSynthesisUtterance();
            msg.text = 'whats up '+name;
            speechSynthesis.speak(msg);
            $("#content").html('<h4>'+ rand +'</h4><h5>Check Out My Mixtape</h5><h5>Netflix and Chill</h5><h5>Open Facebook</h5><h5>UCF Webcourses</h5><h5>Amazon Python</h5>');
        }
        else{
            var msg = new SpeechSynthesisUtterance();
            msg.text = 'hello stranger';
            speechSynthesis.speak(msg);
            $('#content').html('<h4>Say help for a full list of commands</h4>')
        }
      },
      function(err) {
        console.log(err)
      }
    ); 
        });
    }
    
    var help = function(){
        $("#content").html('<h5>Check Out My Mixtape</h5><h5>Netflix and Chill</h5><h5>Search (term)</h5><h5>Open (website)</h5><h5>UCF Webcourses</h5><h5>Restaurants Near Me</h5><h5>Weather</h5><h5>Lyrics for (song)</h5><h5>Amazon (item)</h5>');
    }
    
    var home = function(){
        Webcam.set({
			width: 320,
			height: 240,
			image_format: 'jpeg',
			jpeg_quality: 90
		});
		$("#content").html('<div id="video" class="responsive-img" style="display: inline;"></div>');
		Webcam.attach( '#video' );
    }
  // Let's define our first command. First the text we expect, and then the function it should call

  var commands = {
    'Check out my mixtape': mixtape,
    'Netflix and chill': chill,
    'search *term': search,
    'open *website': open,
    'UCF webcourses': web,
    'Convert *term': search,
    'Restaurants near me' : food,
    'weather':weather,
    'lyrics for *song': lyrics,
    'play *song' : play,
    'order food':orderFood,
    'amazon *term': amazon,
    'check mail':knightsMail,
    'check price of *name':yugioh,
    'SpeakEasy': cmdList,
    'help': help,
    'home': home,
    'resume': resume,
    '(Jazz) *words': print

  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}

});