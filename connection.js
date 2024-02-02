const {Pool} = require('pg');
const pool=new Pool({
    host:"localhost",
    user:"postgres",
    post:5432,
    password:"postgres",
    database:"postgres"

})
module.exports = pool;