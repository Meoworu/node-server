const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'wzx';
// Connect using MongoClient


class Mongo {
    constructor(name, url){
        this.dbname = name;
        this.url = url;
    }
    inster(table, query , option, callback){
        let self = this ;
        query = query || {};
        option = option || {};
        MongoClient.connect(self.url, { useNewUrlParser: true }, function(err, client) {
            const col = client.db(self.dbname).collection(table);
            col.insert( query , option, function(err, result) {
                callback&&callback(result);
                client.close();
            });
        });
    }
    find(table, callback, query , option){
        let self = this ;
        query = query || {};
        option = option || {};
        MongoClient.connect(self.url, { useNewUrlParser: true }, function(err, client) {
            const col = client.db(self.dbname).collection(table);
            col.find(query, option).toArray(function(err, items) {
                callback&&callback(items);
                client.close();
            });
        });
    }
    remove(table, query, options, callback){
        let self = this ;
        query = query || {};
        option = option || {};
        MongoClient.connect(self.url, { useNewUrlParser: true }, function(err, client) {
            const col = client.db(self.dbname).collection(table);
            col.remove( query , option, function(err, result) {
                callback&&callback(result);
                client.close();
            });
        });
    }
    update(table, selector, document, options, callback){
        let self = this ;
        selector = selector || {};
        option = option || {};
        MongoClient.connect(self.url, { useNewUrlParser: true }, function(err, client) {
            const col = client.db(self.dbname).collection(table);
            col.update( query , option, function(err, result) {
                callback&&callback(result);
                client.close();
            });
        });
    }
    count(table, callback, query, option ){
        let self = this ;
        query = query||{};
        option = option||{};
        MongoClient.connect(self.url, { useNewUrlParser: true }, function(err, client) {
            const col = client.db(self.dbname).collection(table);
            col.count( query , option, function(err, result) {
                callback&&callback(result);
                client.close();
            });
        });
    }
}
const mongo = new Mongo (dbName, url);
module.exports = mongo ;


