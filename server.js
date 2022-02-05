const ClickHouse = require("@apla/clickhouse");

// make the DB Connections
const config = new ClickHouse({
  host: "clickhouse.msk",
  dataObjects: true,
  readonly: true,
  queryOptions: {
    profile: "web",
    database: "default", // name of the data base
  },
});

const ch = new ClickHouse(config);
let getCkConfig = () => {
  return ch;
};
const stream = ch.query("SELECT * FROM simple_table");

/**
 * {description} : Query the data from the DB in a stream manner
 */
let StreamDataFromDB = () => {
  stream.on("data", (data) => {
    console.log(data);
  });
  stream.on("error", (error) => {
    console.log(error);
  });
  stream.on("end", () => {
    console.log("end");
  });
};
// uncomment the below line to run the above function
// StreamDataFromDB();

/**
 * {description} : Query the all data from the DB at once
 */
let getAllRecord = async () => {
  let { data } = await ch.querying("SELECT * FROM simple_table");
  console.log(data);
};

// uncomment the below line to run the above function
// getAllRecord();

// const queries = [
//   "DROP TABLE IF EXISTS session_temp",

//   `CREATE TABLE session_temp (
// 		date Date,
// 		time DateTime,
// 		mark String,
// 		ips Array(UInt32),
// 		queries Nested (
// 			act String,
// 			id UInt32
// 		)
// 	)
// 	ENGINE=MergeTree(date, (mark, time), 8192)`,

//   "OPTIMIZE TABLE ukit.loadstat PARTITION 201807 FINAL",
// ];

// for (const query of queries) {
//   clickhouse.query(query).exec(function (err, rows) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(rows);
//   });
// }

module.exports = {
  getCkConfig,
};
