// When user presses search get data
$("#searchButton").on("click", function () {
    $("#topArticles").empty();
    $("#searchBox").val("");
    $("#startYear").val("");
    $("#endYear").val("");
    
    // Get user input
    var searchKey = $("#searchBox").val().trim();
    var numRecords = $("#numRecords").val();
    var startYear = $("#startYear").val();
    var endYear = $("#endYear").val();

   
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "a5dc5060a9b341948c54cd5ba1232a39",
        'q': searchKey
        
    });

console.log(url);

    
    $.ajax({
        url: url,
        method: 'GET',
        
    }).done(function (response) {
        console.log(response);
        var result = response.response.docs;
        console.log(result);
         for (var i = 0; i < numRecords; i++) {
        var newDiv = $("<div>");
        var title = $("<h2>").text(result[i].headline.main);
        var author = $("<p>").text(result[i].byline.original);
        var weburl = $("<p>").text(result[i].web_url);
        newDiv.append(title);
        newDiv.append(author);
        newDiv.append(weburl);

        $("#topArticles").append(newDiv);
    }

    }).fail(function (err) {
        throw err;
    });
        
   

});

$("#clearResults").on("click", function(){
    $("#topArticles").empty();
    $("#searchBox").val("");
    $("#startYear").val("");
    $("#endYear").val("");
});
