var express = require('express')
var router = express.Router()
const { Client } = require('pg')
var jsforce = require('jsforce');

require('custom-env').env('local')

router.get('/db', (req, res) => {
  var dbOpts = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
  const client = new Client(dbOpts)
  // console.log(client.connect())
  client.connect()
  // console.log(client)
  client
    .query('select account from sfdemo.account;')
    .then(dbRes => {
      console.log(dbRes)
      client.end()
      res.json(dbRes)

    })
    .catch(err => {
      console.log(err)
      client.end()
      res.json(err)
    })
})

router.get('/js', (req, res, next) => {
  var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : 'https://login.salesforce.com/'
  });
  conn.login('username', 'password', function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // ...
  });
}),

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'welcome user' })
})

module.exports = router
