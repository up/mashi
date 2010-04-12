     __    __     ___       ____   __    __   __  
    |   \/   |  /  _  \   /  ___| |  |  |  | |  |  
    |        | |  |_|  | |  |_    |  |__|  | |  | 
    |  |\/|  | |   _   |  \__  \  |   __   | |  |
    |  |  |  | |  | |  |  ___|  | |  |  |  | |  | 
    |__|  |__| |__| |__| |____ /  |__|  |__| |__|       
    the javascript timeline toolkit

# Current Status :

Development [v0.9.1](http://semver.org/)

##The Idea Behind

###The Problem

Except 'setTimeout' und 'setInterval' there are no native Methods in Javascript to define time controlled actions.

If we want to hide all 'div' elements in a page after 5 seconds, we can use 'setTimeout' like this:

    setTimeout( 
       function(){
          document.getElementsByTagName('DIV').style.visibility = "hidden";
       }, 
       5000
    );

Should they appear again after another 3 seconds, this can be done like this:

    setTimeout( 
       function(){
          document.getElementsByTagName('DIV').style.visibility = "hidden";
          setTimeout( 
             function(){
                document.getElementsByTagName('DIV').style.visibility = "visible";
             }, 
             3000
          );
       }, 
       5000
    );

Such kind of code become unreadable at the latest after 5 nestings. And there is no way to set the duration one of the (time)frames automaticly, if the frame functions ends.

###The mashi way

Above code can be written in mashi with the following lines:

    myapp.add( 5000, function(){
       document.getElementsByTagName('DIV').style.visibility = "hidden";
    });
    myapp.add( 3000, function(){
       document.getElementsByTagName('DIV').style.visibility = "visible";
    });

##How it works:

In the first step the script reads instructions of the frames in an array ein. In a second step the script loop through the array. This step in detail:

* Starting the first frame. Simultaneously a timer was started.
* At short intervals the script checks, if the frame duration is reached. 
* If not - the timer runs onward.
* If yes - the timer stops and the script invokes the frame function  
* Now a new timer (respectively frame) get starting
* And so on until the last frame ends
   

##The Application

Bei der Entwicklung kam dann schnell die Idee, auf Basis diesen kleinen Scripts eine Art 'Player' weiter zu entwickeln, mit dem man 'Flash-ähnliche' Anwendungen mit Webstandards (HTML, CSS und Javascript) erstellen kann.   



