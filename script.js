$(document).ready(function(){


	$("#foodButton").on("click",function(){
		foodIn();
		getFood();
	});

	$("#movieButton").on("click",function(){
		moviesIn();
		getMovie();
	});

	$("#movieForm").on("submit",function(event){
		event.preventDefault();
		resultsIn();
	});

});


function foodIn(){
		$("#decisions").fadeOut("slow", function(){
			$("#food").fadeIn("slow");
		});
	}

function moviesIn(){
	$("#decisions").fadeOut("slow", function(){
		$("#movies").fadeIn("slow");
	});
}

function resultsIn(){
	$("#movies").fadeOut("slow", function(){
		$("#movieResults").fadeIn("slow");
	});
}

function getFood(){
	$.ajax({
    	url:"https://api.yelp.com/v2/search?term=food&location=San+Francisco&limit=3",
        jsonp: "callback",
        dataType: "jsonp",
        oauth_consumer_key: "Q5sozFRWW3WUJhSXc3kwSw",
        oauth_token:"dwZARp07lKGEcUf4dSt2zlrSxMWdEDdw",
        oauth_signature_method:"hmac-sha1",
        oauth_signature:"fmZdqzrk4xVC-J6-ZOjCo8HtD-E"
    	}).done(function(data){
        console.log(data);
        });
	}

function getMovie(){
	$.ajax({
    	url:"http://netflixroulette.net/api/api.php?title=Attack%20on%20titan",
    	json: "callback",
        dataType: "json"
      }).done(function(data){
        console.log(data);
    });
}