


$(document).ready(function() {
	//alert("test");\
	$("#getquote").on("click", function(){
		$("#empty").load("homepage.html");
	});

	$("#get_button").on("click", function(){

		if ($("#screen_name_form").val() === ""){
			$("#emptyErrorModal").modal('show');

		} else {
			tweets = [];
			inputHandler($("#screen_name_form").val());
			let nr = nameArray.length;
			getTweets();



			setTimeout(function() {
				if (tweets.length === 0){
					$("#noTweetsErrorModal").modal('show');
					$("#output-tweet-text").text("„Despite the constant negative press covfefe”").fadeTo(500, 1);;
				} else {
					let x = generateTweet(tweets);
					$("#output-tweet-text").text("„" + x + "”").fadeTo(500, 1);
				}

			},1000 * nr);

				$("#output-jumbotron").slideDown();
				$('html, body').animate({
		        scrollTop: $("#output-jumbotron").offset().top
		    }, 2000);
				if (shown) {
					//TODO show again after new quote generated
					$("#output-tweet-text").fadeTo(500, 0);
				}
				shown = true;

		}

	});

	$("#share-button").on("click", function(){
		let tweet = $("#output-tweet-text").text();
		tweet = tweet.slice(1,tweet.length - 1);
		tweet = encodeURIComponent(tweet);
		let url = "http://twitter.com/share?text=" + tweet;
		let features = "width=575, height=400";
		window.open(url, 'share dis', features);
		return false;
	});


});
var shown = false;
var nameArray;
var tweets = [];

function generateTweet(array){
		let tweet = "";
		for (let i = 0; i < 3; i++){
			let a = getRandomInt(0,array.length);
			let temp = array[a].split(" ");
			let x = Math.floor(temp.length / 3);
			for (let j = 0 + i*x; j < x + i*x && temp.length; j++){
				tweet = tweet + " " + temp[j];
			}
		}
		return tweet;

}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function inputHandler(input){
		let removeSpaces = input.replace(/\s/g, '');
		nameArray = removeSpaces.split(",");
		console.log(nameArray);
	}

	function getTweets(){
		while (nameArray.length > 0){
			let name = nameArray.pop();
			getTwitterProfile(name);
		}
	}

function getTwitterProfile(screenName){
	let config = {
		"profile": {"screenName": screenName},
		"domId": 'exampleProfile',
		"maxTweets": 30,
		"enableLinks": false,
		"showUser": false,
		"showTime": false,
		"showImages": false,
		"showInteraction": false,
		"lang": 'en',
		"showRetweet": false,
		"showPermalinks": false,
		"dataOnly": true,
		"customCallback": getProfileCallback
	}
	twitterFetcher.fetch(config);
}

function getProfileCallback(data){
	let tweetArray = [];
	for (let i = 0; i < data.length; i++){
		tweetArray.push(strip(data[i].tweet));
	}
	let a = cleanTweets(tweetArray);
	for (let i = 0; i < a.length; i++){
		if (a[i] !== ""){
			tweets.push(a[i]);
		}

	}

}

function cleanTweets(arr){
	let out = [];
	for (let i = 0; i < arr.length; i++){
		let index = arr[i].lastIndexOf("://");
		if (index === -1){
			out.push(arr[i]);
		} else {
			out.push(arr[i].slice(0, index - 5));
		}
	}
	for (let i = 0; i < out.length; i++){
		out[i] = out[i].replace(/[^\w\s]/gi, '');
	}
	return out;
}

function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}
