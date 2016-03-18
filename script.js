$(document).ready(function(){
	movieList();
	ratingList();
});
var playPause=1;




$("#romanceButton").on("click",function(e){
	e.preventDefault();
	playPause++;
	if(playPause%2===0){
		$("#romantic")[0].play();
	}else{
		$("#romantic")[0].pause();
	}

});

$("#movieForm").on("submit",function(e){
   e.preventDefault();
   fetchMovie();
});

$("#recipeToMovie").on("click",function(){
	$("#foodResults").fadeOut("slow",function(){
		$("#movies").fadeIn("slow");
	});
});

$("#movieToRecipe").on("click",function(){
	$("#movieResults").fadeOut("slow",function(){
		$("#food").fadeIn("slow");
	});
});

$("#foodButton").on("click",function(){
	foodIn();
});

$("#foodForm").on("submit",function(event){
	event.preventDefault();
	fetchFood();
	foodResultsIn();
});

$("#recipeRedo").on("click",function(){
	$("#foodResults").fadeOut("slow",function(){
		$("#food").fadeIn("slow");
	});
});

$("#movieButton").on("click",function(){
	moviesIn();
});


$("#movieForm").on("submit",function(event){
	event.preventDefault();
	movieResultsIn();
});

$("#movieRedo").on("click",function(){
	$("#movieResults").fadeOut("slow",function(){
		$("#movies").fadeIn("slow");
	});
});

$("#home").on("click",function(){
	$("#movies").fadeOut("slow",decisionsIn());

	$("#movieResults").fadeOut("slow",decisionsIn());

	$("#food").fadeOut("slow",decisionsIn());

	$("#foodResults").fadeOut("slow",decisionsIn());
});

function decisionsIn(){
	$("#decisions").delay(600).fadeIn("slow");
}

function fetchMovie(){
    var genre = $("#genres").val();
    var minRating=$("#movieRating").val();
    var movie = {};

	$.ajax({
	    url:"http://api.themoviedb.org/3/discover/movie/?api_key=4028e1b5f019a11083402c1d3f465a4d&vote_average.gte="+minRating+"&with_genres="+genre,
	    jsonp: "callback",
	    dataType: "jsonp"
        }).done(function(data){
	    	movie = data.results[Math.floor(Math.random()*data.results.length)];
	        clearMovie();
	        $("#movieTitle").append(movie.original_title);
			$("#score").append(movie.vote_average);
			$("#overview").append(movie.overview);
			$("#poster").attr("src","https://image.tmdb.org/t/p/w185/"+movie.poster_path);
	 });
}

function fetchFood(){
    var protein=$("#protein").val();
    var dish = {};

	$.ajax({
		"crossDomain": true,
	    url:"https://api.edamam.com/search?q="+protein+"&yield=2&app_id=9db068e3&app_key=525eb025307f0606f3bccd6c0f7dfbe9",
	    dataType: "jsonp"
        }).done(function(data){
	        dish=data.hits[Math.floor(Math.random()*data.hits.length)].recipe;
	        clearFood();
	        $("#foodName").append(dish.label);
			$("#foodImage").attr("src",dish.image);
			$("#recipeLink").attr("href",dish.url);
			for(i=0;i<dish.ingredientLines.length;i++){
				$("#ingredients").append("<li>"+dish.ingredientLines[i]+"</li>");
			}
	 });
}
function clearFood(){
	$("#foodName").empty();
	$("#ingredients").empty();
	$("#foodImage").attr("src","");
}

function clearMovie(){
	$("#movieTitle").text("");
	$("#score").text("");
	$("#overview").text("");
	$("#poster").attr("src","");
}

function movieList(){
        var genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":10769,"name":"Foreign"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}];
    for(i=0;i<genres.length;i++){
        $("#genres").append("<option value="+genres[i].id+">"+genres[i].name+"</option>");
    }
}

function ratingList(){
	for(i=1;i<10;i++){
		$("#movieRating").append("<option>"+i+"+</option>");
	}
}

function foodResultsIn(){
	$("#food").fadeOut("slow",function(){
		$("#foodResults").fadeIn("slow");
	});
}

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

function movieResultsIn(){
	$("#movies").fadeOut("slow", function(){
		$("#movieResults").fadeIn("slow");
	});
}