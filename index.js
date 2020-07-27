

$(document).ready(function(){
  

    $(".searchTerm").on("keyup", function(e){
      var $grid = $(".grid");
      
      if(e.which === 13) {
        $(".searchTerm").addClass("searchTermSmall");
        //replace search results with new results.
        $(".grid").html("");
        
        var searchFunction = function() {
          //stores value of #searchTerm in $searchTerm and then appends it to GET url
          var $searchTerm = $(".searchTerm").val();
          var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&namespace=0&limit=10&profile=fuzzy&callback=callback&search=" + $searchTerm;
          $.ajax({
            url: url,
            dataType: 'jsonp',
            type: 'GET',
            headers: { 'Api-User-Agent': 'SearchingThings' },
            success: function(data) {
              
              //dynamically add divs AND style them - also need a for loop to cycle through json array.
              for(i = 0; i < data[1].length; i++) {
                // dynamically create new div, append anchor to new div, append data to anchor.
                var infoTitle = '<h1 class="titleStyle">' + data[1][i] + '</h1>';
                var infoSummary = '<p class="summaryStyle">' + data[2][i] + '</p>';
                
                var $newDiv = $('<div class="grid-item" id="newgrid"></div>');
                var $newHref = '"' + data[3][i] + '"';
                var $newA = $('<a href=' + $newHref + 'target="_blank"/>');
                
                var $newBlock = $newDiv.append($newA.append(infoTitle, infoSummary)).appendTo($grid);
                $newBlock;
              }
        
            //Masonry code! 
            $grid.masonry('reloadItems'); //reloads masonry config on new search.
            $grid.masonry({
              // options
              itemSelector: '.grid-item',
              columnWidth: '.grid-item'
            });
              
  
            },
            error: function(){
              alert("error in ajax");
            }
          });
        }
        searchFunction();
        //resets the search input
        $(".searchTerm").val("");
      }
      
    })
    
  });
  
  
  