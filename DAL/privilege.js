const { dbConfig, createConnection, initializeQuery } = require('../db');

const ALL_PRIVS_DBA = {
    SYS_PRIVS: ['CREATE PROFILE', 'ALTER PROFILE', 'DROP PROFILE', 'CREATE ROLE',
        'ALTER ANY ROLE', 'DROP ANY ROLE', 'GRANT ANY ROLE', 'CREATE SESSION', 'SELECT ANY TABLE',
        'CREATE USER', 'ALTER USER', 'DROP USER', 'CREATE ANY TABLE', 'ALTER ANY TABLE', 'DROP ANY TABLE',
        'DELETE ANY TABLE', 'INSERT ANY TABLE', 'UPDATE ANY TABLE', 'CREATE TABLE'],

    CHECK_PRIVS: ['CREATE PROFILE', 'ALTER PROFILE', 'DROP PROFILE', 'CREATE ROLE',
        'ALTER ANY ROLE', 'DROP ANY ROLE', 'GRANT ANY ROLE', 'CREATE SESSION', 'SELECT ANY TABLE',
        'CREATE USER', 'ALTER USER', 'DROP USER', 'SELECT'],

    OBJECT_PRIVS: ['SELECT', 'INSERT', 'DELETE'],

    COL_PRIVS: ['UPDATE', 'INSERT'],
}

const grantTo = (connection, params) => {
    const arrToStringAssign = params.assign.join(',');
    const grantToQuery = 'GRANT ' + arrToStringAssign + ' TO ' + params.grantee;

    return initializeQuery(connection, grantToQuery);
}

const executePrivs = (connection, params) => {
    const arrToStringAssign = params.assign.join(',');
    const grantToQuery = 'GRANT ' + arrToStringAssign + ' TO ' + params.grantee;

    return initializeQuery(connection, grantToQuery);
}

const getUserPrivs = (connection, params) => {
    const arrToStringAssign = params.assign.join(',');
    const grantToQuery = 'GRANT ' + arrToStringAssign + ' TO ' + params.grantee;

    return initializeQuery(connection, grantToQuery);
}

module.exports = { ALL_PRIVS_DBA, grantTo }
