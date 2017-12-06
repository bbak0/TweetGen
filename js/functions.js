

$(document).ready(function() {
	//alert("test");
	$("#getquote").on("click", function(){
		$("#empty").load("homepage.html");
	});
	
	$("#get_button").on("click", function(){
		inputHandler($("#screen_name_form").val());
		getTwitterProfile(nameArray.pop());
	});
	

});

var nameArray;
var tweets = "";

function inputHandler(input){
		let removeSpaces = input.replace(/\s/g, '');
		nameArray = removeSpaces.split(",");
		console.log(nameArray);
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
	let tweetArray = []
	for (let i = 0; i < data.length; i++){
		tweetArray.push(strip(data[i].tweet));
	}
	let a = cleanTweets(tweetArray);
	for (let i = 0; i < a.length; i++){
		tweets = tweets + a[i] + "\n";
	}
	console.log(a);
	if (nameArray.length > 0){
		let name = nameArray.pop()
		getTwitterProfile(name);
		
	} else {
		
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

