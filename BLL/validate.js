const { dbConfig, createConnection } = require('./db');

const { getSysPrivsByUser, getTabPrivsByUser, getColPrivsByUser, getSysPrivsGrantedByRoleByUser,
    getTabPrivsGrantedByRoleByUser } = require('../DAL/tableInfo');

const getAllSysPrivsByUser = async (user) => {
    const allSysPrivs = [];

    const config = dbConfig(user.name, user.password);
    const connection = await createConnection(config);

    const [sysPrivs, sysPrivsGrantedByRole] = await Promise.all([getSysPrivsByUser(connection),
    getSysPrivsGrantedByRoleByUser(connection)]);

    for (const row of sysPrivsGrantedByRole.rows) {
        allSysPrivs.push(row.PRIVILEGE);
    }

    for (const row of sysPrivs.rows) {
        allSysPrivs.push(row.PRIVILEGE);
    }

    return allSysPrivs;
}

const getAllObjectPrivsByUser = async (user) => {
    const allObjPrivs = [];

    const config = dbConfig(user.name, user.password);
    const connection = await createConnection(config);

    const [tabPrivs, objectPrivsGrantedByRole] = await Promise.all([getTabPrivsByUser(connection),
    getTabPrivsGrantedByRoleByUser(connection)]);

    //TABLE_NAME,PRIVILEGE
    for (const row of tabPrivs.rows) {
        allSysPrivs.push({ table: row.TABLE_NAME, privilege: row.PRIVILEGE });
    }

    //TABLE_NAME,COLUMN_NAME,PRIVILEGE
    // for (const row of colPrivs.rows) {
    //     allSysPrivs.push({ table: row.TABLE_NAME, column: row.COLUMN_NAME, privilege: row.PRIVILEGE });
    // }

    //TABLE_NAME,COLUMN_NAME,PRIVILEGE
    for (const row of objectPrivsGrantedByRole.rows) {
        allSysPrivs.push({ table: row.TABLE_NAME, column: row.COLUMN_NAME, privilege: row.PRIVILEGE });
    }

    return allObjPrivs;
}

module.exports = {
    formatInput(input) {
        if (input.isNaN() === false) return input.trim();
        if (typeof input === 'string') return input.trim().toUpperCase().replaceAll(' ', '_');
        if (typeof input === 'object') {
            for (const field in input) {
                if (Object.hasOwnProperty.call(input, field)) {
                    input[field] = input[field].trim().toUpperCase().replaceAll(' ', '_');
                }
            }
        }
    },
    checkIfUserHasPrivilege(user, privilege, table) {
        if (privilege.includes('SELECT')) {
            const objectPrivs = getAllObjectPrivsByUser(user);
            return objectPrivs.some((element) => element.PRIVILEGE === privilege && element.TABLE_NAME === table);

        } else {
            const sysPrivs = getAllSysPrivsByUser(user);
            return objectPrivs.some((element) => element.PRIVILEGE === privilege);
        }
    }
}