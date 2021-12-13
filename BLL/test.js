//const {create,alter,drop} = require ('./profile');
//const {create,alter,drop} = require ('./user');
//const {create,alter,drop,grantRolesOrSysPrivs,grantTabOrColPrivs,
//revokeRolesOrSysPrivs,revokeTabOrColPrivs} = require ('./role');
const {getAllPrivileges,getAllRole,getAllPrivsByRole,getAllUsersByRole,
getAllProfiles,getProfileInfo,getAllUsersByProfile,getAllUser,getAllRolesByUsername,
getAllPrivsByUsername,getUserInfoByUserConnection} = require('./tableInfo');
const { dbConfig, createConnection,openPluggableDB  } = require('../DAL/db');

(async function test(){
try{
 await openPluggableDB();
 const config = await dbConfig("sys","123",true);
 const connection = await createConnection(config);
let rs;
//USER
/*
const user = {name:"user6",password:123,state:'UNLOCK'};//,defaultTablespace:"USERS",quota:'5M',
tempTablespace:'TEMP',profile:'pro69',state:'A' }
  rs = await create(connection, user );
console.log(rs);
user.profile="acc2";
  rs = await alter(connection, user );
console.log(rs);
 rs = await drop(connection,"user69");
console.log(rs);
*/


//PROFILE
/*
const profile = {name:"pro69",session:65,connect:69,idle:69}

  rs = await create(connection,profile );
console.log(rs);
profile.idle=6;
  rs = await alter(connection,profile );
console.log(rs);
  rs = await drop(connection,"pro69");
console.log(rs);
*/


//ROLE
/*
const role= {name:"role69"}//,password:69}
  rs = await create(connection,role );
console.log(rs);
role.password=669;
  rs = await alter(connection,role );
console.log(rs);
  rs = await drop(connection,"role69");
console.log(rs);
*/
/*
const paramsGrant1 = {rolesOrSysPrivs:['ROLE69','CREATE ROLE'],
grantee:'HR',grantable:false}
 rs = await grantRolesOrSysPrivs(connection,paramsGrant1);
console.log(rs);

const paramsRevoke1 = {rolesOrSysPrivs:['ROLE69','CREATE ROLE'],grantee:'HR'}
 rs = await revokeRolesOrSysPrivs(connection,paramsRevoke1);
console.log(rs);
*/

/*
const paramsGrant2 = {tabOrColPrivs:['SELECT','UPDATE(NAME)','INSERT'],
table:'HOANGAN.INFO',grantee:'ROLE69',grantable:true}
 rs = await grantTabOrColPrivs(connection,paramsGrant2);
console.log(rs);

const paramsRevoke2={tabOrColPrivs:['SELECT','UPDATE','INSERT'],
table:'HOANGAN.INFO',grantee:'ROLE69'}
 rs = await revokeTabOrColPrivs(connection,paramsRevoke2);
console.log(rs);
*/

//TABLE INFO

//TABLE QUYEN
// rs = await getAllPrivileges(connection);
//console.log(rs);

//TABLE ROLE
// rs = await getAllRole(connection);
//console.log(rs);


// rs = await getAllPrivsByRole(connection,'ALA');
//console.log(rs);

// rs = await getAllUsersByRole(connection,'ALA');
//console.log(rs);

//TABLE PROFILE
// rs = await getAllProfiles(connection);
//console.log(rs);

// rs = await getProfileInfo(connection,'ACC2');
//console.log(rs);

 //rs = await getAllUsersByProfile(connection,'ACC2');
//console.log(rs);

//TABLE USER INFO KHI ĐĂNG NHẬP BẰNG ADMIN
// rs = await getAllUser(connection);
//console.log(rs);

// rs = await getAllRolesByUsername(connection,'HOANGAN');
//console.log(rs);

 //rs = await getAllPrivsByUsername(connection,'HOANGAN');
//console.log(rs);

//TABLE USER INFO CỦA USER ĐANG CONNECT
 const configUser = await dbConfig("hoangan","hoangan",false);
 const connectionUser = await createConnection(configUser);
 rs = await getUserInfoByUserConnection(connectionUser);
console.log(rs);

} catch(e) {
console.log(e);
}
})()