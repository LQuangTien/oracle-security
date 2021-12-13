const { dbConfig, createConnection } = require('../DAL/db');
const { getAllPrivileges, getAllRole, getAllPrivsByRole, getAllUsersByRole,
    getAllProfiles, getProfileInfo, getAllUsersByProfile, getAllUser, getAllRolesByUsername,
    getAllPrivsByUsername, getUserInfoByUserConnection } = require('../BLL/tableInfo');

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

        return Get(res, result);
    } catch (error) {
        return ServerError(res, error.message);
    }
};

exports.getAllRoleController = async (req, res) => {
    try {
       
        const config = dbConfig("sys", "123", true);
        const connection = await createConnection(config);
        const result = await getAllRole(connection);
        await connection.close();

        return Get(res, result);
    } catch (error) {
        return ServerError(res, error.message);
    }
};

exports.getAllPrivsByRoleController = async (req, res) => {
    try {
       
        const config = dbConfig("sys", "123", true);
        const connection = await createConnection(config);
        const result = await getAllPrivsByRole(connection,req.params.roleName);
        await connection.close();

        return Get(res, result);
    } catch (error) {
        return ServerError(res, error.message);
    }
};

exports.getAllPrivsByRoleController = async (req, res) => {
    try {
        
        const config = dbConfig("sys", "123", true);
        const connection = await createConnection(config);
        const result = await getAllPrivsByRole(connection,req.params.roleName);
        await connection.close();

        return Get(res, result);
    } catch (error) {
        return ServerError(res, error.message);
    }
};

exports.getAllUsersByRoleController = async (req, res) => {
    try {
        
        const config = dbConfig("sys", "123", true);
        const connection = await createConnection(config);
        const result = await getAllUsersByRole(connection,req.params.roleName);
        await connection.close();

        return Get(res, result);
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

        return Get(res, result);
    } catch (error) {
        return ServerError(res, error.message);
    }
};

exports.getProfileInfoController = async (req, res) => {
    try {
        
        const config = dbConfig("sys", "123", true);
        const connection = await createConnection(config);
        const result = await getProfileInfo(connection,req.params.profileName);
        await connection.close();

        return Get(res, result);
    } catch (error) {
        return ServerError(res, error.message);
    }
};

exports.getAllUsersByProfileController = async (req, res) => {
    try {
        
        const config = dbConfig("sys", "123", true);
        const connection = await createConnection(config);
        const result = await getAllUsersByProfile(connection,req.params.profileName);
        await connection.close();

        return Get(res, result);
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

        return Get(res, result);
    } catch (error) {
        return ServerError(res, error.message);
    }
};

exports.getUserByUsernameController = async (req, res) => {
    try {
        
        const config = dbConfig("sys", "123", true);
        const connection = await createConnection(config);
        const result = await getUserByUsername(connection,req.params.username);
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
        const result = await getAllRolesByUsername(connection,req.params.username);
        await connection.close();

        return Get(res, result);
    } catch (error) {
        return ServerError(res, error.message);
    }
};

exports.getAllPrivsByUsernameController = async (req, res) => {
    try {
        
        const config = dbConfig("sys", "123", true);
        const connection = await createConnection(config);
        const result = await getAllPrivsByUsername(connection,req.params.username);
        await connection.close();

        return Get(res, result);
    } catch (error) {
        return ServerError(res, error.message);
    }
};

exports.getUserInfoByUserConnectionController = async (req, res) => {
    try {
        //NÀY SÀI USER BÌNH THƯỜNG ĐƯỢC TẠI ĐANG LẤY THÔNG TIN CỦA USER ĐANG CONNECT
        const config = dbConfig("sys", "123", true);
        const connection = await createConnection(config);
        const result = await getUserInfoByUserConnection(connection);
        await connection.close();

        return Get(res, result);
    } catch (error) {
        return ServerError(res, error.message);
    }
};