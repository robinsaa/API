var express = require('express');
var router = express.Router();

// Load the MySQL pool connection
const pool = require('../db-config');
var table = 'cup';

/* GET cups listing. */
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

// GET cups by id
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

// POST to cup
router.post('/', function(req, res, next){
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    // Build query
    var query = 'INSERT INTO ' + table + ' VALUES (' + req.body.id +', \'' + req.body.size + '\', \'' + req.body.status + '\', ' + req.body.batch_id + ', current_timestamp(), null)';
    console.log(query);
    // Use the connection
    connection.query(query, function (error, result, fields) {
      // When done with the connection, release it.
      connection.release();
   
      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
      console.log(result);
      res.status(201).send(`Cup created with ID: ${req.body.id}`);
    });
  });
})

// PUT (update) to a cup by id
router.put('/:id', function(req, res, next){
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    // Build query
    var query = 'UPDATE ' + table + ' SET';
    query += (req.body.size != null ? ' size = \'' + req.body.size + '\',' : '');
    query += (req.body.status != null ? ' status = \'' + req.body.status + '\',' : '');
    query += (req.body.batch_id != null ? ' batch_id = ' + req.body.batch_id + ',' : '');
    query += ' updated_at = current_timestamp() WHERE id = ' + req.params.id;
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
        res.send('Cup updated successfully');
      else if(result.changedRows == 0)
        res.send('Cup not found. TO BE CHANGED AS AN ERROR!')
      else 
        res.send(result.changedRows + ' rows updated. TO BE CHANGED AS AN ERROR!');
    });
  });
});

// DELETE a cup by id
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
        res.send('Cup deleted successfully');
      else if(result.affectedRows == 0)
        res.send('Cup not found. TO BE CHANGED AS AN ERROR!')
      else 
        res.send(result.affectedRows + ' rows deleted. TO BE CHANGED AS AN ERROR!');
    });
  });
});

module.exports = router;
