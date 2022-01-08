const { dbConfig, createConnection } = require("../DAL/db");
const {
  getAllPrivileges,
  getAllRole,
  getAllPrivsByRole,
  getAllUsersByRole,
  getAllProfiles,
  getProfileInfo,
  getAllUsersByProfile,
  getAllUser,
  getAllRolesByUsername,
  getAllPrivsByUsername,
  getUserInfoByUserConnection,
  getUserByUsername,
} = require("../BLL/tableInfo");

const {
  ServerError,
  Get,
  NotFound,
  Update,
  Delete,
  Create,
} = require("../ulti/response");

exports.getAllPrivilegesController = async (req, res) => {
  try {
    //NGUYÊN FILE NÀY ĐỂ Ý NHA CONNECTIONADMIN LÀ PHẢI ĐĂNG NHẬP BẰNG SYSDBA MỚI THỰC HIỆN ĐƯỢC
    const config = dbConfig("sys", "123", true);
    const connection = await createConnection(config);
    const result = await getAllPrivileges(connection);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.getAllRoleController = async (req, res) => {
  try {
    const config = dbConfig(
      req.user.username,
      req.user.password,
      req.user.isAdmin
    );
    const connection = await createConnection(config);
    const result = await getAllRole(connection);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

// exports.getAllPrivsByRoleController = async (req, res) => {
//   try {
//     const config = dbConfig("sys", "123", true);
//     const connection = await createConnection(config);
//     const result = await getAllPrivsByRole(connection, req.params.roleName);
//     await connection.close();

//     return Get(res, { result });
//   } catch (error) {
//     return ServerError(res, error.message);
//   }
// };

exports.getAllPrivsByRoleController = async (req, res) => {
  try {
    const config = dbConfig(
      req.user.username,
      req.user.password,
      req.user.isAdmin
    );
    const connection = await createConnection(config);
    const result = await getAllPrivsByRole(connection, req.params.roleName);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.getAllUsersByRoleController = async (req, res) => {
  try {
    const config = dbConfig("sys", "123", true);
    const connection = await createConnection(config);
    const result = await getAllUsersByRole(connection, req.params.roleName);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.getAllProfilesController = async (req, res) => {
  try {
    const config = dbConfig("sys", "123", true);
    const connection = await createConnection(config);
    const result = await getAllProfiles(connection);
    await connection.close();
    const r = result.reduce((acc, p) => {
      const index = acc.findIndex((x) => x.name && x.name === p.PROFILE);
      if (index < 0) {
        acc.push({
          name: p.PROFILE,
          sessionsPerUser:
            p.RESOURCE_NAME === "SESSIONS_PER_USER" ? p.LIMIT : "",
          idleTime: p.RESOURCE_NAME === "IDLE_TIME" ? p.LIMIT : "",
          connectTime: p.RESOURCE_NAME === "CONNECT_TIME" ? p.LIMIT : "",
        });
      } else {
        if (p.RESOURCE_NAME === "SESSIONS_PER_USER") {
          acc[index] = {
            ...acc[index],
            sessionsPerUser: p.LIMIT,
          };
        } else if (p.RESOURCE_NAME === "IDLE_TIME") {
          acc[index] = {
            ...acc[index],
            idleTime: p.LIMIT,
          };
        } else if (p.RESOURCE_NAME === "CONNECT_TIME") {
          acc[index] = {
            ...acc[index],
            connectTime: p.LIMIT,
          };
        }
      }
      return acc;
    }, []);
    return Get(res, { r });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.getProfileInfoController = async (req, res) => {
  try {
    const config = dbConfig("sys", "123", true);
    const connection = await createConnection(config);
    const result = await getProfileInfo(connection, req.params.profileName);
    await connection.close();
    const sessionsPerUser = result.find(
      (x) => x.RESOURCE_NAME === "SESSIONS_PER_USER"
    ).LIMIT;
    const idleTime = result.find((x) => x.RESOURCE_NAME === "IDLE_TIME").LIMIT;
    const connectTime = result.find(
      (x) => x.RESOURCE_NAME === "CONNECT_TIME"
    ).LIMIT;

    return Get(res, {
      result: {
        profile: req.params.profileName,
        sessionsPerUser,
        idleTime,
        connectTime,
      },
    });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.getAllUsersByProfileController = async (req, res) => {
  try {
    const config = dbConfig("sys", "123", true);
    const connection = await createConnection(config);
    const result = await getAllUsersByProfile(
      connection,
      req.params.profileName
    );
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.getAllUserController = async (req, res) => {
  try {
    const config = dbConfig("sys", "123", true);
    const connection = await createConnection(config);
    const result = await getAllUser(connection);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.getUserByUsernameController = async (req, res) => {
  try {
    const config = dbConfig("sys", "123", true);
    const connection = await createConnection(config);
    const result = await getUserByUsername(connection, req.params.username);
    await connection.close();

    return Get(res, result);
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.getAllRolesByUsernameController = async (req, res) => {
  try {
    const config = dbConfig("sys", "123", true);
    const connection = await createConnection(config);
    const result = await getAllRolesByUsername(connection, req.params.username);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.getAllPrivsByUsernameController = async (req, res) => {
  try {
    const config = dbConfig("sys", "123", true);
    const connection = await createConnection(config);
    const result = await getAllPrivsByUsername(connection, req.params.username);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};

exports.getUserInfoByUserConnectionController = async (req, res) => {
  try {
    //NÀY SÀI USER BÌNH THƯỜNG ĐƯỢC TẠI ĐANG LẤY THÔNG TIN CỦA USER ĐANG CONNECT
    const config = dbConfig(
      req.user.username,
      req.user.password,
      req.user.isAdmin
    );
    // const config = dbConfig("TIEN3", "123", false);
    const connection = await createConnection(config);
    const result = await getUserInfoByUserConnection(connection);
    await connection.close();

    return Get(res, { result });
  } catch (error) {
    return ServerError(res, error.message);
  }
};
