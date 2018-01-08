// Initial array of movies
var comics = ["Eddie Murphy", "Richard Pryor", "Robin Williams", "Dana Carvey"];

// Function for dumping the JSON content for each button into the div
function displayButtons() {
    var uInput = $(this).attr("data-name").val();
}

function displayResults() {

}

// Function for displaying buttons and associated data
function renderButtons() {

    // Deleting the buttons prior to adding new ones
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of comics
    for (var i = 0; i < comics.length; i++) {

        // Then dynamicaly generating buttons for each comedian in the array
        var a = $("<button id=comedy-button>");
        // Adding a class of qComic to our button
        a.addClass("btn btn-primary");
        // Adding a data-attribute
        a.attr("data-name", comics[i]);
        // Providing the initial button text
        a.text(comics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#comicAdd").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the button
    var uInput = $("#comic-input").val().trim();

    // The comedian from the textbox is then added to our array
    comics.push(uInput);

    // Calling renderButtons which handles the processing of our comics array
    renderButtons();

});
$("#buttons-view").on("click", function(event) {
    event.preventDefault();
    //removing previous images forwarded tothe DOM (...who lives his life 1/4 mile at at time btw)
    $("#image-dump").empty();

    //Taking the value of the button to be used in the API call
    var qValue = $(this).attr("data-name");

    //Key for API call
    var apiKey = "fd97xm0dye3ax1q8GiTZdrvMbUMqJTEt"

    //Setting a variable to store the object indexes of the response for further processing
    var imageUrls = [0, 2, 3, 4, 5, 6, 7, 8, 9];

    //dynamically applying the query string to the API call based on the data-name of the clicked button
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + qValue + "&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(dataDump) {
        for (var i = 0; i < imageUrls.length; i++) {
            var getUrls = dataDump.data[i].images.fixed_height_small.url;
            var newElement = $(`<img src=${getUrls}>`);
            $("#image-dump").append(newElement);
            console.log(qValue);
            console.log(getUrls);
        }
    });

});

// Generic function for displaying the movieInfo
$(document).on("click", ".category-input", displayButtons);

// Calling the renderButtons function to display the intial buttons
renderButtons();