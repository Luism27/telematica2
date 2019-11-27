//data base
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'momlamrds.c1f1b5fwsook.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'qwertyuiop',
    database: 'Telematica'
});



// server
let nombre=[];
const path = require("path");
const multer = require("multer");
const storage=multer.diskStorage({
  destination:path.join(__dirname, 'public/subidas'),
  filename:(req,file,cb)=>{
    cb(null,file.originalname);
  }
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var hbs = require("express-hbs");
const cookieparser= require("cookie-parser");
const port = process.env.PORT || 8080;
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer({
  storage:storage,
  dest: path.join(__dirname, 'subidas')
}).any());
// static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendfile("index.html");
});
app.post("/subir",(req,res)=>{
  
 
})
app.get("/cookie",(req,res)=>{
      res.cookie(cookie_name,"1").send('cookie establecida');
});
app.post("/guardar", (req, res) => {
  console.log(req.body); // Requiring data in historicos
  if (con) {
    console.log("Connected!");
    var sql =
      "INSERT INTO candidato (nombre,apellido,cedula,partido,ciudad_dep,departamento,cargo,hoja_vida) VALUE ? ";
    var value = [[req.body.nombre,
      req.body.apellido,
      req.body.cedula,
      req.body.partido,
      req.body.ciudad,
      req.body.departamento,
      req.body.cargo, 
      req.body.hoja]];
    console.log(value);
    con.query(sql, [value], function(err, result) {
      if (err) throw err;
      //res.json(result);
      //con.end();
    });
  } else {
    console.log("Error conection with db");
  }
});
app.post("/verificar2",(req,res)=>{

  if (con){
    var sql = "SELECT nombre,direccion FROM puesto_vota WHERE nombre = ? AND direccion = ? ";
    var value=[
      req.body.nombre,
      req.body.direccion
    ];
    con.query(sql, value, function(err, result) {
      if (err) throw err;
      res.json(result);
      console.log(`Los resultados desde el server ${result} `)
      //con.end();
    });
  }else {
    console.log("Error conection with db");
  }
});
app.post("/guardar2", (req, res) => {
  console.log(req.body); // Requiring data in historicos
  if (con) {
    var sql = "SELECT nombre,direccion FROM puesto_vota WHERE nombre = ? AND direccion = ? ";
    var value=[
      req.body.nombre,
      req.body.direccion
    ];
    con.query(sql, value, function(err, result) {
      if (err) throw err;
      res.json(result);
      console.log(`Los resultados desde el server ${result} `)
      //con.end();
    });
    
     sql =
      "INSERT INTO puesto_vota (nombre,direccion,ciudad,departamento) VALUE ? ";
     value = [[req.body.nombre,
      req.body.direccion,
      req.body.ciudad,
      req.body.departamento]];
    console.log(value);
    con.query(sql, [value], function(err, result) {
      if (err) throw err;
      //res.json(result);
      //con.end();
    });

  } else {
    console.log("Error conection with db");
  }
});
app.post("/puesto",(req,res)=>{
  if(con){
    var sql ="Select nombre,departamento FROM puesto_vota WHERE departamento = ? ";
    var value =[
      req.body.departamento
    ];

    con.query(sql, value, function(err, result) {
      if (err) throw err;
      res.json(result);

      //console.log(`Los resultados desde el server ${result.nombre} `)
      //con.end();
    });
  }else {
    console.log("Error conection with db");
  }
});
app.post("/guardar3", (req, res) => {
  console.log(req.body); // Requiring data in historicos
  if (con) {
    console.log("Connected!");
    var sql =
      "INSERT INTO cedula (nombre,apellido,cedula,ciudad,dep,puesto) VALUE ? ";
    var value = [[req.body.nombre,
      req.body.apellido,
      req.body.cedula,
      req.body.ciudad,
      req.body.departamento,
      req.body.puesto]];
    console.log(value);
    con.query(sql, [value], function(err, result) {
      if (err) throw err;
      //res.json(result);
      //con.end();
    });
  } else {
    console.log("Error conection with db");
  }
});

app.post("/guardar_ced",(req,res)=>{
if (con){
    var sql ="SELECT cedula,puesto FROM cedula Where cedula = ? ";
    var value=[
      req.body.cedula
    ];
    con.query(sql,value, function(err, result) {
      if (err) throw err;
      res.json(result);
      //con.end();
    });
  } else {
    console.log("Error conection with db");
  }
});
app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});