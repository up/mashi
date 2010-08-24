
/**
  * Configuration
  * 
 */
var config = {
  cache_item_class: 'page',
  cache_id: 'file-list',
  input_id: 'inline-search',
  checkbox_id: 'case-sensitivity',
  json_file_name: 'menu.json',
  content_dir_name: 'content',
  doc_part_class: 'doc-part',
  minimal_chars: 2
}

$(document).ready(function(){
  
  var converter = new Showdown.converter();
	addLoader();
	refreshCache();
	//$('input#' + config.input_id).search();
	$('#button-submit').search();
	$('input#' + config.checkbox_id).click(function(){ refreshCache(); });

});


/**
  * search event on key up
  * 
 */
$.fn.search = function() {
  
/*
  $(this).keyup(function(){
    loadContent('search', 'Search results');    
  	refreshCache();
    search();
  });
*/

  $(this).click(function(){
    var searchString = $('input#' + config.input_id).val();
    if (searchString.length > config.minimal_chars - 1){
      loadContent('search', 'Search results');
    }    
  	refreshCache();
    search();
  });

};


function focusTreeItem(dir, file, root) {  
    if(root === true) {
      $('li.collapsable span').click();
      $('li.root-file:eq(' + file + ')').find('a').focus();      
    }
    else {
      // if folder is open, don't click ..
      if(!$('li span:eq(' + (dir-1) + ')').parent().hasClass('collapsable')) {
        $('li span:eq(' + (dir-1) + ')').click();
      }
      $('li span:eq(' + (dir-1) + ')').parent().find('a:eq(' + file + ')').focus();      
    }
}


/**
  * Init or refresh cache
  * 
 */
function refreshCache() {
  addLoader();
  $.ajax({
    url: config.json_file_name,
    success: function(data) {
      createCache(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      // ..
    }
  });
}

/**
  * Add Ajax loader
  * 
 */
function addLoader() {
  $('#' + config.cache_id).html('<img id="ajax-loader" src="assets/images/ajax-loader.gif" alt=""/>');
}

/**
  * Load text file
  * 
 */
function loadTextFile(url) {
  var filecontent; 
  $.ajax({
    url: url,
    async: false,
    success: function(data) {
      filecontent = data;
    },
    error: function(xhr, ajaxOptions, thrownError) {
      filecontent = ''
    }
  });
	return filecontent;
}

/**
  * Create cache
  * 
 */
function createCache(obj) {
  var data = eval("(" + obj + ")");
  var text, html = '', d = data.items;
  for (i = 0; i < d.length; i++) {
    var di = d[i], dt = di.title, ds = di.source;
    for (k = 0; k < di.subitems.length; k++) {
      var fs = di.subitems[k].source;
      var ft = di.subitems[k].title;
      html+= '<div class="' + config.cache_item_class + '">';
      html+= '  <p class="link">';	
      if (ds === '') {
        html+= '    <span class="' + config.doc_part_class + '"></span> ';	
      }
      else {
        html+= '    <span class="' + config.doc_part_class + '">[' + dt + ']</span> ';	
      }
      html+= '    <a href="javascript:loadContent(\'' + ds + '/' + fs + '\', \'' + dt + ' > ' + ft + '\');focusTreeItem(' + i + ',' + k + ((dt === 'root')?',' + true:',' + false) +');">';
      html+= ft;
      if ($('#' + config.checkbox_id + ':checked').val() !== undefined) {
        html+= '  <span style="display:none">' + dt.toLowerCase() + ' ' + ft.toLowerCase() + '</span>';
      }
      html+= '    </a>';
      html+= '  </p>';
      html+= '  <div class="' + config.content_dir_name + '">';
      text = loadTextFile(config.content_dir_name + '/' + ds + '/' + fs + '.txt');
      if ($('#' + config.checkbox_id + ':checked').val() !== undefined) {
        text = text.toLowerCase();
      }
      html+= text;
      html+= '  </div>';
      html+= '</div>';
    }
  }
    
  $('#' + config.cache_id).html(html);
  
  search();
}

/**
  * Search: Iterating through cache items
  * 
 */
function search() {
  
  if($('input#' + config.input_id).val() !== undefined){
    var searchString = $('input#' + config.input_id).val();
    if (searchString.length > config.minimal_chars - 1){
      $('div.' + config.cache_item_class).hide();
      $('#' + config.cache_id).css({'display': 'block'})
      if ($('#' + config.checkbox_id + ':checked').val() !== undefined) {
        $('div.' + config.cache_item_class + ':contains(' + searchString.toLowerCase() + ')').show();
      }
      else {
        $('div.' + config.cache_item_class + ':contains(' + searchString + ')').show();
      }
    }
    else {
      $('div.' + config.cache_item_class).show();
      $('#' + config.cache_id).css({'display': 'none'})
    }
	}

}


