const { getCkConfig } = require("./server");
const server = require("./server");
const fs = require("fs");
fs.readFile("./testData.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    ch = getCkConfig();
    const userData = JSON.parse(jsonString);
    // console.log(userData[0]); // => "userData  Infinity Loop Drive"

    // Create the DB and populate it with data
    ch.query(`CREATE TABLE IF NOT EXISTS user_info (
        date Date,
        ssn UInt32,
        first_name String,
        last_name String,
        email String,
        gender String
    )
    ENGINE = MergeTree()
    ORDER BY ssn`);

    for (const data of userData) {
      let curDate = new Date(data.date).getTime();
      ssn = parseInt(data.id.split("-").join(""));
      first_name = data.first_name;
      last_name = data.last_name;
      email = data.email;
      gender = data.gender;
      //   console.log(curDate, ssn, first_name, last_name, email, gender);
      ch.query(
        `INSERT INTO user_info (*) VALUES (${curDate},${ssn},'${first_name}','${last_name}','${email}','${gender}')`
      );
    }
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});
