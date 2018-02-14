
var AWS = require('aws-sdk');
var creds = new AWS.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
// Specify region, credentials in AWS config
AWS.config.update({
    credentials: creds,
    region:'us-west-2'
});
console.log(creds);
var ec2 = new AWS.EC2();
var params = {
  ImageId: 'ami-79873901',
  InstanceType: 't2.micro',
  KeyName: 'DevOps',
  MinCount: 1,
  MaxCount: 1
};

ec2.runInstances(params, function(err, data) {
  if (err) {
      console.log("Error, cant create instance", err);
      return;
  }
  console.log("\n\ncreating aws ec2 instance\n\n");
  var id = data.Instances[0].InstanceId;
  console.log("instance created. id= ", id);
  var params_instance = {
      InstanceIds: [id]
    };

  setTimeout(function(){
    ec2.describeInstances(params_instance,function (err, data){
        if (err) console.log(err, err.stack);
        else {
            var ipaddress = data.Reservations[0].Instances[0].PublicIpAddress;
            console.log("\n\npublic ip address of instance created is= "+ipaddress);
            }
        });
    },15000);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
setTimeout(function(){
  var needle = require("needle");
  var os   = require("os");
  var config = {};
  config.token = process.env.DOTOKEN;
  console.log("\n\ncreating digital ocean droplet\n\n");
  console.log("Your token is:", config.token);

  var headers =
  {
  	'Content-Type':'application/json',
  	Authorization: 'Bearer ' + config.token
  };

  var client =
  {
  	listIP: function(dropletId, onResponse )
  	{
  		var api="https://api.digitalocean.com/v2/droplets/"+dropletId;
  		needle.get(api, {headers:headers}, onResponse)
  	},
  	createDroplet: function (dropletName, region, imageName, onResponse)
  	{
  		var data =
  		{
  			"name": dropletName,
  			"region":region,
  			"size":"512mb",
  			"image":imageName,
  			"ssh_keys": [18319198],
  			"backups":false,
  			"ipv6":false,
  			"user_data":null,
  			"private_networking":null
  		};

  		console.log("Attempting to create: "+ JSON.stringify(data) );

  		needle.post("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );
  	}

  };
   var name = "uddhav-"+os.hostname();
   var region = "nyc1"; // Fill one in from #1
   var image = "docker"; // Fill one in from #2
   var dropletId;
   client.createDroplet(name, region, image, function(err, resp, body)
   {
   	console.log(body);
  	dropletId = body.droplet.id;
  	console.log("\n\ndroplet id: " + dropletId);
  	//stop.sleep(30);
   	// StatusCode 202 - Means server accepted request.
   	if(!err && resp.statusCode == 202 && dropletId != null)
   	{
   		//console.log( JSON.stringify( body, null, 3 ) );
  		 client.listIP(dropletId, function(error, response)
  		  {
  		 	var data = response.body;
  		 	//console.log( JSON.stringify(response.body) );

  		 	if( response.headers )
  		 	{
  		 		console.log( "Calls remaining", response.headers["ratelimit-remaining"] );
  		 	}
  			var ip_address = (data.droplet.networks.v4[0].ip_address);
  		 	console.log("\n\nIP address of created droplet: "+ ip_address);
  		  });
   	}
   });

}, 30000);
