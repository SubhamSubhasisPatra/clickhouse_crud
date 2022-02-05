<h1>How to make CRUD operation in Clickhouse DB</h1>
<p> In the config add the name of the DB</p>

```
const config = new ClickHouse({
  host: "clickhouse.msk",
  dataObjects: true,
  readonly: true,
  queryOptions: {
    profile: "web",
    database: "default", // name of the data base
  },
});
```

<h2><u>NOTE</u></h2>
<p>Make sure click house is installed and clickhouse server is running .. </p>

<p> To run the application </p>

```
git clone https://github.com/SubhamSubhasisPatra/clickhouse_crud.git
cd clickhouse_crud
npm ci
node populate.js // run this one first to load the data into db then
// then run the server.js file and uncomment the function that you want to use
node server.js
```
