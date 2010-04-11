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

### Das Problem

In Javascript gibt es ausser 'setTimeout' und 'setInterval' keine nativen Methoden, um zeitgesteuert Aktionen ablaufen zu lassen.

Um z.B. nach 5 Sekunden alle DIV unsichtbar zu machen, nutzt man 'setTimeout' wie folgt:

    setTimeout( 
       function(){
          document.getElementsByTagName('DIV').style.visibility = "hidden";
       }, 
       5000
    );

Sollen nach weiteren 3 Sekunden die DIVs wieder erscheinen, dann kann das wie folgt geschehen:

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

Spätestens nach 5 Verschachtelungen ist ein solcher Code kaum noch lesbar. 

###Der Lösungsansatz

Obigen verschachtelten Code kann man mit der ersten Mashi-Version auch wie folgt schreiben: 

    myapp.add( 5000, function(){
       document.getElementsByTagName('DIV').style.visibility = "hidden";
    });
    myapp.add( 3000, function(){
       document.getElementsByTagName('DIV').style.visibility = "visible";
    });

Oder allgemeiner:

    MASHIOBJECT.add( DURATION, FUNCTION);


##Funktionsweise:

Das Script liest im ersten Schritt die Anweisungen der jeweiligen Frames (so werden innerhalb von mashi die einzelnen add-Anweisungen genannt) in ein Array ein. In einem zweiten Schritt wird das Array durchlaufen. Dieser Schritt im Detail:

* Der erste Frame wird gestartet
* Gleichzeitig wird ein Timer gestartet
* Dabei wird in kurzen Abständen per setInterval überprüft, ob die angegebene Dauer (duration) bis zur Ausführung schon erreicht wurde.
* Falls nein, läuft der Timer weiter. 
* Falls ja, wird die Funktion aufgerufen 
* und ein neuer Frame und Timer gestartet (siehe 1. und 2.)
* usw., bis der letzte Frame durchlaufen und die letzte Funktion aufgerufen wurde.
   

##Die Anwendung

Bei der Entwicklung kam dann schnell die Idee, auf Basis diesen kleinen Scripts eine Art 'Flash-Player' weiter zu entwickeln, mit dem man 'Flash-ähnliche' Anwendungen mit Webstandards (HTML, CSS und Javascript) erstellen kann.   



