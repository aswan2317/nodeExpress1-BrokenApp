/** Database setup for users. */
const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql://aswan2317:Eastonlogan8611!@localhost/users_test";
} else {
  DB_URI = "postgresql://aswan2317Eastonlogan8611!:@localhost/users";
}

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;
