const { dbConfig, createConnection, initializeQuery } = require("./db");
/*
`
DECLARE
  hash_password VARCHAR2(300);
BEGIN
  SELECT standard_hash('123', 'MD5') INTO hash_password FROM dual;
EXECUTE IMMEDIATE 'create user tien123 identified by '|| hash_password ;
END;
` */

const createUser = (connection, user) => {
  let createUserQuery =
    " CREATE USER " + user.name + " IDENTIFIED BY " + user.password;
  if (user.defaultTablespace) {
    createUserQuery +=
      " DEFAULT TABLESPACE " +
      user.defaultTablespace +
      " QUOTA " +
      user.quota +
      " ON " +
      user.defaultTablespace;
  }
  if (user.tempTablespace) {
    createUserQuery += " TEMPORARY TABLESPACE " + user.tempTablespace;
  }
  if (user.profile) {
    createUserQuery += " PROFILE " + user.profile;
  }
  if (user.state) {
    createUserQuery += " ACCOUNT " + user.state;
  }
  /*
    const createUserQuery = ' CREATE USER ' + user.name + ' IDENTIFIED BY ' + user.password +
        ' DEFAULT TABLESPACE ' + user.defaultTablespace + ' QUOTA ' + user.quota + ' ON ' +
 user.defaultTablespace + ' TEMPORARY TABLESPACE ' +user.tempTablespace+
        ' PROFILE ' + user.profile + ' ACCOUNT ' + user.state;
*/
  return initializeQuery(connection, createUserQuery);
};

const alterUser = (connection, user) => {
  let alterUserQuery =
    " ALTER USER " + user.name + " IDENTIFIED BY " + user.password;
  if (user.defaultTablespace) {
    alterUserQuery +=
      " DEFAULT TABLESPACE " +
      user.defaultTablespace +
      " QUOTA " +
      user.quota +
      " ON " +
      user.defaultTablespace;
  }
  if (user.tempTablespace) {
    alterUserQuery += " TEMPORARY TABLESPACE " + user.tempTablespace;
  }
  if (user.profile) {
    alterUserQuery += " PROFILE " + user.profile;
  }
  if (user.state) {
    alterUserQuery += " ACCOUNT " + user.state;
  }
  return initializeQuery(connection, alterUserQuery);
};

const dropUser = (connection, userName) => {
  const dropUserQuery = "DROP USER " + userName + " CASCADE";

  return initializeQuery(connection, dropUserQuery);
};

/*
(async function test() {
    try {
        const user = { name: "z", password: "z", defaultTablespace: "USERS", tempTablespace: "TEMP", quota: 500, profile: "DEFAULT", state: "UNLOCK" }
        //const params = ["z","z","USERS",500,"USERS","DEFAULT","UNLOCK"];
        const config = dbConfig("sys", "123", true);
        const connection = await createConnection(config);
        //const result = await createUser(connection, user);
        //console.log(result)
        user.state = "UNLOCK";
        const result1 = await alterUser(connection, user);
        //const result2 = await dropUser(connection, user);
        //console.log(result2);
    } catch (err) {
        console.log(err.message);
    }
})();
*/
module.exports = { createUser, alterUser, dropUser };
