const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/skywalker';

var getData = function(qry, array_data, callback) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            done();
            console.log(err);
            callback(false);
        }
        const query = client.query(qry, array_data);
        query.on('row', (row) => {
            results.push(row);
        });
        query.on('end', () => {
            done();
            callback(results);
        });
    });
}

var insertData = function(qry, array_data, callback) {
    pg.connect(connectionString, (err, client, done) => {
        if (err) {
            done();
            console.log(err);
            callback(false);
        }
        client.query(qry, array_data);
        callback(true);
    });
}

var updateData = function(req, res, qry, callback) {
    pg.connect(connectionString, (err, client, done) => {
        if (err) {
            done();
            console.log(err);
            callback(false);
        }
        client.query(qry, [data.text, data.complete, id]);
        callback(true);
    });
}

var deleteData = function(req, res, qry, callback) {
    pg.connect(connectionString, (err, client, done) => {
        if (err) {
            done();
            console.log(err);
            callback(false);
        }
        client.query(qry, [id]);
        callback(true);
    });
}

exports.getData = getData;
exports.insertData = insertData;
exports.updateData = updateData;
exports.deleteData = deleteData;