     __    __     ___       ____   __    __   __  
    |   \/   |  /  _  \   /  ___| |  |  |  | |  |  
    |        | |  |_|  | |  |_    |  |__|  | |  | 
    |  |\/|  | |   _   |  \__  \  |   __   | |  |
    |  |  |  | |  | |  |  ___|  | |  |  |  | |  | 
    |__|  |__| |__| |__| |____ /  |__|  |__| |__|       
    javascript timeline toolkit


### Introduction

Mashi is a JavaScript Toolkit for timeline-based web applications and ..

*   allows you to create flash-like movies and complex animations with standard (X)HTML, CSS and JavaScript.
*   is compact, object-oriented, modular and lightweight: incl. all modules 41kb / 13kb (CDN+GZip)
*   requires no additional plugins for basic usage
*   supports all major browsers.
*   works on iPad, iPhone and any mobile device with a modern browser.
*   is framework independent. You can easily integrate your favorite one.
*   is under constant development. Visit our timelabs and blog to learn more.


### How it works

The Mashi toolkit enables you to swiftly create interactive and time-controlled web applications that are easily integrated in your websites.

Mashi utilizes nothing but standard web technology - HTML, JavaScript, CSS and the DOM. Additional 32 bit PNG-Images are used to create transparency effects. You see, it's only technology every web developer is proficient in and uses every day.

Unlike other projects Mashi doesn't completely rely on HTML5, the Canvas-Element and CSS3. Mashi apps also work with XHTML and HTML4, which enables them to function properly even in out-dated browsers like IE6. We're pretty sure there's still some people using it. You don't want to leave them out in the rain, right?

Mashi's base element is the timeline. In contrast to other animation tools mashi uses a scene-based timeline. So you are not limited to your every-day "movie"-timeline divided in dozens of equal frames per second but you can split your timeline into self-contained and independent scenes at will. This allows you to approach your scenes in a much more direct and tangible way.

The timeline consists of several scenes (frames), that may be combined to one or more framesets or even outsourced to different files. The toolkit loads the framesets into an array.

The frames themselves consist of two elements only - their duration in milliseconds and a JavaScript function that is called as soon as the scene starts. Inside that function you can use: native JavaScript code, your favorite JS-framework or the methods provided by Mashi.

All Mashi toolkit files are found in a dedicated folder called 'system'. The development version and the minimized production version can be included locally or you can conveniently use Google's Appspot CDN (Content Delivery Network).

Mashi offers an automated preloader. It preloads every single graphic used in your app to display it without any delay at the right time. In addition it also loads the appropriate hacks to help our good-ol' IE6 cope with PNG-transparency.

Switching between different scenes is really easy: Mashi is shipped with the "Controls" module that provides buttons like "play" and "pause" etc. including their associated logics.

In addition Mashi is already equipped with modules for object and text animation as well as CSS3-effects (e.g. text shadows). Stubborn, out-dated IEs are hacked by Mashi along the way.

Not enough for you? No problem: It's a cakewalk to use Mashis plug-in mechanism to integrate additional features. Write your own plugin!

Mashi apps are loaded into an arbitrary element on your website. They use multiple layers: two layers for backgrounds or fading, one pure text layer and a stage layer for any objects. And you can also easily add and use a canvas layer - if needed.


### Mashi Timelabs

Visit our [timelabs](http://mashi.tv/labs/index.htm) to see some mashi demos, apps and experiments. Rate them and vote for upcoming features.

Feeling creative? Want to show off? The Labs are open for everyones apps. Just send us an URL to yours and we will add it.


### Documentation

The [API Documentation](http://mashi.tv/apidoc/index.htm) provides an explanation of every class and its functionality. And you'll find more on our [Blog Page](http://blog.mashi.tv).


### Download

The Toolkit Mashi at github: [http://github.com/up/mashi](http://github.com/up/mashi)

	$ git clone git@github.com:up/mashi.git      

or download it as 
[zip](https://github.com/up/mashi/zipball/master) or
[tar.gz](https://github.com/up/mashi/tarball/master).


### License

Copyright © 2008-2011 Uli Preuss

The Mashi Timeline Toolkit is free software; you can redistribute it and/or modify it 
under the terms of the version 2 of the GNU General Public License (the "GPL"). 
For (re)distribution without GPL ask for our commercial license.

Read the [full licence text](http://mashi.tv/LICENSE.md).
