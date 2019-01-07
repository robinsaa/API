var express = require('express');
var router = express.Router();

// Load the MySQL pool connection
const pool = require('../db-config');
var table = 'sale';

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
   
    // Build query
    var query = 'INSERT INTO ' + table + ' (cup_id, cafe_id, scanned_at) VALUES (' + req.body.cup_id + ', ' + req.body.cafe_id + ', current_timestamp())';
    console.log(query);
    // Use the connection
    connection.query(query, function (error, result, fields) {
      // When done with the connection, release it.
      connection.release();
   
      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
      console.log(result);
      res.status(201).send(`Sale recorded with ID: ${result.insertId}`);
    });
  });
})

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
        res.send('Sale record updated successfully');
      else if(result.changedRows == 0)
        res.send('Sale record not found. TO BE CHANGED AS AN ERROR!')
      else 
        res.send(result.changedRows + ' rows updated. TO BE CHANGED AS AN ERROR!');
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
        res.send('Sale record deleted successfully');
      else if(result.affectedRows == 0)
        res.send('Sale record not found. TO BE CHANGED AS AN ERROR!')
      else 
        res.send(result.affectedRows + ' rows deleted. TO BE CHANGED AS AN ERROR!');
    });
  });
});

module.exports = router;
