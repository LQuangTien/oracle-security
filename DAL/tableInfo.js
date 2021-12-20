const { dbConfig, createConnection, initializeQuery } = require("./db");

//TABLE QUYEN
//select GRANTEE,PRIVILEGE,ADMIN_OPTION from DBA_SYS_PRIVS WHERE INHERITED='NO';
//select GRANTEE,OWNER,TABLE_NAME,GRANTOR,PRIVILEGE,GRANTABLE,TYPE from DBA_TAB_PRIVS WHERE GRANTOR <> 'SYS'
//AND GRANTEE <> 'PUBLIC' AND INHERITED='NO' AND OWNER <> 'XDB'
//AND OWNER NOT LIKE '%SYS';
//select GRANTEE,OWNER,TABLE_NAME,COLUMN_NAME,GRANTOR,PRIVILEGE,GRANTABLE from DBA_COL_PRIVS WHERE inherited='NO';
const getAllSysPrivs = (connectionAdmin) => {
  const getSysPrivsQuery =
    "select GRANTEE,PRIVILEGE,ADMIN_OPTION from DBA_SYS_PRIVS WHERE INHERITED='NO'";

  return initializeQuery(connectionAdmin, getSysPrivsQuery);
};

const getAllTabPrivs = (connectionAdmin) => {
  const getTabPrivsQuery =
    "select GRANTEE,OWNER,TABLE_NAME,GRANTOR,PRIVILEGE,GRANTABLE,TYPE " +
    " from DBA_TAB_PRIVS WHERE GRANTOR <> 'SYS' AND GRANTEE <> 'PUBLIC' AND INHERITED='NO' " +
    " AND OWNER <> 'XDB' AND OWNER NOT LIKE '%SYS' ";

  return initializeQuery(connectionAdmin, getTabPrivsQuery);
};

const getAllColPrivs = (connectionAdmin) => {
  const getColPrivsQuery =
    "select GRANTEE,OWNER,TABLE_NAME,COLUMN_NAME,GRANTOR,PRIVILEGE,GRANTABLE " +
    " from DBA_COL_PRIVS WHERE inherited='NO' ";

  return initializeQuery(connectionAdmin, getColPrivsQuery);
};

//TABLE ROLE
//select ROLE_ID,ROLE from dba_roles where inherited = 'NO';

//SELECT ROLE,privilege,admin_option FROM ROLE_SYS_PRIVS WHERE ROLE='AUDIT_ADMIN';
//SELECT ROLE,OWNER,table_name,COLUMN_NAME,PRIVILEGE,GRANTABLE FROM ROLE_TAB_PRIVS WHERE ROLE='TEST_COL';

//select privilege from DBA_SYS_PRIVS WHERE INHERITED='NO' and grantee = 'TESTZZZZZZ';
//select OWNER,TABLE_NAME,GRANTOR,PRIVILEGE,GRANTABLE,TYPE from DBA_TAB_PRIVS WHERE GRANTOR <> 'SYS'
//AND GRANTEE <> 'PUBLIC' AND INHERITED='NO' AND OWNER <> 'XDB'
//AND OWNER NOT LIKE '%SYS' AND GRANTEE='TESTZZZZZZ';
//select OWNER,TABLE_NAME,COLUMN_NAME,GRANTOR,PRIVILEGE,GRANTABLE from DBA_COL_PRIVS WHERE inherited='NO' and grantee='TESTZZZZZZ';

//select * from dba_role_privs WHERE INHERITED = 'NO' AND GRANTED_ROLE='CONNECT';

// select * from dba_role_privs connect by prior granted_role = grantee start with grantee = '&USER' order by 1,2,3;
// select * from dba_sys_privs  where grantee = '&USER' or grantee in (select granted_role from dba_role_privs connect by prior granted_role = grantee start with grantee = '&USER') order by 1,2,3;
// select * from dba_tab_privs  where grantee = '&USER' or grantee in (select granted_role from dba_role_privs connect by prior granted_role = grantee start with grantee = '&USER') order by 1,2,3,4;
const getAllRoles = (connectionAdmin) => {
  const getRolesQuery =
    "select ROLE_ID,ROLE from dba_roles where inherited = 'NO'";

  return initializeQuery(connectionAdmin, getRolesQuery);
};

const getSysPrivsByRole = (connectionAdmin, roleName) => {
  const getSysPrivsByRoleQuery =
    "select grantee,privilege,admin_option from dba_sys_privs where grantee = '" +
    roleName +
    "'";

  return initializeQuery(connectionAdmin, getSysPrivsByRoleQuery);
};

const getTabPrivsByRole = (connectionAdmin, roleName) => {
  const getTabPrivsByRoleQuery =
    "select grantee,owner,table_name,grantor,privilege,grantable from dba_tab_privs " +
    " where grantee='" +
    roleName +
    "'";

  return initializeQuery(connectionAdmin, getTabPrivsByRoleQuery);
};

const getColPrivsByRole = (connectionAdmin, roleName) => {
  const getColPrivsByRoleQuery =
    "select grantee,owner,table_name,column_name,grantor,privilege,grantable " +
    " from dba_col_privs where grantee='" +
    roleName +
    "'";

  return initializeQuery(connectionAdmin, getColPrivsByRoleQuery);
};

const getUsersByRole = (connectionAdmin, roleName) => {
  const getUsersByRoleQuery =
    "select grantee,granted_role,admin_option from dba_role_privs WHERE GRANTED_ROLE='" +
    roleName +
    "'";

  return initializeQuery(connectionAdmin, getUsersByRoleQuery);
};
//USER_TS_QUOTAS,USER_RESOURCE_LIMITS,RESOURCE_COST
//TABLE PROFILE
//SELECT NAME FROM PROFNAME$
//select PROFILE,RESOURCE_NAME,LIMIT from DBA_profileS where profile='ACC2' AND  (RESOURCE_NAME = 'SESSIONS_PER_USER' OR  RESOURCE_NAME = 'IDLE_TIME' OR  RESOURCE_NAME = 'CONNECT_TIME');
//select username from DBA_USERS where profile = 'DEFAULT';
const getProfiles = (connectionAdmin) => {
  const getProfilesQuery = `select PROFILE,RESOURCE_NAME,LIMIT from DBA_profileS 
  WHERE RESOURCE_NAME = 'SESSIONS_PER_USER' 
  OR  RESOURCE_NAME = 'IDLE_TIME'
  OR  RESOURCE_NAME = 'CONNECT_TIME'`;

  return initializeQuery(connectionAdmin, getProfilesQuery);
};

const getResourcesByProfile = (connectionAdmin, profileName) => {
  const getUsersByRoleQuery =
    "select PROFILE,RESOURCE_NAME,LIMIT from DBA_profileS where profile = '" +
    profileName +
    "' AND  (RESOURCE_NAME = 'SESSIONS_PER_USER' OR  RESOURCE_NAME = 'IDLE_TIME' OR  RESOURCE_NAME = 'CONNECT_TIME') ";

  return initializeQuery(connectionAdmin, getUsersByRoleQuery);
};

const getUsersByProfile = (connectionAdmin, profileName) => {
  const getUsersByProfileQuery =
    "select username from DBA_USERS where profile = '" + profileName + "'";

  return initializeQuery(connectionAdmin, getUsersByProfileQuery);
};

//TABLE INFO
/*
SELECT DBA_USERS.username,DBA_USERS.account_status,DBA_USERS.lock_date,DBA_USERS.created,
DBA_USERS.default_tablespace,dba_ts_quotas.max_bytes as quotas,
DBA_USERS.temporary_tablespace,DBA_USERS.profile FROM DBA_USERS  inner join dba_ts_quotas 
on DBA_USERS.username = dba_ts_quotas.username
WHERE DBA_USERS.username='B';
*/

//SELECT * FROM DBA_TABLESPACES WHERE FORCE_LOGGING='NO' AND CONTENTS ='PERMANENT|TEMPORARY';
//select * from dba_ts_quotas;

//select PROFILE,RESOURCE_NAME,LIMIT from DBA_profileS where profile='ACC2' AND  (RESOURCE_NAME = 'SESSIONS_PER_USER' OR  RESOURCE_NAME = 'IDLE_TIME' OR  RESOURCE_NAME = 'CONNECT_TIME');

//SELECT granted_role,admin_option FROM USER_ROLE_PRIVS;

/*
SELECT owner,table_name,column_name,grantor,privilege,grantable FROM USEr_col_PRIVS where grantee = USER
SELECT owner,table_name,grantor,privilege,grantable FROM USEr_TAB_PRIVS where grantee = USER
SELECT privilege,admin_option FROM USEr_sys_PRIVS 
*/

//SELECT role,privilege,admin_option FROM ROLE_SYS_PRIVS;
//SELECT role,owner,table_name,column_name,privilege,grantable FROM ROLE_TAB_PRIVS where owner <> USER;

const getAllUserInfo = (connectionAdmin) => {
  const getAllUserInfoQuery =
    "SELECT DBA_USERS.username,DBA_USERS.account_status,DBA_USERS.lock_date, " +
    "DBA_USERS.created, DBA_USERS.default_tablespace,dba_ts_quotas.max_bytes as quotas, " +
    " DBA_USERS.temporary_tablespace,DBA_USERS.profile FROM DBA_USERS  left join dba_ts_quotas " +
    " on DBA_USERS.username = dba_ts_quotas.username ";

  return initializeQuery(connectionAdmin, getAllUserInfoQuery);
};

const getUserInfoByUsername = (connectionAdmin, username) => {
  const getAllUserInfoBQuery =
    "SELECT DBA_USERS.username,DBA_USERS.account_status,DBA_USERS.lock_date, " +
    "DBA_USERS.created, DBA_USERS.default_tablespace,dba_ts_quotas.max_bytes as quotas, " +
    " DBA_USERS.temporary_tablespace,DBA_USERS.profile FROM DBA_USERS left join dba_ts_quotas " +
    " on DBA_USERS.username = dba_ts_quotas.username " +
    " WHERE DBA_USERS.username = '" +
    username +
    "'";

  return initializeQuery(connectionAdmin, getAllUserInfoBQuery);
};

const getUserInfoByUser = (connection) => {
  const getUserInfoByUserNameQuery =
    "SELECT USER_USERS.username,USER_USERS.account_status,USER_USERS.lock_date, " +
    " USER_USERS.created, USER_USERS.default_tablespace,USER_ts_quotas.max_bytes as quotas, " +
    " USER_USERS.temporary_tablespace FROM USER_USERS, USER_ts_quotas ";

  return initializeQuery(connection, getUserInfoByUserNameQuery);
};

const getRolesByUser = (connection) => {
  const getRolesByUserQuery =
    "SELECT granted_role,admin_option FROM USER_ROLE_PRIVS";

  return initializeQuery(connection, getRolesByUserQuery);
};

const getRolesByUsername = (connectionAdmin, username) => {
  const getRolesByUserNameQuery =
    "SELECT grantee,granted_role,admin_option FROM dba_ROLE_PRIVS where grantee = '" +
    username +
    "'";

  return initializeQuery(connectionAdmin, getRolesByUserNameQuery);
};

const getColPrivsByUser = (connection) => {
  const getColPrivsByUserQuery =
    "SELECT owner,table_name,column_name,grantor,privilege,grantable " +
    " FROM USEr_col_PRIVS where grantee = USER";

  return initializeQuery(connection, getColPrivsByUserQuery);
};

const getColPrivsByUsername = (connectionAdmin, username) => {
  const getColPrivsByUsernameQuery =
    "SELECT grantee,owner,table_name,column_name,grantor,privilege,grantable " +
    " FROM dba_col_PRIVS where grantee = '" +
    username +
    "'";

  return initializeQuery(connectionAdmin, getColPrivsByUsernameQuery);
};

const getTabPrivsByUser = (connection) => {
  const getTabPrivsByUserQuery =
    "SELECT owner,table_name,grantor,privilege,grantable FROM USEr_TAB_PRIVS " +
    " where grantee = USER";

  return initializeQuery(connection, getTabPrivsByUserQuery);
};

const getTabPrivsByUsername = (connectionAdmin, username) => {
  const getTabPrivsByUsernameQuery =
    "SELECT grantee,owner,table_name,grantor,privilege,grantable FROM dba_TAB_PRIVS " +
    " where grantee = '" +
    username +
    "'";

  return initializeQuery(connectionAdmin, getTabPrivsByUsernameQuery);
};

const getSysPrivsByUser = (connection) => {
  const getSysPrivsByUserQuery =
    "SELECT privilege,admin_option FROM USEr_sys_PRIVS";

  return initializeQuery(connection, getSysPrivsByUserQuery);
};

const getSysPrivsByUsername = (connectionAdmin, username) => {
  const getSysPrivsByUsernameQuery =
    "SELECT grantee,privilege,admin_option FROM dba_sys_PRIVS " +
    " where grantee = '" +
    username +
    "'";

  return initializeQuery(connectionAdmin, getSysPrivsByUsernameQuery);
};

const getSysPrivsGrantedByRoleByUser = (connection) => {
  const getSysPrivsGrantedByRoleByUserQuery =
    "SELECT role,privilege,admin_option FROM ROLE_SYS_PRIVS";

  return initializeQuery(connection, getSysPrivsGrantedByRoleByUserQuery);
};

const getSysPrivsGrantedByRoleByRolename = (connectionAdmin, rolename) => {
  const getSysPrivsGrantedByRoleByRolenameQuery =
    "select GRANTEE,PRIVILEGE,ADMIN_OPTION FROM DBA_SYS_PRIVS where " +
    " grantee = '" +
    rolename +
    "'";

  return initializeQuery(
    connectionAdmin,
    getSysPrivsGrantedByRoleByRolenameQuery
  );
};

const getTabPrivsGrantedByRoleByUser = (connection) => {
  const getTabPrivsGrantedByRoleByUserQuery =
    "SELECT role,owner,table_name,column_name,privilege,grantable " +
    " FROM ROLE_TAB_PRIVS where owner <> USER";

  return initializeQuery(connection, getTabPrivsGrantedByRoleByUserQuery);
};

const getTabPrivsGrantedByRoleByRolename = (connectionAdmin, rolename) => {
  const getTabPrivsGrantedByRoleByRolenameQuery =
    "SELECT grantee,owner,table_name,grantor,privilege,grantable " +
    " FROM DBA_TAB_PRIVS where GRANTEE = '" +
    rolename +
    "'";

  return initializeQuery(
    connectionAdmin,
    getTabPrivsGrantedByRoleByRolenameQuery
  );
};

const getColPrivsGrantedByRoleByRolename = (connectionAdmin, rolename) => {
  const getColPrivsGrantedByRoleByRolenameQuery =
    "SELECT grantee,owner,table_name,column_name,grantor,privilege,grantable " +
    " FROM DBA_COL_PRIVS where GRANTEE = '" +
    rolename +
    "'";

  return initializeQuery(
    connectionAdmin,
    getColPrivsGrantedByRoleByRolenameQuery
  );
};

const getTables = (connection) => {
  const getTablesQuery = "SELECT table_name FROM user_tables";

  return initializeQuery(connection, getTablesQuery);
};

const getDefaultTablespace = (connectionAdmin) => {
  const getDefaultTablespaceQuery =
    "select TABLESPACE_NAME from dba_tablespaces where contentS='TEMPORARY'";

  return initializeQuery(connectionAdmin, getDefaultTablespaceQuery);
};

const getTemporaryTablespace = (connectionAdmin) => {
  const getTemporaryTablespaceQuery =
    "select TABLESPACE_NAME from dba_tablespaces where contentS='PERMANENT' AND FORCE_LOGGING='NO'";

  return initializeQuery(connectionAdmin, getTemporaryTablespaceQuery);
};

/*
(async function exec() {
    try {
        const profile = { name: 'DEFAULT' }

        //  const config = dbConfig("sys", "123", true);
        //   const connection = await createConnection(config);

        let result;

        // table quyen
        // metaData: [
        //    { name: 'GRANTEE' },
        //   { name: 'PRIVILEGE' },
        //    { name: 'ADMIN_OPTION' }
        // ]
        //   result = await getAllSysPrivs(connection);
        //   console.log("getAllSysPrivs", result);
        // [
        //   { name: 'GRANTEE' },
        //   { name: 'OWNER' },
        //  { name: 'TABLE_NAME' },
        //   { name: 'GRANTOR' },
        //   { name: 'PRIVILEGE' },
        //  { name: 'GRANTABLE' },
        //   { name: 'TYPE' }
        //  ]
        //   result = await getAllTabPrivs(connection);
        //   console.log("getAllTabPrivs", result);
        // metaData: [
        // { name: 'GRANTEE' },
        //   { name: 'OWNER' },
        //   { name: 'TABLE_NAME' },
        //   { name: 'COLUMN_NAME' },
        //   { name: 'GRANTOR' },
        //  { name: 'PRIVILEGE' },
        //   { name: 'GRANTABLE' }
        //  ]
        //        result = await getAllColPrivs(connection);
        //      console.log("getAllColPrivs", result);

        //TABLE ROLE
        //  const roleName = 'test';
        //[ { name: 'ROLE_ID' }, { name: 'ROLE' } ]
        //    result = await getAllRoles(connection);
        //    console.log("getAllRoles", result);
        //[ { name: 'ROLE' }, { name: 'PRIVILEGE' }, { name: 'ADMIN_OPTION' } ]
        //   result = await getSysPrivsByRole(connection, roleName);
        //    console.log("getSysPrivsByRole", result);
        //[
        //    { name: 'ROLE' },
        //  { name: 'OWNER' },
        //  { name: 'TABLE_NAME' },
        //  { name: 'COLUMN_NAME' },
        //  { name: 'PRIVILEGE' },
        //  { name: 'GRANTABLE' }
        // ]
        //        result = await getTabPrivsByRole(connection, roleName);
        //       console.log("getTabPrivsByRole", result);
        // [
        //   { name: 'GRANTEE' },
        //  { name: 'GRANTED_ROLE' },
        //  { name: 'ADMIN_OPTION' },
        // { name: 'DELEGATE_OPTION' },
        //   { name: 'DEFAULT_ROLE' },
        //{ name: 'COMMON' },
        //  { name: 'INHERITED' }
        // ]
        //       result = await getUsersByRole(connection, roleName);
        //       console.log("getUsersByRole", result);

        // table profile
        const profileName = 'test';
        //  [ { name: 'NAME' } ]
        //     result = await getProfiles(connection);
        //       console.log("getProfiles", result);
        //  [ { name: 'PROFILE' }, { name: 'RESOURCE_NAME' }, { name: 'LIMIT' } ]
        //       result = await getResourcesByProfile(connection, profileName);
        //      console.log("getResourcesByProfile", result);
        //  [{name:'username'}]
        //   result = await getUsersByProfile(connection, profileName);
        //     console.log("getUsersByProfile", result);

        //table info
        const username = 'test';

        //[
        //  { name: 'USERNAME' },
        //    { name: 'ACCOUNT_STATUS' },
        //{ name: 'LOCK_DATE' },
        //{ name: 'CREATED' },
        //{ name: 'DEFAULT_TABLESPACE' },
        //{ name: 'QUOTAS' },
        //{ name: 'TEMPORARY_TABLESPACE' },
        //{ name: 'PROFILE' }
        //]
        //     result = await getUserInfoByUserName(connection, username);
        //    console.log("getUserInfoByUserName", result);

        //[ { name: 'GRANTED_ROLE' }, { name: 'ADMIN_OPTION' } ]
        //    result = await getRolesByUser(connection);
        //    console.log("getRolesByUser", result);


        //[
        //{ name: 'OWNER' },
        //{ name: 'TABLE_NAME' },
        //{ name: 'COLUMN_NAME' },
        //{ name: 'GRANTOR' },
        //{ name: 'PRIVILEGE' },
        //{ name: 'GRANTABLE' }
        //]
        //result = await getColPrivsByUser(connection);
        //console.log("getColPrivsByUser", result);
        //[
        //{ name: 'OWNER' },
        //{ name: 'TABLE_NAME' },
        //{ name: 'GRANTOR' },
        //{ name: 'PRIVILEGE' },
        //{ name: 'GRANTABLE' }
        //]
        //result = await getTabPrivsByUser(connection);
        //console.log("getTabPrivsByUser", result);
        //[ { name: 'PRIVILEGE' }, { name: 'ADMIN_OPTION' } ]
        //result = await getSysPrivsByUser(connection);
        //console.log("getSysPrivsByUser", result);
        const config = dbConfig("accmaster", "accmaster", false);
        const connection = await createConnection(config);
        //[ { name: 'ROLE' }, { name: 'PRIVILEGE' }, { name: 'ADMIN_OPTION' } ]
       // result = await getSysPrivsGrantedByRoleByUser(connection);
       // console.log("getSysPrivsGrantedByRoleByUser", result);
        //[
        //{ name: 'ROLE' },
        //{ name: 'OWNER' },
        //{ name: 'TABLE_NAME' },
        //{ name: 'COLUMN_NAME' },
        //{ name: 'PRIVILEGE' },
        //{ name: 'GRANTABLE' }
        //]
      //  result = await getTabPrivsGrantedByRoleByUser(connection);
     //  console.log("getTabPrivsGrantedByRoleByUser", result);

    } catch (err) {
        console.log(err.message);
    }
})();
*/

module.exports = {
  getAllSysPrivs,
  getAllTabPrivs,
  getAllColPrivs,
  getAllRoles,
  getSysPrivsByRole,
  getTabPrivsByRole,
  getColPrivsByRole,
  getUsersByRole,
  getProfiles,
  getResourcesByProfile,
  getUsersByProfile,
  getAllUserInfo,
  getUserInfoByUsername,
  getUserInfoByUser,
  getRolesByUser,
  getRolesByUsername,
  getColPrivsByUser,
  getColPrivsByUsername,
  getTabPrivsByUser,
  getTabPrivsByUsername,
  getSysPrivsByUser,
  getSysPrivsByUsername,
  getSysPrivsGrantedByRoleByUser,
  getSysPrivsGrantedByRoleByRolename,
  getTabPrivsGrantedByRoleByUser,
  getTabPrivsGrantedByRoleByRolename,
  getColPrivsGrantedByRoleByRolename,
  getDefaultTablespace,
  getTemporaryTablespace,
  getTables,
};
