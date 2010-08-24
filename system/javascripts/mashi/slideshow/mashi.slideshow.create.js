/*
    Copyright (c) 2008-2010, Uli Preuss All Rights Reserved.
    Available via Academic Free License v.3.0 OR the modified BSD license.
    see: http://mashi.com/license for details
*/

(function() {

    if (typeof mashi.slideshow != "undefined") {
        mashi.slideshow.create = function(params) {
          var xml_source = params.source;
          var background_image = params.bgimage;
          var xpath = '//div';
          var para = '/p';
          
          this.loadXMLDoc = function(file) {
              var xhr;
              if (window.XMLHttpRequest) {
                  xhr = new XMLHttpRequest();
              } else {
                  xhr = new ActiveXObject("Microsoft.XMLHTTP");
              }
              xhr.open("GET", file, false);
              if(xhr.overrideMimeType) {
                  xhr.overrideMimeType('text/xml');
              }
              xhr.setRequestHeader('Content-Type', 'text/xml'); 
              xhr.setRequestHeader('Cache-Control', 'no-cache'); 
              xhr.send(null);
              return xhr.responseXML;
          };

          this.innerXML = function(node) {
              return (node.xml || (new XMLSerializer().serializeToString(node)) || "").replace(
              new RegExp("(^<w*" + node.tagName + "[^>]*>)|(<w*/w*" + node.tagName + "[^>]*>$)", "gi"), "");
          };
          try {
            _self = this;
            this.num = -1;
            var nodes, styleNode, length, thisNodeString, 
            xml = this.loadXMLDoc(xml_source);
            
            // code for IE
            if (window.ActiveXObject) {
              xml.setProperty("SelectionLanguage", "XPath");
              nodes = xml.selectNodes(xpath);
            }
            // code for Safari, Firefox, Opera, etc.
            else if (document.implementation && document.implementation.createDocument) {
              nodes = xml.evaluate(xpath, xml, null, XPathResult.ANY_TYPE, null);
              nodes.length = xml.evaluate('count('+ xpath +')', xml, null, XPathResult.ANY_TYPE, null).numberValue;
              //styleNode = xml.evaluate('//style', xml, null, XPathResult.ANY_TYPE, null);
            }

            /*
            var style = '' + 
              '<style type="text/css">' +
                _self.innerXML(styleNode.iterateNext()) +
              '</style>'
            */
      
            this.frames = [];
            for (var i=0;i<nodes.length;i++) {
              // code for IE
              if (window.ActiveXObject) {
                thisNodeString = this.innerXML(nodes[i]);
                //alert('thisNodeString');
              }
              // code for Safari, Firefox, Opera, etc.
              else if (document.implementation && document.implementation.createDocument) {
                thisNodeString = this.innerXML(nodes.iterateNext());
              }
              var thisNodeStringParts = thisNodeString.split('<p>');
              var header = thisNodeStringParts[0]; // TODO: trim()
              for(var x = 1; x<thisNodeStringParts.length;x++) {
               this.frames.push(header + '<p>' + thisNodeStringParts[x]);
                
              }
             }
             for (var i=0;i<this.frames.length;i++) {
                 _m_.self.add("auto", function() {
                   _m_.self.set({ 
                     //html: style + _self.frames[_m_.frame.num]
                     html: _self.frames[_m_.frame.num],
                     style: {
                       backgroundImage: 'url(' + background_image + ')'
                     }
                   }); 
                 });
                _m_.frame.num++; 
              }
            //return this.frames;
          }
          catch(e) {
            alert(e);
          }
      
        }
    }

})();

