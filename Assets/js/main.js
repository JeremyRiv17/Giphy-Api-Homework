$('document').ready(function(){
var searchTerms= ["cats", "bats", "rats",]
var createBtns = function(){
  $("#Buttons").empty();
  for (i=0;i<searchTerms.length; i++){
    var newBtn = $('<button class=srch>')
    newBtn.attr('data',searchTerms[i])
    newBtn.text(searchTerms[i])
    $("#Buttons").append(newBtn)
}}

var submitSrch = function(){
  $("#Search").on("click", function(e){
    e.preventDefault();
    var input=$("#tBox").val();
    searchTerms.push(input);
    console.log(searchTerms);
    createBtns();
  })
}
var searching = function(){
  $(".srch").on("click", function() {
    var subject = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    subject + "&api_key=dc6zaTOxFJmzC&limit=25";

    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
    var results = response.data;
    console.log(results)
    for (var i = 0; i < results.length; i++) {
    var gifDiv = $("<div class='item'>");
    gifDiv.empty();
    var rating = results[i].rating;
    var p = $("<p>").text("Rating: " + rating);
    var giphyImage = $("<img>");
    giphyImage.attr("src", results[i].images.fixed_height_still.url);
    giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
    giphyImage.attr("data-animate", results[i].images.fixed_height.url);
    giphyImage.attr("class", "gif")
    giphyImage.attr("data-state", "still")
    gifDiv.prepend(p);
    gifDiv.prepend(giphyImage);
    $("#gifs-appear-here").prepend(gifDiv);
  }
  });
});
}
  $(".gif").on("click", function() {
    var state = $(this).attr("data-state");
    console.log(state)
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

createBtns();
submitSrch();
searching();
});