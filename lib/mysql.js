/* 
  mysql deal
*/

var mysql = {};

//MysqlÇ∆ÇÃê⁄ë±
var mysql = require('mysql');
var async = require("async");
var config = require(__dirname + '/../lib/config.js').config;
var date = require('date-utils');


var DB_HOST = config.DB_HOST;	
var DB_DATABASE = config.DB_DATABASE;
var DB_USER = config.DB_USER;
var DB_PASSWORD = config.DB_PASSWORD;
var DB_PORT = config.DB_PORT;

var connection = mysql.createConnection({
	host	 : DB_HOST,
	database : DB_DATABASE,
	user	 : DB_USER,
	password : DB_PASSWORD,
	port	 : DB_PORT
});

mysql.insertMyWork = function (workName,labor,bareMetal,jewel,description,PicturePath,cb){
var result = {};
	var sum = parseInt(labor) + parseInt(bareMetal) + parseInt(jewel);
	var insert_myWork_table = connection.query(
			'INSERT INTO myWork(name,labor,bareMetal,jewel,sum, description,picturePath) VALUE(?,?,?,?,?,?,?)'
			,[workName,labor,bareMetal,jewel,sum,description,PicturePath]
				//err handling. Sweet alert will show the log so that user can be clarify the kind of bugs.
				,function(err,result){
					if(err){
						result = err;
						result.message = "error";
						cb(result);
					}
					else{
						result = result;
						result.message = "success";
						cb(result);
					}
				});
	return;
}

//Confirmation Update
mysql.updateAttendance = function (id,confirmation,cb){
var result = {};
	var update_attendance_table = connection.query(
			'UPDATE attendance SET confirmation = ? WHERE id = ?'
			,[confirmation,id]
				//err handling. Sweet alert will show the log so that user can be clarify the kind of bugs.
				,function(err,result){
					if(err){
						result = err;
						result.message = "error";
						cb(result);
					}
					else{
						result = result;
						result.message = "success";
						cb(result);
					}
				});
	return;
}

mysql.selectAttendanceMessage = function (callback){
	var data = [];
	var worl_select = connection.query("SELECT ID,name,labor,baremetal,jewel,sum,description,picturePath,date FROM blueMoon.myWork order by date desc",function (error, results, fields) {
		if (error) throw err;
		async.each(results, function(work, callback){
			data.push({
					"id":work.id,
					"name":work.name,
					"description":work.description,
					"picturePath":work.picturePath,
					"date":work.date,
					"labor":work.labor,
					"baremetal":work.baremetal,
					"jewel":work.jewel,
					"sum":work.sum,
			});
			callback();
		}, function(error){
			if(error) throw err;
			callback(data);
		});	
	})
}

module.exports = mysql;
