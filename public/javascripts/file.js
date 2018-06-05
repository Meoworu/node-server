const MongoClient = require('mongodb').MongoClient;
const GridStore = require('mongodb').GridStore;
const ObjectID = require('mongodb').ObjectID;
const test = require('assert');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'file';
// Connect using MongoClient


class File {
    constructor(url, dbName){
        this.url = url;
        this.dbName = dbName;
    }

    write(name, data, close, options, callback){
        let self = this;
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
            const db = client.db(self.dbName);
            const gridStore = new GridStore(db, null, name, 'w');
            gridStore.open(function(err, gridStore) {
                gridStore.write(data, close, options, function(err, gridStore) {
                    console.log('写入成功');
                    if(err){return};
                    callback();
                });
            });
        });
    }

    read(name, callback){
        let self = this;
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
            const db = client.db(self.dbName);
            GridStore.read(db, name, function(err, data) {
                callback && callback(data);
                client.close();
            });
        });
    }

    exist(name, callback){
        let self = this;
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
            const db = client.db(self.dbName);
            GridStore.exist(db, name, function(err, res) {
                console.log(res);
                callback && callback(res);
            });
        });
    }

}

const file = new File( url, dbName );
module.exports = file ;