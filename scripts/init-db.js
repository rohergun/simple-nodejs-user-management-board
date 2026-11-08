const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

const db_path = path.join(__dirname, "..", "src", "db", "database.db");
const sql_path = path.join(__dirname, "..", "src", "db", "schema.sql");

const db = new sqlite3.Database(db_path);

db.exec(
  fs.readFileSync(sql_path, "utf8"), (err) => {
    if (err) {
      console.error("DB init failed", err.message); 
      process.exit(1);
    }
    else {
      console.log("DB initilized successfully");
      db.close();
    }    
  }
);