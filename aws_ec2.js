// Require the AWS SDK module
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
