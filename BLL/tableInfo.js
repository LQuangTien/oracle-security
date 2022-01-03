const {
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
} = require("../DAL/tableInfo");
const getAllPrivsByUserConnection = async (connection) => {
  const [colPrivs, tabPrivs, sysPrivs, sysPrivsByRole, objectPrivsByRole] =
    await Promise.all([
      getColPrivsByUser(connection),
      getTabPrivsByUser(connection),
      getSysPrivsByUser(connection),
      getSysPrivsGrantedByRoleByUser(connection),
      getTabPrivsGrantedByRoleByUser(connection),
    ]);

  const privs = [];
  for (const row of colPrivs.rows) {
    privs.push({
      role: null,
      owner: row.OWNER,
      table: row.TABLE_NAME,
      column: row.COLUMN_NAME,
      grantor: row.GRANTOR,
      privilege: row.PRIVILEGE,
      grantable: row.GRANTABLE,
    });
  }
  for (const row of tabPrivs.rows) {
    privs.push({
      role: null,
      owner: row.OWNER,
      table: row.TABLE_NAME,
      column: null,
      grantor: row.GRANTOR,
      privilege: row.PRIVILEGE,
      grantable: row.GRANTABLE,
    });
  }
  for (const row of sysPrivs.rows) {
    privs.push({
      role: null,
      owner: null,
      table: null,
      column: null,
      grantor: null,
      privilege: row.PRIVILEGE,
      grantable: row.ADMIN_OPTION,
    });
  }

  const privsGrantedByRole = [];
  for (const row of sysPrivsByRole.rows) {
    privsGrantedByRole.push({
      role: row.ROLE,
      owner: null,
      table: null,
      column: null,
      grantor: null,
      privilege: row.PRIVILEGE,
      grantable: row.ADMIN_OPTION,
    });
  }
  for (const row of objectPrivsByRole.rows) {
    privsGrantedByRole.push({
      role: row.ROLE,
      owner: row.OWNER,
      table: row.TABLE_NAME,
      column: row.COLUMN_NAME,
      privilege: row.PRIVILEGE,
      grantable: row.GRANTABLE,
    });
  }
  return { privs, privsGrantedByRole };
};
module.exports = {
  //TABLE PRIVILEGE
  //input: connection as SYSDBA
  //output: [{grantee:string,owner:string,table:string,column:string,grantor:string,
  //privilege:string,grantable:string},..]
  async getAllPrivileges(connectionAdmin) {
    const result = [];

    const [sysPrivs, tabPrivs, colPrivs] = await Promise.all([
      getAllSysPrivs(connectionAdmin),
      getAllTabPrivs(connectionAdmin),
      getAllColPrivs(connectionAdmin),
    ]);

    for (const row of sysPrivs.rows) {
      result.push({
        grantee: row.GRANTEE,
        owner: null,
        table: null,
        column: null,
        grantor: null,
        privilege: row.PRIVILEGE,
        grantable: row.ADMIN_OPTION,
      });
    }

    for (const row of tabPrivs.rows) {
      result.push({
        grantee: row.GRANTEE,
        owner: row.OWNER,
        table: row.TABLE_NAME,
        column: row.COLUMN_NAME,
        grantor: row.GRANTOR,
        privilege: row.PRIVILEGE,
        grantable: row.GRANTABLE,
      });
    }

    for (const row of colPrivs.rows) {
      result.push({
        grantee: row.GRANTEE,
        owner: row.OWNER,
        table: row.TABLE_NAME,
        column: row.COLUMN_NAME,
        grantor: row.GRANTOR,
        privilege: row.PRIVILEGE,
        grantable: row.GRANTABLE,
      });
    }
    return result;
  },

  //TABLE ROLE
  //input: connection as SYSDBA
  //output: [{ROLE_ID:int,ROLE:string},..]
  getAllRole(connectionAdmin) {
    return getAllRoles(connectionAdmin).then((data) => data.rows);
    // .then((data) => {
    //     const result = [];
    //     for (const row of data.rows) {
    //         result.push({ roleId: row.ROLE_ID, role: row.ROLE });
    //     }
    //     return result;
    // })
  },
  //input: connection as SYSDBA, roleName:string
  //output: [{role:string,owner:string,table:string,column:string||null,grantor:string,
  //privilege:string,grantable:string},..]
  async getAllPrivsByRole(connectionAdmin, roleName) {
    const result = [];

    const [sysPrivs, tabPrivs, colPrivs] = await Promise.all([
      getSysPrivsByRole(connectionAdmin, roleName),
      getTabPrivsByRole(connectionAdmin, roleName),
      getColPrivsByRole(connectionAdmin, roleName),
    ]);

    for (const row of sysPrivs.rows) {
      result.push({
        role: row.GRANTEE,
        owner: null,
        table: null,
        column: null,
        grantor: null,
        privilege: row.PRIVILEGE,
        grantable: row.ADMIN_OPTION,
      });
    }

    for (const row of tabPrivs.rows) {
      result.push({
        role: row.GRANTEE,
        owner: row.OWNER,
        table: row.TABLE_NAME,
        column: null,
        grantor: row.GRANTOR,
        privilege: row.PRIVILEGE,
        grantable: row.GRANTABLE,
      });
    }
    //grantee,owner,table_name,column_name,grantor,privilege,grantable
    for (const row of colPrivs.rows) {
      result.push({
        role: row.GRANTEE,
        owner: row.OWNER,
        table: row.TABLE_NAME,
        column: row.COLUMN_NAME,
        grantor: row.GRANTOR,
        privilege: row.PRIVILEGE,
        grantable: row.GRANTABLE,
      });
    }
    return result;
  },
  //input: connection as SYSDBA, roleName:string
  //output: [{GRANTEE:string,GRANTED_ROLE:string,ADMIN_OPTION:string},..]
  getAllUsersByRole(connectionAdmin, roleName) {
    return getUsersByRole(connectionAdmin, roleName).then((data) => data.rows);
    // .then((data) => {
    //     const result = [];
    //     for (const row of data.rows) {
    //         result.push({
    //             grantee: row.GRANTEE, role: row.GRANTED_ROLE,
    //             grantable: row.ADMIN_OPTION
    //         });
    //     }
    //     return result;
    // })
  },

  //TABLE PROFILE
  //input: connection as SYSDBA
  //output: [{NAME:string},..]
  getAllProfiles(connectionAdmin) {
    return getProfiles(connectionAdmin).then((data) => data.rows);
    // .then((data) => {
    //     const result = [];
    //     for (const row of data.rows) {
    //         result.push({ profile: row.NAME });
    //     }
    //     return result;
    // })
  },
  //input: connection as SYSDBA, profileName:string
  //output: [{PROFILE:string,RESOURCE_NAME:string,LIMIT:string},..]
  getProfileInfo(connectionAdmin, profileName) {
    return getResourcesByProfile(connectionAdmin, profileName).then(
      (data) => data.rows
    );
    // .then((data) => {
    //     const result = [];
    //     for (const row of data.rows) {
    //         result.push({ resource: row.RESOURCE_NAME, limit: row.LIMIT });
    //     }
    //     return result;
    // })
  },
  //input: connection as SYSDBA, profileName:string
  //output: [{USERNAME:string},..]
  getAllUsersByProfile(connectionAdmin, profileName) {
    return getUsersByProfile(connectionAdmin, profileName).then(
      (data) => data.rows
    );
    //.then((data) => {
    //     const result = [];
    //     for (const row of data.rows) {
    //         result.push({ username: row.username });
    //     }
    //     return result;
    // })
  },

  //TABLE USER INFO KHI ĐĂNG NHẬP BẰNG ADMIN
  //input: connection as SYSDBA
  //output: [{USERNAME:string,ACCOUNT_STATUS:string,LOCK_DATE:string||null,
  //CREATED:string,DEFAULT_TABLESPACE:string,QUOTAS:string,TEMPORARY_TABLESPACE:string,
  //PROFILE:string},..]
  getAllUser(connectionAdmin) {
    return getAllUserInfo(connectionAdmin).then((data) => data.rows);
  },
  //input: connection as SYSDBA, username:string
  //output:giong ben tren
  getUserByUsername(connectionAdmin, username) {
    return getUserInfoByUsername(connectionAdmin, username).then(
      (data) => data.rows
    );
  },
  //input: connection as SYSDBA, username:string
  //output: [{GRANTEE:STRING,GRANTED_ROLE:STRING,ADMIN_OPTION:STRING},..]
  getAllRolesByUsername(connectionAdmin, username) {
    return getRolesByUsername(connectionAdmin, username).then(
      (data) => data.rows
    );
  },
  //input: connection as SYSDBA, username:string
  //output: [{grantee:string,owner:string||null,table:string||null,column:string||null,
  //privilege:string,grantable:string},..]
  async getAllPrivsByUsername(connectionAdmin, username) {
    const result = [];
    const [colPrivs, tabPrivs, sysPrivs] = await Promise.all([
      getColPrivsByUsername(connectionAdmin, username),
      getTabPrivsByUsername(connectionAdmin, username),
      getSysPrivsByUsername(connectionAdmin, username),
    ]);

    //grantee,owner,table_name,column_name,grantor,privilege,grantable
    //grantee,owner,table_name,grantor,privilege,grantable
    //grantee,privilege,admin_option
    for (const row of colPrivs.rows) {
      result.push({
        grantee: row.GRANTEE,
        owner: row.OWNER,
        table: row.TABLE_NAME,
        column: row.COLUMN_NAME,
        privilege: row.PRIVILEGE,
        grantable: row.GRANTABLE,
      });
    }

    for (const row of tabPrivs.rows) {
      result.push({
        grantee: row.GRANTEE,
        owner: row.OWNER,
        table: row.TABLE_NAME,
        column: null,
        privilege: row.PRIVILEGE,
        grantable: row.GRANTABLE,
      });
    }

    for (const row of sysPrivs.rows) {
      result.push({
        grantee: row.GRANTEE,
        owner: null,
        table: null,
        column: null,
        privilege: row.PRIVILEGE,
        grantable: row.ADMIN_OPTION,
      });
    }
    return result;
  },
  //TRUNG ROIIIIIIIIIIIIIIIIIIIIIIII, BEN TREN ROLE CO NAY ROI
  async getAllPrivsByRoleName(connectionAdmin, roleName) {
    const result = [];
    const [sysPrivs, tabPrivs, colPrivs] = await Promise.all([
      getSysPrivsGrantedByRoleByRolename(connectionAdmin, username),
      getTabPrivsGrantedByRoleByRolename(connectionAdmin, username),
      getColPrivsGrantedByRoleByRolename(connectionAdmin, username),
    ]);

    //GRANTEE,PRIVILEGE,ADMIN_OPTION
    //grantee,owner,table_name,grantor,privilege,grantable
    //grantee,owner,table_name,column_name,grantor,privilege,grantable
    for (const row of colPrivs.rows) {
      result.push({
        grantee: row.GRANTEE,
        owner: row.OWNER,
        table: row.TABLE_NAME,
        column: row.COLUMN_NAME,
        privilege: row.PRIVILEGE,
        grantable: row.GRANTABLE,
      });
    }

    for (const row of tabPrivs.rows) {
      result.push({
        grantee: row.GRANTEE,
        owner: row.OWNER,
        table: row.TABLE_NAME,
        column: null,
        privilege: row.PRIVILEGE,
        grantable: row.GRANTABLE,
      });
    }

    for (const row of sysPrivs.rows) {
      result.push({
        grantee: row.GRANTEE,
        owner: nullR,
        table: null,
        column: null,
        privilege: row.PRIVILEGE,
        grantable: row.ADMIN_OPTION,
      });
    }
    return result;
  },

  //TABLE USER INFO CỦA USER ĐANG CONNECT
  //input: connection as USER
  //output:
  //{
  //userInfo:{
  //USERNAME:STRING,ACCOUNT_STATUS:sTRING,LOCK_DATE:STRING||NULL,
  //CREATED:STRING,DEFAULT_TABLESPACE:STRING,QUOTAS:STRING,TEMPORARY_TABLESPACE:STRING
  //},
  //roles:[{GRANTED_ROLE:STRING,ADMIN_OPTION:STRING},..],
  //privs:[{role:null,owner:string,table:string,column:null,grantor:string,privilege:string,
  //grantable:string},..],
  //privsGrantedByRole:[{role:string,owner:null,table:null,column:null,grantor:null,
  //privilege:string,grantable:string}]
  //}
  async getUserInfoByUserConnection(connection) {
    const user = {};
    const [userinfo, allRoles, allPrivs] = await Promise.all([
      getUserInfoByUser(connection),
      getRolesByUser(connection),
      getAllPrivsByUserConnection(connection),
    ]);

    user.userInfo = userinfo.rows[0];
    user.roles = allRoles.rows;

    user.privs = allPrivs.privs;
    user.privsGrantedByRole = allPrivs.privsGrantedByRole;

    return user;
  },
  getAllPrivsByUserConnection,
  //input: connection as SYSDBA
  //output: [{TABLESPACE_NAME:string}]
  getDefaultTableSpaces(connectionAdmin) {
    return getDefaultTablespace(connectionAdmin).then((data) => data.rows);
  },
  //input: connection as SYSDBA
  //output: [{TABLESPACE_NAME:string}]
  getTemporaryTableSpaces(connectionAdmin) {
    return getTemporaryTablespace(connectionAdmin).then((data) => data.rows);
  },
  //input: connection as User
  //output: [{TABLE_NAME:string}]
  getAllTables(connectionAdmin) {
    return getTables(connectionAdmin).then((data) => data.rows);
  },
};
