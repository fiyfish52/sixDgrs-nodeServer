const MongoClient = require('mongodb').MongoClient;
const config = require('./dbConfigs').aliyun
const assert = require('assert');

// Connection URL
const url = 'mongodb://' + config.host + ':' + config.port

// Database Name
const dbName = config.dbName


/**
 * 插入文档，自动生成集合
 * @param {*} db 
 * @param {*} data 
 * @param {*} callback 
 */
const insertDocuments = function (db, data, callback) {
  // Get the documents collection
  const collection = db.collection(data.collection);
  // Insert some documents
  collection.insertMany(data.document, function (err, result) {
    assert.equal(err, null);
    assert.equal(2, result.result.n);
    assert.equal(2, result.ops.length);
    console.log('Inserted 3 documents into the collection');
    callback(result);
  });
};
/**
 * 获取文档信息
 * @param {*} db 
 * @param {*} callback 
 */
const findDocuments = function (db, data, callback) {
  // Get the documents collection
  const collection = db.collection(data.collection);
  // Find some documents
  collection.find(data.document).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log('Found the following records');
    console.log(docs);
    callback(docs);
  });
};



/**
 * 
 * @param {*} optype I 插入文档
 * @param {*} data  object{collection:String:集合 ,document:Array:文档，}
 */
const mongodbOP = function (optype, data, callback) {

  const client = new MongoClient(url, { useUnifiedTopology: true });
  client.connect(function (err) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    if ("I" === optype) {
      insertDocuments(db, data, function (result) {
        console.log(result)
        callback(result)
        client.close()
      });
    }
    if ("QUE" === optype) {
      findDocuments(db, data, function (result) {
        console.log(result)
        callback(result)
        client.close()
      });
    }
  });
}

module.exports = mongodbOP



