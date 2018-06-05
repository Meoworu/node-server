const express = require('express');
const marked = require('marked');
const fs = require('fs');
const multiparty = require('multiparty');
const iconv = require('iconv-lite');//
const router = express.Router();
const test = require('assert');
const mongo = require('../public/javascripts/mongo.js');
const file = require('../public/javascripts/file.js');




/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({name:'吴志祥'});
});
router.get('/tabClass', function(req, res, next) {
    mongo.find('box', function(items){
        res.send(items);
    });
});
router.get('/markdown', function(req, res, next) {
    console.log(req);//query
    let obj = { id : parseInt(req.query.id)};
    mongo.find('box',function(data){
        console.log(data);
        let fileName = data[0].name;
        file.read(fileName, function(mark){
            console.log(mark);
            let str = mark.toString('utf-8');
            let html = marked(str);
            res.send({code:1,html:html});
        })
    }, obj)
});
router.post('/file', function(req, res, next) {
    let form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        let url = files.file[0].path;
        let name = fields.name[0];
        let descriptive = fields.descriptive[0];
        file.exist(name, function(flag){
            if(flag){
                res.send({code:2, msg:'该名称已经被占用，请重新命名'});
            }else{
                mongo.count('box', function(n){
                    let id = n+1;
                    let obj = [{name:name, descriptive:descriptive, id:id}];
                    mongo.inster('box', obj, {forceServerObjectId:true});
                    fs.readFile(url, {flag: 'r+', encoding: 'utf8'}, function (err, data) {
                        if(err){
                            res.send({code:0,msg:'上传失败'});
                            return ;
                        }
                        let buf  = new Buffer(data, 'utf-8');
                        file.write(name, buf, true, {}, function(){
                            res.send({code:1, msg:'上传成功'});
                        })
                    });
                });
                
            }
        })
       
    });
});


module.exports = router;
