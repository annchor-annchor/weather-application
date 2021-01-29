// Requring Necessary Frameworks
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

// Getting The Main Page
app.use('*/css',express.static('public/css'));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
	res.sendFile(__dirname+"/index.html");
});

// Getting Info From User
app.post("/",function(req,res){
	const query = req.body.cityName;
	const apiKey = "c832e40bf02b89a3ee87a27f8a923a25";
	const units = "metric";
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units+"";
	https.get(url, function(response){
		console.log(response);

// Preparing Response
	response.on("data", function(data){
		const weatherData = JSON.parse(data);
		const temp = weatherData.main.temp;
		const description = weatherData.weather[0].description;
		const icon = weatherData.weather[0].icon;
		const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";	

// Sending Response
		if (response.statusCode === 200) {
			res.write("<style>@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Inconsolata:wght@300&family=Montserrat:wght@200&display=swap');body{background-color: #1a508b;text-align: center;margin: 15% 20% 0% 20%;font-family: 'Montserrat';font-size: 1rem;color: #fff3e6;} img {border-radius: 50%;background-color: #fff3e6;} h1 {font-size: 3.5rem;font-family: 'Caveat';text-shadow: 3px 1px 0 #0d335d;margin-bottom: 10px;} h3:hover{color:#c0e218;} h1:hover{color:#c0e218;}</style><h1>The temperature in "+query+" is "+temp+" C</h1>");
			res.write("<h3>The weather is currently "+description+".</h3>");
			res.write("<img src="+imgURL+">");
			res.send();
		}});
	});
});

app.listen(3000, function() {
	console.log("Server is running on port 3000");
});



