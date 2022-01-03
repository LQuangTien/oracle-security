const jwt = require("jsonwebtoken");

const {
  Unauthenticated,
  Unauthorized,
  BadRequest,
} = require("../ulti/response");

const { dbConfig, createConnection } = require("../DAL/db");
const {
  getSysPrivsByUser,
  getTabPrivsByUser,
  getColPrivsByUser,
  getSysPrivsGrantedByRoleByUser,
  getTabPrivsGrantedByRoleByUser,
} = require("../DAL/tableInfo");

exports.requireSignin = (req, res, next) => {
  if (!req.headers.authorization)
    return Unauthenticated(res, "Signin required");
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.exp < Math.floor(Date.now()))
      return Unauthenticated(res, "Token expired");

    req.user = user;
    return next();
  } catch (error) {
    return Unauthenticated(res, error.message);
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) return next();
  return Unauthorized(res);
};

exports.formatInput = (req, res, next) => {
  // if (input.isNaN() === false) return input.trim();
  // if (typeof input === 'string') return input.trim().toUpperCase().replaceAll(' ', '_');
  // if (typeof input === 'object') {
  //   for (const field in input) {
  //     if (Object.hasOwnProperty.call(input, field)) {
  //       if (typeof input[field] === 'string') {
  //         input[field] = input[field].trim().toUpperCase().replaceAll(' ', '_');
  //       }
  //     }
  //   }
  // }
  if (typeof req.body === "undefined") next();
  for (const field in req.body) {
    if (typeof req.body.field === "string") {
      req.body.field = req.body.field.trim().toUpperCase().replaceAll(" ", "_");
    }
    if (isNaN(req.body.field) === false) {
      req.body.field = req.body.field.trim();
    }
  }
  next();
};

exports.checkIfUserHasPrivilege = (req, res, next) => {
  if (req.body.privilege) {
    if (req.body.privilege.includes("SELECT")) {
      const objectPrivs = getAllObjectPrivsByUser(req.body.username);
      const check = objectPrivs.some(
        (element) =>
          element.PRIVILEGE === req.body.privilege &&
          element.TABLE_NAME === req.body.table
      );

      if (check) next();
      next(new Error("User không được select trên table này"));
    } else {
      const sysPrivs = getAllSysPrivsByUser(req.body.username);
      const check = sysPrivs.some(
        (element) => element.PRIVILEGE === req.body.privilege
      );

      if (check) next();
      next(new Error(`User không có quyền ${req.body.privilege}`));
    }
  }
  next();
};

const getAllSysPrivsByUser = async (user) => {
  const allSysPrivs = [];

  const config = dbConfig(user.name, user.password);
  const connection = await createConnection(config);

  const [sysPrivs, sysPrivsGrantedByRole] = await Promise.all([
    getSysPrivsByUser(connection),
    getSysPrivsGrantedByRoleByUser(connection),
  ]);

  for (const row of sysPrivsGrantedByRole.rows) {
    allSysPrivs.push(row.PRIVILEGE);
  }

  for (const row of sysPrivs.rows) {
    allSysPrivs.push(row.PRIVILEGE);
  }

  return allSysPrivs;
};

const getAllObjectPrivsByUser = async (user) => {
  const allObjPrivs = [];

  const config = dbConfig(user.name, user.password);
  const connection = await createConnection(config);

  const [tabPrivs, objectPrivsGrantedByRole] = await Promise.all([
    getTabPrivsByUser(connection),
    getTabPrivsGrantedByRoleByUser(connection),
  ]);

  //TABLE_NAME,PRIVILEGE
  for (const row of tabPrivs.rows) {
    allObjPrivs.push({ table: row.TABLE_NAME, privilege: row.PRIVILEGE });
  }

  //TABLE_NAME,COLUMN_NAME,PRIVILEGE
  // for (const row of colPrivs.rows) {
  //     allSysPrivs.push({ table: row.TABLE_NAME, column: row.COLUMN_NAME, privilege: row.PRIVILEGE });
  // }

  //TABLE_NAME,COLUMN_NAME,PRIVILEGE
  for (const row of objectPrivsGrantedByRole.rows) {
    allObjPrivs.push({
      table: row.TABLE_NAME,
      column: row.COLUMN_NAME,
      privilege: row.PRIVILEGE,
    });
  }

  return allObjPrivs;
};
