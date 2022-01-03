const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const md5 = require("md5");

const {
  dbConfig,
  createConnection,
  openPluggableDB,
  checkIsAdmin,
} = require("../DAL/db");
const {
  ServerError,
  Response,
  BadRequest,
  Get,
  Unauthorized,
} = require("../ulti/response");

const ONE_SECCOND = 1000;
const ONE_MiNUTE = ONE_SECCOND * 60;
const ONE_HOUR = ONE_MiNUTE * 60;

exports.signin = async (req, res) => {
  try {
    await openPluggableDB();

    const hash_password = md5(req.body.password);
    const config = dbConfig(req.body.username, hash_password, req.body.isAdmin);
    console.log(config);

    const connection = await createConnection(config);

    //them gium dau "cham than" cho 2 thang nay t bi liet phim 1 2 roi
    //Này là ktra coi nó k phải admin mà đăng nhập isAdmin là true thì kí vào đầu nó đmm
    if (!checkIsAdmin(connection) && req.body.isAdmin) return Unauthorized(res);

    if (!checkIsAdmin(connection)) req.body.isAdmin = true;

    const token = jwt.sign(
      {
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        exp: Math.floor(Date.now()) + ONE_HOUR,
      },
      process.env.JWT_SECRET
    );

    return Get(res, {
      data: {
        token,
        //Này return chơi đó tại connection nó trả về cái gì ko à, m cần gì thì thay
        user: { username: req.body.username },
      },
    });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.allAdminPrivs = (req, res) => {
  if (req.body.isAdmin) {
    const ALL_PRIVS_DBA = {
      SYS_PRIVS: [
        "CREATE PROFILE",
        "ALTER PROFILE",
        "DROP PROFILE",
        "CREATE ROLE",
        "ALTER ANY ROLE",
        "DROP ANY ROLE",
        "GRANT ANY ROLE",
        "CREATE SESSION",
        "SELECT ANY TABLE",
        "CREATE USER",
        "ALTER USER",
        "DROP USER",
        "CREATE ANY TABLE",
        "ALTER ANY TABLE",
        "DROP ANY TABLE",
        "DELETE ANY TABLE",
        "INSERT ANY TABLE",
        "UPDATE ANY TABLE",
        "CREATE TABLE",
      ],

      // CHECK_PRIVS: ['CREATE PROFILE', 'ALTER PROFILE', 'DROP PROFILE', 'CREATE ROLE',
      //     'ALTER ANY ROLE', 'DROP ANY ROLE', 'GRANT ANY ROLE', 'CREATE SESSION', 'SELECT ANY TABLE',
      //     'CREATE USER', 'ALTER USER', 'DROP USER', 'SELECT'],

      OBJECT_PRIVS: ["SELECT", "INSERT", "DELETE"],

      COL_PRIVS: ["UPDATE", "INSERT"],
    };
    return Get(res, { ALL_PRIVS_DBA });
  }
  return Unauthorized(res);
};

exports.signout = (req, res) => {
  return Response(res, { message: "Signout successfully ...!" });
};
