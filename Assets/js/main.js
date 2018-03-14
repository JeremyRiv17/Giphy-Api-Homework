$('document').ready(function(){
//array holding searchterms
var searchTerms= ["Michael Scott", "Dwight Schrute", "Jim Halpert", "Pam Beesly", "Ryan Howard", "Andy Bernard", "Robert California", "Jan Levinson", "Roy Anderson", "Stanley Hudson", "Kevin Malone", "Meredith Palmer", "Angela Martin", "Oscar Martinez", "Phyllis Lapin", "Kelly Kapoor",
"Toby Flenderson", "Creed Bratton", "Darryl Philbin", "Erin Hannon", "Gabe Lewis", "Holly Flax", "Nellie Bertram", "Todd Packer", "Karen Filippelli", ]
//function creating buttons

  $("#Buttons").empty();
  for (i=0;i<searchTerms.length; i++){
    var newBtn = $('<button class=srch>')
    newBtn.attr('data',searchTerms[i])
    newBtn.text(searchTerms[i])
    $("#Buttons").append(newBtn)
}
//Pushes input form tbox into searchTerms array and recreates buttons
var submitSrch = function(){
  $("#Search").on("click", function(e){
    e.preventDefault();
    var input=$("#tBox").val();
    searchTerms.push(input);
    console.log(searchTerms);
  $("#Buttons").empty();
  for (i=0;i<searchTerms.length; i++){
    var newBtn = $('<button class=srch>')
    newBtn.attr('data',searchTerms[i])
    newBtn.text(searchTerms[i])
    $("#Buttons").append(newBtn)
  }
  populate();
});
}
//populates GIFs from button press
var populate= function(){
  $(".srch").on("click", function() {
    clear();
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
    var giphyImage = $("<img>");
    giphyImage.attr("src", results[i].images.fixed_height_still.url);
    giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
    giphyImage.attr("data-animate", results[i].images.fixed_height.url);
    giphyImage.addClass("gif")
    giphyImage.attr("data-state", "still")
    $("#gifs-appear-here").append(giphyImage);
    }
    //Animation
    $('.gif').hover( function() {
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
  });
  });
}
//Empties giffs when new button
var clear= function(){
  $("#gifs-appear-here").empty()
};
//Animation


submitSrch();
populate();

});