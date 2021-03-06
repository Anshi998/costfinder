const mysql = require("mysql");

// var db = mysql.createConnection({
//   host: "43.255.154.32",
//   port: "3306",
//   user: "deal",
//   password: "m(q+ld}YQ$8a",
//   database: "deals",
//   multipleStatements: true
// });

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "abcd",
  database: "costfinder",
  multipleStatements: true
});

// db.connect(function(err) {
//   if (!err) {
//     console.log("Database is connected");
//   } else {
//     console.log("Error while connecting with database");
//     console.log(err);
//   }
// });

// var db = mysql.createPool({
//   host: "43.255.154.32",
//   port: "3306",
//   user: "deal",
//   password: "m(q+ld}YQ$8a",
//   database: "deals",
//   multipleStatements: true
// });

pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) return console.log(error);
  console.log("The solution is: ", results[0].solution);
});
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  pool.on("connection", function (connection) {
    console.log("DB Connection established");

    connection.on("error", function (err) {
      console.error(new Date(), "MySQL error", err.code);
    });
    connection.on("close", function (err) {
      console.error(new Date(), "MySQL close", err);
    });
  });
  // The db will emit an acquire event when a connection is acquired from the db. This is called after all acquiring activity has been deleted performed on the connection, right before the connection is handed to the callback of the acquiring code.

  pool.on("acquire", function (connection) {
    console.log("Connection %d acquired", connection.threadId);
  });

  // The db will emit an enqueue event when a callback has been deleted queued to wait for an available connection.

  pool.on("enqueue", function () {
    console.log("Waiting for available connection slot");
  });

  //The db will emit a release event when a connection is released back to the db. This is called after all release activity has been deleted performed on the connection, so the connection will be listed as free at the time of the event.

  pool.on("release", function (connection) {
    console.log("Connection %d released", connection.threadId);
  });
  if (connection) connection.release();

  return;
});

module.exports = pool;
