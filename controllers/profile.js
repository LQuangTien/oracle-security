const { dbConfig, createConnection } = require("../DAL/db");
const { create, alter, drop } = require("../BLL/profile");

const {
  ServerError,
  Get,
  NotFound,
  Update,
  Delete,
  Create,
} = require("../ulti/response");

exports.createProfile = async (req, res) => {
  try {
    //lẽ ra là có req.username,req.password,req.isAdmin từ middleware
    //user,pwd,isAdmin
    //này user nào có quyền thì cx dùng dc hết
    const config = dbConfig("sys", "123", true);
    const connection = await createConnection(config);
    const result = await create(connection, req.body);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.alterProfile = async (req, res) => {
  try {
    const config = dbConfig("sys", "123", true);
    const connection = await createConnection(config);
    const result = await alter(connection, req.body);
    await connection.close();

    return Update(res, result);
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.dropProfile = async (req, res) => {
  try {
    const config = dbConfig("sys", "123", true);
    const connection = await createConnection(config);
    const result = await drop(connection, req.params.profileName);
    await connection.close();

    return Delete(res, result);
  } catch (error) {
    return ServerError(res, error.message);
  }
};
