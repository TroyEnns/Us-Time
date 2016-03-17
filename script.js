$(document).ready(function(){
	movieList();
	ratingList();
});

$("#movieForm").on("submit",function(e){
   e.preventDefault();
   fetchMovie();
});


$("#foodButton").on("click",function(){
	foodIn();
});

$("#foodForm").on("submit",function(event){
	event.preventDefault();
	fetchFood();
	foodResultsIn();

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
	        console.log(movie);
	        console.log(movie.original_title);
	        clearMovie();
	        $("#movieTitle").append(movie.original_title);
			$("#score").append(movie.vote_average);
			$("#overview").append(movie.overview);
			$("#poster").attr("src","https://image.tmdb.org/t/p/w185/"+movie.poster_path);
	 });
}

function fetchFood(){
    var difficulty = $("#difficulty").val();
    var protein=$("#protein").val();
    var dish = {};

	$.ajax({
		"crossDomain": true,
	    url:"https://api.edamam.com/search?q="+protein+"&yield=2&level="+difficulty+"&app_id=9db068e3&app_key=525eb025307f0606f3bccd6c0f7dfbe9",
	    dataType: "jsonp"
        }).done(function(data){
	    	// movie = data.results[Math.floor(Math.random()*data.results.length)];
	        dish=data.hits[Math.floor(Math.random()*data.hits.length)].recipe;
	        console.log(dish);
	  //       console.log(movie.original_title);
	  //       clearMovie();
	        $("#foodName").append(dish.label);
			$("#foodImage").attr("src",dish.image);
			for(i=0;i<dish.ingredientLines.length;i++){
				$("#ingredients").append("<li>"+dish.ingredientLines[i]+"</li>");
			}
	 });
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



