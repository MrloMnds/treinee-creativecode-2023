// Criar um arquivo connection.js utilizando este como exemplo
// apenas alterando os dados de connection
var knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "", // <-- fazer alteracao
    user: "", // <-- fazer alteracao
    password: "", // <-- fazer alteracao
    database: "", // <-- fazer alteracao
  },
});

module.exports = knex;
