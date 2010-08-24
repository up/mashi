var converter = new Showdown.converter();
var pre = false;
var menu, url;

function loadContent(source, breadcrump) {
    
    if(source === undefined) {
      url = "content/overview.txt"
      breadcrump = 'Overview';
      pre = false;
    }
    else if(source === 'menu.json') {
      url = "menu.json";
      pre = true;
    }
    else {
      url = "content/" + source + ".txt";
      pre = false;
    }
    
    if(breadcrump !== undefined && breadcrump !== '') {
      breadcrump = ' &raquo; ' + breadcrump;
    }
    else {
      breadcrump = '';
    }
  
    $("#header span").html(breadcrump);
    
    $.ajax({
        url: url,
        success: function(data) {
            menu = data;
            if (pre === true) {
              $("#content").html('<pre>' + converter.makeHtml(data) + '</pre>');
            }
            else {
              $("#content").html(converter.makeHtml(data));
            }
            //printFooter();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            //alert(xhr.status + ' - ' + thrownError);
            loadContent('error');
        }
    });
    
    scroll(0,0);
}

function loadMenu() {
    $.ajax({
        url: 'menu.json',
        success: function(data) {
            buildMenu(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            loadContent('error');
        }
    });
}

function printFooter() {

  var content = document.getElementById('content');

  var hr = document.createElement('HR');
  hr.style.margin = "5px 0px ";
  content.appendChild(hr);

  var div = document.createElement('DIV');
  var str = "Last modified: ";
  str+= document.lastModified;
  div.innerHTML = str;
  div.style.textAlign = "right";
  div.style.fontSize = "12px";
  content.appendChild(div);

}


function buildMenu(jsoncontent) {
  
    var data = eval("(" + jsoncontent + ")");
    
    var html = '<ul>';
    for (i = 0; i < data.items.length; i++) {
      if(data.items[i].title === 'root') {
        for (k = 0; k < data.items[i].subitems.length; k++) {
          html+= '<li class="root-file">';
          if (data.items[i].subitems[k].source.substring(0, 7) === 'http://') {
            html+= '  <a href="' + data.items[i].subitems[k].source + '">';
          }
          else {
            html+= '  <a href="javascript:loadContent(\'' + data.items[i].source + '/' + data.items[i].subitems[k].source + '\', \'' + data.items[i].subitems[k].title + '\')">';
          }
          html+=      data.items[i].subitems[k].title;
          html+= '  </a>';
          html+= '</li>';
        }        
      }
    }
    html+= '</ul>';
    html+= '<ul>';
    for (i = 0; i < data.items.length; i++) {
      if(data.items[i].title !== 'root') {
        html+= '<li><span class="folder">' + data.items[i].title + '</span>';
        html+= '<ul class="filetree">';
        for (k = 0; k < data.items[i].subitems.length; k++) {
          html+= '<li>';
          if (data.items[i].subitems[k].source.substring(0, 7) === 'http://') {
            html+= '  <a href="' + data.items[i].subitems[k].source + '">';
          }
          else {
            html+= '  <a href="javascript:loadContent(\'' + data.items[i].source + '/' + data.items[i].subitems[k].source + '\', \'' + data.items[i].title + ': ' + data.items[i].subitems[k].title + '\')">';
          }
          html+=      data.items[i].subitems[k].title;
          html+= '  </a>';
          html+= '</li>';
        }
        html+= '</ul></li>';
      }
    
    }
    html+= '</ul>';
    
    $('#menu').append(html);
    $("#menu > ul").treeview({
  		animated: "fast",
      persist: "location",
  		collapsed: true,
  		unique: true
  	});
  	$('li.root-file:eq(0)').find('a').focus();
  	

}
$(window).unload( function(e) {
  $('body').css({ 'opacity': '0'});
  scroll(0,0);
  e.stopPropagation();
}); 

$(document).ready(function() {
    loadMenu();  	
    loadContent();
});

