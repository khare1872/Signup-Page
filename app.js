const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var FirstName = req.body.fname;
  var LastName = req.body.lname;
  var Email = req.body.email;
  var data = {
    members:[
      {
        email_address: Email,
        status: "subscribed",
        merge_fields:{
          FNAME: FirstName,
          LNAME: LastName
        }
      }
    ]
  };
  var jsonData=JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/e9650c2b88";
  const options = {
    method: "POST",
    auth: "Shubham:6c995beda3209d31b53582c990313530-us7"

  }
const request=  https.request(url,options,function(response){

   if(response.statusCode === 200){
     res.sendFile(__dirname+"/success.html");
   }
   else {
    res.sendFile(__dirname+"/failure.html");
   }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })

  })

  request.write(jsonData);
 request.end();
});

















app.listen(3000,function(){
  console.log("Server running on port 3000");
});

//API KEY
//6c995beda3209d31b53582c990313530-us7
//List // IDEA:
// e9650c2b88
