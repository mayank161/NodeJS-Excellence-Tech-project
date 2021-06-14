const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/database')
var cors = require('cors');

const routs = require('./routs/project');
const user = require('./models/candidate');
const test = require('./models/test');

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

db.authenticate().then(() => console.log('database run'))

user.hasOne(test);
test.belongsTo(user);

db.sync().then(() => {
  console.log('inserted')
  app.use(routs);
}).catch(err => console.log(err))

app.listen(3000);