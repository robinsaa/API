var express = require('express');
var router = express.Router();

// Load the MySQL pool connection
const pool = require('../db-config');
var table = 'SALE';

/* GET sales listing. */
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    // Use the connection
    connection.query('SELECT * FROM ' + table, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
   
      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
      console.log(results);
      res.send(results);
    });
  });
});

// GET sale record by id
router.get('/:id', function(req, res, next){
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    // Use the connection
    
    connection.query('SELECT * FROM ' + table + ' WHERE id = ' + req.params.id, function (error, result, fields) {
      // When done with the connection, release it.
      connection.release();
   
      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
      console.log(result);
      res.send(result);
    });
  });
})

// POST a sale record
router.post('/', function(req, res, next){
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    /* Begin transaction */
    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      // Build query
      var query = 'INSERT INTO ' + table + ' (cup_id, cafe_id, scanned_at) VALUES (' + req.body.cup_id + ', ' + req.body.cafe_id + ', current_timestamp())';
      console.log(query);

      connection.query(query, function(err, result) {
        if (err) { 
          console.log('Rolling back...');
          connection.rollback(function() {
            throw err;
          });
        }
    
        const log = result.insertId;

        // Build query
        var query = 'UPDATE CUP SET status = \'B\' WHERE id = ' + req.body.cup_id + ';';
        console.log(query);
        connection.query(query, function(err, result) {
          if (err) { 
            console.log('Rolling back...');
            connection.rollback(function() {
              throw err;
            });
          }  
          connection.commit(function(err) {
            if (err) { 
              console.log('Rolling back...');
              connection.rollback(function() {
                throw err;
              });
            }
            console.log('Transaction Completed Successfully.');
            // When done with the connection, release it.
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
            console.log(result);
            res.status(201).send(`{"message" : "Sale recorded with ID: ${log}"}`);
          });
        });
      });
    });
    /* End transaction */
  });
});

// PUT (update) to a sale record by id
router.put('/:id', function(req, res, next){
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    // Build query
    var query = 'UPDATE ' + table + ' SET';
    query += (req.body.cup_id != null ? ' cup_id = ' + req.body.cup_id : '');
    if(req.body.cup_id != null && (req.body.cafe_id != null || req.body.scanned_at != null))
      query += ','
    query += (req.body.cafe_id != null ? ' cafe_id = ' + req.body.cafe_id : '');
    if(req.body.cafe_id != null && req.body.scanned_at != null)
      query += ','
    query += (req.body.scanned_at != null ? ' scanned_at = \'' + req.body.scanned_at + '\'' : '');
    query += ' WHERE id = ' + req.params.id;
    console.log(query);

    // Use the connection    
    connection.query(query, function (error, result, fields) {
      // When done with the connection, release it.
      connection.release();
   
      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
      console.log(result);
      if(result.changedRows == 1)
        res.send(`{"message" : "Sale record updated successfully"}`);
      else if(result.changedRows == 0)
        res.send(`{"message" : "Sale record not found. TO BE CHANGED AS AN ERROR!"}`);
      else 
        res.send(`{"message" : "${result.changedRows} rows updated. TO BE CHANGED AS AN ERROR!"}`);
    });
  });
});

// DELETE a sale record by id
router.delete('/:id', function(req, res, next){
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    // Build query
    var query = 'DELETE FROM '+ table + ' WHERE id = ' + req.params.id;
    console.log(query);
    // Use the connection
    connection.query(query, function (error, result, fields) {
      // When done with the connection, release it.
      connection.release();
   
      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
      console.log(result);
      if(result.affectedRows == 1)
        res.send(`{"message" : "Sale record deleted successfully"}`);
      else if(result.affectedRows == 0)
        res.send(`{"message" : "Sale record not found. TO BE CHANGED AS AN ERROR!"}`);
      else 
        res.send(`{"message" : "${result.affectedRows} rows deleted. TO BE CHANGED AS AN ERROR!"}`);
    });
  });
});

// POST the cached sale records
router.post('/cache/', function(req, res, next){
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    // Empty body check
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
      console.log('Array missing');
    }
    else {
      // Empty array check
      if(req.body.length != 0) {

        /* Begin transaction */
        connection.beginTransaction(function(err) {
          if (err) { throw err; }
          // Build query
          var query = 'INSERT INTO ' + table + ' (cup_id, cafe_id, scanned_at) VALUES ';
          second_query_part = '(';
          for(var index = 0; index < req.body.length; index++){
            var obj = req.body[index];
            query += '(' + obj.cup_id + ', ' + obj.cafe_id + ', \'' + obj.scanned_at + '\')';
            second_query_part += obj.cup_id;
            if(index < req.body.length - 1) {
              query += ',';
              second_query_part += ', ';
            }
            else {
              query += ';';
              second_query_part += ');';
            }
          }
          console.log(query);
          // Use the connection
          connection.query(query, function(err, result) {
            if (err) { 
              console.log('Rolling back...');
              connection.rollback(function() {
                throw err;
              });
            }

            const log = result.affectedRows;
            // Build query
            var query = 'UPDATE CUP SET status = \'B\' WHERE id IN ' + second_query_part;
            console.log(query);

            connection.query(query, function(err, result) {
              if (err) { 
                console.log('Rolling back...');
                connection.rollback(function() {
                  throw err;
                });
              }  
              connection.commit(function(err) {
                if (err) { 
                  console.log('Rolling back...');
                  connection.rollback(function() {
                    throw err;
                  });
                }
                console.log('Transaction Completed Successfully.');
                // When done with the connection, release it.
                connection.release();
    
                // Don't use the connection here, it has been returned to the pool.
                console.log(result);
                res.status(201).send(`{"message" : "${result.affectedRows} sale records added."}`);
              });
            });
          });
        });
        /* End transaction */
      }
    }
  });
});

module.exports = router;
