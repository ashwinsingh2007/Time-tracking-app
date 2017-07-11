const express = require('express');
const router = express.Router();
var db = require('../models/database');

router.get('/tasks', function(req, res) {
    console.log(req.query);
    var query = '';
    var array_data = [req.query.id];
    if (req.query.permission == 'admin') {
        if (req.query.id == null || req.query.id == '') {
            query = 'select * from taskinfo limit 100';
        } else {
            query = 'select * from taskinfo where userid = $ limit 100';
        }
    } else {
        query = 'select * from taskinfo where userid = $1 limit 100';
    }
    try {
        db.getData(query, array_data, function(result) {
            console.log(result);
            res.send(result);
        });
    } catch (ex) {
        console.log(ex);
        res.send();
    }
});

router.post('/tasks', function(req, res) {
    //var query = 'insert into taskinfo values($1,$2,$3,$4,$5,$6)';
    var query = 'insert into taskinfo values($1,$2)';
    var array_data = [req.body.id, req.body.task];
    //var array_data = [req.body.id, req.body.task, req.body.details, req.body.time, req.body.starttime, req.body.date];
    try {
        db.insertData(query, array_data, function(result) {
            query = 'select * from taskinfo where userid = $1 limit 100';
            array_data = [req.body.id];
            if (result) {
                db.getData(query, array_data, function(result) {
                    console.log('hellllllllllllllll');
                    console.log(result);
                    res.send(result);
                });
            }

        });
    } catch (ex) {
        console.log(ex);
        res.send();
    }
});

router.put('/api/tasks', function(req, res) {
    var query = 'update taskinfo set usertask = $2 , taskdetails = $3 where userid = $1 ';
    var array_data = [req.body.id, req.body.task, req.body.details, req.body.time, req.body.starttime, req.body.date];

    try {
        db.updateData(query, array_data, function(result) {
            console.log(result);
            res.send();
        });
    } catch (ex) {
        console.log(ex);
        res.send();
    }
});

router.delete('/api/tasks', function(req, res) {
    var query = 'delete from taskinfo where userid = $1 ';
    var array_data = [req.body.id];
    try {
        db.deleteData(query, array_data, function(result) {
            console.log(result);
            res.send();
        });
    } catch (ex) {
        console.log(ex);
        res.send();
    }
});

module.exports = router;