// bd.js
let mysql = require("serverless-mysql");

let config = {
    host: "localhost",
    database: "iftm_filmes",
    user: "root",
    password: ""
};

let bd = mysql({
    config: config
});
module.exports = bd;