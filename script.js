$(function() {

  //Function to clear the crap
  function clear_data() {
    $("#movie_data").empty();
    $('#the_plot').empty();
    $('#poster').empty();
    $('#loader:hidden').show();
    $('.card-title').text($('#the_movie').val());
  }

  //Actions to take on text change of input
  $("#the_movie").keyup(function(e) {
    if (e.which == 13) {
      $(".activator").trigger("click");
    } else {
      $('.card-title').text($('#the_movie').val());
    }
  });
  //Get movie data
  $('.activator').click(function() {
    var $the_movie = $('#the_movie').val();
    clear_data();

    $.ajax({
      type: 'GET',
      dataType: "jsonp",
      url: 'https://www.omdbapi.com/?t=' + $the_movie + '&apikey=76239c15&y=&plot=short&r=json',
      success: function(orders) {

        if (orders.Response == 'False') {
          clear_data();
          $('.card-title').text('Movie Data Not Found');
          $('#loader:visible').hide();
        } else {
          // var poster = 'src="' + orders.Poster + '"';
          clear_data();
          $("#poster").append(
              '<img ' + 'src="' + orders.Poster + '"' + '>',
            );
          $("#movie_data").append(
            '<li><strong style="font-size: 16px;">Year:</strong> ' + orders.Year + '</li>',
            '<li><strong style="font-size: 16px;">Rated:</strong> ' + orders.Rated + '</li>',
            '<li><strong style="font-size: 16px;">Released:</strong> ' + orders.Released + '</li>',
            '<li><strong style="font-size: 16px;">Runtime:</strong> ' + orders.Runtime + '</li>',
            '<li><strong style="font-size: 16px;">Genre:</strong> ' + orders.Genre + '</li>',
            '<li><strong style="font-size: 16px;">Writer:</strong> ' + orders.Writer + '</li>',
            '<li><strong style="font-size: 16px;">Actors:</strong> ' + orders.Actors + '</li>',
            '<li><strong style="font-size: 16px;">Rating:</strong> ' + orders.imdbRating + '</li>',
            '<li><strong style="font-size: 16px;">Awards:</strong> ' + orders.Awards + '</li>',
            '<li><a href="http://www.imdb.com/title/' + orders.imdbID + '/" target="_blank">View on IMDB</a></li>'
          );
          $('#the_plot').text(orders.Plot);
          $('.card-title').text(orders.Title);
          $('#loader:visible').hide();
          $('#title').text(orders.Plot);
          var pic = orders.Poster;
          document.getElementById("body").style.background = "url(" + pic + ")";
          document.getElementById("card_view").style.background = "#e8e8e8";
          document.getElementById("image_view").style.background = "#e8e8e8";
        }    
      }
    });
  });
});