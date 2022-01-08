const { dbConfig, createConnection } = require("../DAL/db");
const {
  create,
  alter,
  drop,
  grantRolesOrSysPrivs,
  grantTabOrColPrivs,
  revokeRolesOrSysPrivs,
  revokeTabOrColPrivs,
} = require("../BLL/role");

const {
  ServerError,
  Get,
  NotFound,
  Update,
  Delete,
  Create,
} = require("../ulti/response");

exports.createRole = async (req, res) => {
  try {
    //lẽ ra là có req.username,req.password,req.isAdmin từ middleware
    //user,pwd,isAdmin
    //này user nào có quyền thì cx dùng dc hết
    const config = dbConfig(
      req.user.username,
      req.user.password,
      req.user.isAdmin
    );
    const connection = await createConnection(config);
    const result = await create(connection, req.body);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.alterRole = async (req, res) => {
  try {
    const config = dbConfig(
      req.user.username,
      req.user.password,
      req.user.isAdmin
    );
    const connection = await createConnection(config);
    const result = await alter(connection, req.body);
    await connection.close();

    return Update(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.dropRole = async (req, res) => {
  try {
    const config = dbConfig(
      req.user.username,
      req.user.password,
      req.user.isAdmin
    );
    const connection = await createConnection(config);
    const result = await drop(connection, req.params.roleName);
    await connection.close();

    return Delete(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.grantRolesOrSysPrivsController = async (req, res) => {
  try {
    const config = dbConfig(
      req.user.username,
      req.user.password,
      req.user.isAdmin
    );
    const connection = await createConnection(config);
    const result = await grantRolesOrSysPrivs(connection, req.body);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.grantTabOrColPrivsController = async (req, res) => {
  try {
    const config = dbConfig(
      req.user.username,
      req.user.password,
      req.user.isAdmin
    );
    const connection = await createConnection(config);
    const result = await grantTabOrColPrivs(connection, req.body);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.revokeRolesOrSysPrivsController = async (req, res) => {
  try {
    const config = dbConfig(
      req.user.username,
      req.user.password,
      req.user.isAdmin
    );
    const connection = await createConnection(config);
    const result = await revokeRolesOrSysPrivs(connection, req.body);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.revokeTabOrColPrivsController = async (req, res) => {
  try {
    const config = dbConfig(
      req.user.username,
      req.user.password,
      req.user.isAdmin
    );
    const connection = await createConnection(config);
    const result = await revokeTabOrColPrivs(connection, req.body);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};
