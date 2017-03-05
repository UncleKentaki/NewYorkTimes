// When user presses search get data
    $("#searchButton").on("click", function(){
        // Get user input
        var searchKey = $("#search").val().trim();
        var numRecords = $("#numRecords").val();
        var startYear = $("#startYear").val();
        var endYear = $("#endYear").val();

        var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + searchKey + "";
        queryURL = encodeURI(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            results = response.response.docs;
            console.log(results);

            for(var i = 0; i<results.length; i++){
                var newDiv = $("<div>");
                var title = $("<h2>").text(results[i].headline.main);
                var author = $("<p>").text(results[i].byline);
                var weburl = $("<p>").text(results[i].web_url);
                newDiv.append(title);
                newDiv.append(author);
                newDiv.append(weburl);

                $("#topArticles").append(newDiv);
            }


        });
    });