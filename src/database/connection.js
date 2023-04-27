var knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "60603465@Murilo",
    database: "trainee_creativecode",
  },
});

module.exports = knex;
