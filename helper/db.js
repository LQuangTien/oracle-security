const Promise = require("bluebird");
const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OBJECT;

const dbConfig = {
  // TODO Maybe change username, password
  user: "HR",
  password: "HR",
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
};

const getConnect = function () {
  return new Promise((resolve, reject) => {
    oracledb.getConnection(dbConfig, (err, conn) => {
      if (err) {
        reject(err);
      }
      resolve(conn);
    });
  });
};

module.exports = { getConnect };
