const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OBJECT;
oracledb.fetchAsString = [ oracledb.DATE, oracledb.NUMBER ];
//oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = (usr, pwd, isAdmin) => {
  const config = {
    user: usr,
    password: pwd,
    connectString: `(DESCRIPTION=
    (ADDRESS=
        (PROTOCOL=TCP)
        (HOST=localhost)
        (PORT=1521)
      )
      (CONNECT_DATA=
        (SERVICE_NAME=ORCLPDB.LOCALDOMAIN)
        (SERVER=DEDICATED)
      )
    )`,
  }

  if (isAdmin) config.privilege = oracledb.SYSDBA;

  return config;
};

const openPluggableDB = () => {
  const dbConfigAdmin = {
    user: "sys",
    password: "123",
    connectString: `(DESCRIPTION=
    (ADDRESS=
        (PROTOCOL=TCP)
        (HOST=localhost)
        (PORT=1521)
      )
      (CONNECT_DATA=
        (SERVICE_NAME=ORCL.LOCALDOMAIN)
        (SERVER=DEDICATED)
      )
    )`,
    privilege: oracledb.SYSDBA
  }

  return createConnection(dbConfigAdmin).then((connection) => {
connection.execute('ALTER PLUGGABLE DATABASE ALL OPEN');
connection.close();
});
}

const createConnection = (dbConfig) => {
 return oracledb.getConnection(dbConfig);
}

const initializeQuery = (connection, query) => {
  //await openPluggableDB();
  //const result = await connection.execute(query);
  //await connection.close();
  return connection.execute(query).then((data)=>data);
}


module.exports = { dbConfig, createConnection, openPluggableDB, initializeQuery };







































































































