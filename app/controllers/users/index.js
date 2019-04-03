var express = require("express");
var router = express.Router();
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1b",
  endpoint: "demo-db.crlljscnxlkw.us-east-1.rds.amazonaws.com",
});

var docClient = new AWS.DynamoDB.DocumentClient();
/* GET users listing. */
router.post("/new", async (req, res, next) => {
  console.log("req body", req.body);
  var table_name = "demo-db";
  var created_date = new Date().toDateString();

  var params = {
    TableName: table_name,
    Item: {
      id: 23,
      created_date: created_date,
      name: req.body.name,
      email: req.body.email,
    },
  };

  console.log("Adding a new user...");
  docClient.put(params, function(err, data) {
    if (err) {
      console.error(
        "Unable to add user. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      res.json({
        error: "something went wrong",
        params: params,
      });
    } else {
      console.log("Added user:", JSON.stringify(data, null, 2));
      res.json(params.Item);
    }
  });
});

module.exports = router;
