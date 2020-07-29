const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const PORT = 4000;

const SELECT_ALL_CUSTOMERS = "select * from customers";
const SELECT_ALL_AGREEMENTS = "select * from agreements";
const SORTBY_NAME_ASC = "select * from customers order by name;"
const SORTBY_NAME_DESC = "select * from customers order by name desc;"
const SORTBY_DATE_ASC = "select * from customers order by agreementDate;"
const SORTBY_DATE_DESC = "select * from customers order by agreementDate desc;"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'livnim14',
    database: 'task_management'
});


//Connect to mysql
connection.connect(err => {
    if(err)
        throw err;
});

app.use(cors());

app.get('/', (req, res) => {
    res.send("go to /costumers to see costumers")
});

app.get('/customers', (req, res) => {
    connection.query(SELECT_ALL_CUSTOMERS, (err, result) => {
        if(err)
            return res.send(err)
        else
            return res.json({
            customers: result
        });
    });
 });

 app.get('/agreements', (req, res) => {
    connection.query(SELECT_ALL_AGREEMENTS, (err, result) => {
        if(err)
            return res.send(err)
        else
            return res.json({
            agreements: result
        });
    });
 });

 app.get('/sortbynameasc', (req, res) => {
    connection.query( SORTBY_NAME_ASC, (err, result) => {
        if(err)
            return res.send(err)
        else
            return res.json({
            customers: result
        });
    });
 });

 app.get('/sortbynamedesc', (req, res) => {
    connection.query( SORTBY_NAME_DESC, (err, result) => {
        if(err)
            return res.send(err)
        else
            return res.json({
            customers: result
        });
    });
 });

 app.get('/sortbydateasc', (req, res) => {
    connection.query( SORTBY_DATE_ASC, (err, result) => {
        if(err)
            return res.send(err)
        else
            return res.json({
            customers: result
        });
    });
 });

 app.get('/sortbydatedesc', (req, res) => {
    connection.query( SORTBY_DATE_DESC, (err, result) => {
        if(err)
            return res.send(err)
        else
            return res.json({
            customers: result
        });
    });
 });

 



app.listen(PORT, () => {
    console.log("server listen on port ${PORT}...");
});