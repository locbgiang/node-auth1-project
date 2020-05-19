
exports.seed = function(knex) {
  // 00-cleanup.js already cleaned out all tables

  const users = [
    {
      username: "groot",
      password: "Iamgroot!",
    },
    {
      username: "admin",
      password: "keepitsecret,keepitsafe.",
    },
    {
      username: "me",
      password: "changethepass",
    },
    {
      username: "nobody",
      password: "hasnorole",
    },
    {
      username: "notme",
      password: "hasnorole",
    },
  ];

  return knex('users').insert(users);
};
