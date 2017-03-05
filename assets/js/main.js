//empty all fields on search
    function clear() {
        $("#topArticles").empty();
        $("#searchBox").val("");
        $("#startYear").val("");
        $("#endYear").val("");
    };
    
    // When user presses search get data
$("#searchButton").on("click", function () {



    // Get user input
    var searchKey = $("#searchBox").val().trim();
    var numRecords = $("#numRecords").val();
    var startYear = $("#startYear").val();
    var endYear = $("#endYear").val();

    //construct url for api request
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "a5dc5060a9b341948c54cd5ba1232a39",
        'q': searchKey

    });

    //validate year input and put into proper format
    if ((startYear !== null) && (startYear.length === 4)) {
        url = url + "&begin_date=" + startYear + "0101";
    }

    if ((endYear !== null) && (endYear.length === 4)) {
        url = url + "&end_date=" + endYear + "0101";
    }

    console.log(url);

    //use assembled url to get response from NYT API
    $.ajax({
        url: url,
        method: 'GET',

    }).done(function (response) {
        console.log(response);
        var result = response.response.docs;
        console.log(result);
        //iterate through number of artciles selected by user
        for (var i = 0; i < numRecords; i++) {
            //creat new div and append properties from returned object to it
            var newDiv = $("<div>");
            var title = $("<h2>").text(result[i].headline.main);
            var author = $("<p>").text(result[i].byline.original);
            var weburl = $("<p>").text(result[i].web_url);
            var timestamp = $("<p>").text(result[i].pub_date);
            newDiv.append(title);
            newDiv.append(author);
            newDiv.append(timestamp);
            newDiv.append(weburl);
            //append new div to html
            $("#topArticles").append(newDiv);
        }

    }).fail(function (err) {
        throw err;
    });
    
    
    clear();
    
});

$("#clearResults").on("click", function () {
    clear();
});
