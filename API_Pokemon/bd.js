// bd.js
let mysql = require("serverless-mysql");

let config = {
    host: "localhost",
    database: "iftm_pokemon",
    user: "root",
    password: ""
};

let bd = mysql({
    config: config
});
module.exports = bd;