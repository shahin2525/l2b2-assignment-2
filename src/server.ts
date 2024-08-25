import config from "./app/config";

// getting-started.js
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(config.database_url);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// remove it
app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
