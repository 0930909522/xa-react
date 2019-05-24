var SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
var port = new SerialPort('/dev/tty.usbmodem14102', {
 baudRate: 115200,
 autoOpen: false
});

var data_send ;

const parser = new Readline();
port.pipe(parser);
port.open(() => {
    console.log("Port open");
    parser.on('data', (data) => {
      console.log('Received Data: ' + data.toString());
      processData(data);
    });
})
function processData(data) {
    if (data.indexOf('NEXT') == 0) {
        data_send = 'NEXT';
        console.log('NEXT');
        // Handle NEXT received
    } else if (data.indexOf('PREVIOUS') == 0) {
        data_send = 'PREVIOUS';
        console.log('PREVIOUS');
        // Handle PREVIOUS received
    } else if (data.indexOf('SHUFFLE') == 0) {
        data_send = 'SHUFFLE'
        console.log('SHUFFLE');
        // Handle SHUFFLE received
    }
    // const axios = require('axios')

    // axios.post('https://flaviocopes.com/todos', {
    // click: data_send
    // })
}

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb://buzz1:1234Rtyu@ds123645.mlab.com:23645/microbit";


// 你的DB名稱  
const dbName = 'microbit';

// main--主程式區
// 連接mlab mongoDB server
MongoClient.connect(url, function(err, client) {

    client.collection('Persons',function(err,collection){
        collection.insert({ id:1, firstName:'Steve', lastName:'Jobs' });
        collection.insert({ id:2, firstName:'Bill', lastName:'Gates' });
        collection.insert({ id:3, firstName:'James', lastName:'Bond' });
     
        collection.count(function(err,count){
            if(err) throw err;
            console.log('Total Rows:'+count);
        });
      });  


  assert.equal(null, err);
  
  console.log("Connected successfully to server");  

  const db = client.db(dbName);

  client.close();
});