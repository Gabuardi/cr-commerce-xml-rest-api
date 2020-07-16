const FS = require('fs');
const EXPRESS = require('express');
const SQL = require( "mssql" );

const APP = EXPRESS();
const PORT = 3000;

const DB_CONFIG = {
  user: 'sa', // CHANGE TO OWN USERNAME
  password: 'my5trongP4ssword', // CHANGE TO OWN PASSWORD
  server: 'localHost', // CHANGE TO OWN SERVER NAME
  port: 1433, // (DEFAULT PORT)
  database: 'Comercio',
  // parseJSON: true,
};

SQL.connect(DB_CONFIG, err => {
  if (err) {
    console.error(err)
  } else {
    console.log('-- DB CONNECTED --');
  }
});

APP.listen(PORT, () => console.log(`APP LISTENING AT -> http://localhost:${PORT}`));

function defaultQueryResponseHandler(err, res, result, positiveCallBack) {
  if (err) {
    console.error(err);
  } else {
    positiveCallBack(result, res);
  }
}

function sendXml(DbResult, response) {
  let xmlObject = DbResult.recordset[0]['XML_F52E2B61-18A1-11d1-B105-00805F49916B'];
  response.set('Content-Type', 'text/xml');
  response.send(xmlObject);
}

APP.get('/products', (req, res) => {
  let sqlRequest = new SQL.Request();
  let sqlQuery = FS.readFileSync('sqlQueries/getProductsAsXML.sql').toString();
 sqlRequest.query(sqlQuery, (err, result) => defaultQueryResponseHandler(err, res, result, sendXml));
});

APP.get('/providers/al', (req, res) => {
  let sqlRequest = new SQL.Request();
  let sqlQuery = FS.readFileSync('sqlQueries/getAlajuelaProvidersAsXML.sql').toString();
  sqlRequest.query(sqlQuery, (err, result) => defaultQueryResponseHandler(err, res, result, sendXml));
});

APP.get('/products/meats', (req, res) => {
  let sqlRequest = new SQL.Request();
  let sqlQuery = FS.readFileSync('sqlQueries/getMeatsAsXML.sql').toString();
  sqlRequest.query(sqlQuery, (err, result) => defaultQueryResponseHandler(err, res, result, sendXml));
});

module.exports = APP;
