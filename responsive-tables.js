$(document).ready(function() {
   
  var switched = false;

  /* we load the split/unsplit on load of the page */
  $(window).load(function(){      
     updateTables($('.tab-content'));
  });
  /* we listen to resize events (also used for orientation) to change size */
   $(window).bind("resize", function(){
     updateTables($('.tab-content'));
   });


/* update table function : should we switch table or not, based on scroll bars and size */
function updateTables() {  
    // we create the scrollable var, which is negativ if the table if bigger than the tab aka if we have a scrollbar
    var scrollable = $('.tab-content').width() - $('.responsive').width();
   
    // case 1 :  if the main tab has a scrollbar and the table was no split, we split
    if (scrollable < 0 && !switched){ 
      switched = true;
      $("table.responsive").each(function(i, element) {
       splitTable($(element));
       });      
      // console.log('case 1 ' + scrollable + switched ); 
      return true;     
    }

    // case 2 : if we already switched the table, and want to go back to normal for bigger screens : 
    else if(switched && $('.scrollable .responsive').width() <= $('.table-wrapper').width() ){
      switched = false;
      $("table.responsive").each(function(i, element) {
        unsplitTable($(element));
      });
      // console.log('case 2 ' + scrollable + switched + $('.scrollable .responsive').width()); 
     
    }
    // else 
    else{
      // console.log('case 3 ' + scrollable + switched + $('.scrollable .responsive').width()); 
         
    }
  };

	
  /* the split functions to split the tables go here */
  function splitTable(original)	{
		original.wrap("<div class='table-wrapper' />");
		
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("responsive");		
		original.closest(".table-wrapper").prepend(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");
	}
	
	function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
	}

});
