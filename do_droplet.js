var needle = require("needle");
var os   = require("os");
var config = {};
config.token = process.env.DOTOKEN;
console.log("Your token is:", config.token);

var headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config.token
};

// Documentation for needle:
// https://github.com/tomas/needle

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
			// Id to ssh_key already associated with account.
			"ssh_keys": [18319198],
			//"ssh_keys":null,
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
