const express = require("express"); // Best Web server in node.js
const nedb = require("nedb");  // simple data base
const rest = require("express-nedb-rest");
const cors = require("cors");
// Cors means cross-origin resource sharing, It's a way we have on HTTP to make a tie-in, so the browser, get content or send content to another domain. That's why it's cross-domain.

const app = express();
const datastore = new nedb({
  filename: 'mycoffeeapp.db',
  autoload: true
});

const restAPI = rest();
restAPI.addDatastore('coffees', datastore);

// express
app.use(cors()); // use API from other domain
app.use('/', restAPI);
// root folder('/') of this web server to be executed by the RESTful API.

app.listen('3100'); // port need to different with port used by Angular(4200)
