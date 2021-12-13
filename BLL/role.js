const {
     createRole, alterRole, dropRole, grantRolesOrSysPrivsTo, grantTabOrColPrivsTo,
    revokeRolesOrSysPrivsFrom, revokeTabOrColPrivsFrom
} = require('../DAL/role');
const {getRolesByUser } = require('../DAL/tableInfo');

const grantableFalseIfGranteeIsRole = (connection,grantee) => {
 return getRolesByUser(connection).then((data)=>{
for (const row of data.rows) {
if(row.GRANTED_ROLE===grantee) {
return false;
}
} 
return true;
});
}

module.exports = {
//input:{name:string[,password:string]}
//output: { rowsAffected: 0 }
    create(connection, role) {
        return createRole(connection, role);
    },
//input:{name:string,password:string}
//output: { rowsAffected: 0 }
    alter(connection, role) {
        return alterRole(connection, role);
    },
//input:roleName:string
//output: { rowsAffected: 0 }
    drop(connection, roleName) {
        return dropRole(connection, roleName);
    },
//input:{rolesOrSysPrivs:array,grantee:string,grantable:bool}
//output: { rowsAffected: 0 }
    grantRolesOrSysPrivs(connection, params) {
        return grantRolesOrSysPrivsTo(connection, params);
    },
//input:{tabOrColPrivs:array,table:string,grantee:string,grantable:bool}
//output:{ rowsAffected: 0 }
    grantTabOrColPrivs(connection, params) {
return grantableFalseIfGranteeIsRole(connection,params.grantee)
.then((grantable)=>{
params.grantable=grantable;

console.log(params);
        return grantTabOrColPrivsTo(connection, params);
});
    },
//input:{rolesOrSysPrivs:array,grantee:string}
//output:{ rowsAffected: 0 }
    revokeRolesOrSysPrivs(connection, params) {
        return revokeRolesOrSysPrivsFrom(connection, params);
    },
//input:{tabOrColPrivs:array,table:string,grantee:string}
//output:{ rowsAffected: 0 }
    revokeTabOrColPrivs(connection, params) {
        return revokeTabOrColPrivsFrom(connection, params);
    }
}