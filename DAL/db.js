const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OBJECT;
oracledb.fetchAsString = [oracledb.DATE, oracledb.NUMBER];
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

const createConnection = async (dbConfig) => {
  const result = await oracledb.getConnection(dbConfig);
  return result;
}

const initializeQuery = (connection, query) => {
  //await openPluggableDB();
  //const result = await connection.execute(query);
  //await connection.close();
  return connection.execute(query).then((data) => data);
}

// const getUserNameAndPassword = async () => {
//   const dbConfigAdmin = {
//     user: "sys",
//     password: "123",
//     connectString: `(DESCRIPTION=
//     (ADDRESS=
//         (PROTOCOL=TCP)
//         (HOST=localhost)
//         (PORT=1521)
//       )
//       (CONNECT_DATA=
//         (SERVICE_NAME=ORCL.LOCALDOMAIN)
//         (SERVER=DEDICATED)
//       )
//     )`,
//     privilege: oracledb.SYSDBA
//   }
//   await openPluggableDB();
//   const connection = await createConnection(dbConfigAdmin);
//   const query = 'select username,password from dba_users';
//   const result = await initializeQuery(connection, query);
//   connection.close();
//   return result.rows;
// }

module.exports = {
  dbConfig, createConnection, initializeQuery,openPluggableDB
};







































































































