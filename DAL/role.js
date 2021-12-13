const { dbConfig, createConnection, initializeQuery } = require('./db');


const createRole = (connection, role) => {
    let createRoleQuery = ' CREATE ROLE ' + role.name;;
    if (role.password) createRoleQuery += ' IDENTIFIED BY ' + role.password;;

    return initializeQuery(connection, createRoleQuery);
}

const alterRole = (connection, role) => {
    const alterRoleQuery = ' ALTER ROLE ' + role.name + ' IDENTIFIED BY ' + role.password;

    return initializeQuery(connection, alterRoleQuery);
}

const dropRole = (connection, roleName) => {
    const dropRoleQuery = 'DROP ROLE ' + roleName;

    return initializeQuery(connection, dropRoleQuery);
}

//GRANT new_dba TO michael WITH ADMIN OPTION;
//Object privileges cannot be granted along with system privileges and roles 
//in the same GRANT statement.
//GRANT SELECT ON hr.employees TO blake WITH GRANT OPTION;

//REVOKE UPDATE ON dept FROM human_resources;
// GRANT UPDATE (dname) ON dept TO human_resources;

//chi grant sys privs vs role cung nhau duoc thoi, object privs phai grant rieng
const grantRolesOrSysPrivsTo = (connection, params) => {
    let grantRolesOrSysPrivsToQuery = 'GRANT ' + params.rolesOrSysPrivs.join(',') + ' TO '
        + params.grantee;
    if (params.grantable) grantRolesOrSysPrivsToQuery += ' WITH ADMIN OPTION ';

    return initializeQuery(connection, grantRolesOrSysPrivsToQuery);
}

//chi co the grant col vs tab tren cung table trong 1 cau grant
const grantTabOrColPrivsTo = (connection, params) => {
    let grantTabOrColPrivsToQuery = 'GRANT ' + params.tabOrColPrivs.join(',') + ' ON '
        + params.table + ' TO ' + params.grantee;;
    if (params.grantable) grantTabOrColPrivsToQuery += ' WITH GRANT OPTION ';
console.log(grantTabOrColPrivsToQuery );
    return initializeQuery(connection, grantTabOrColPrivsToQuery);
}

const revokeRolesOrSysPrivsFrom = (connection, params) => {
    const revokeRolesOrPrivsFromQuery = 'REVOKE ' + params.rolesOrSysPrivs.join(',') + ' FROM '
        + params.grantee;

    return initializeQuery(connection, revokeRolesOrPrivsFromQuery);
}

const revokeTabOrColPrivsFrom = (connection, params) => {
    const revokeTabOrColPrivsFromQuery = 'REVOKE ' + params.tabOrColPrivs.join(',') + ' ON '
        + params.table + ' FROM ' + params.grantee;

    return initializeQuery(connection, revokeTabOrColPrivsFromQuery);
}

/*
(async function exec() {
    try {
        const role = { name: "role1", password: "role1" }
        //const params = ["z","z","USERS",500,"USERS","DEFAULT","UNLOCK"];
        const config = dbConfig("sys", 123, true);
        const connection = await createConnection(config);
        const result = await createRole(connection, role);
        const result1 = await alterRole(connection, role);
        // const result2 = await dropRole(connection, profile);
        console.log(result, result1);
    } catch (err) {
        console.log(err.message);
    }
})();
*/

module.exports = {
    createRole, alterRole, dropRole, grantRolesOrSysPrivsTo, grantTabOrColPrivsTo,
    revokeRolesOrSysPrivsFrom, revokeTabOrColPrivsFrom
}