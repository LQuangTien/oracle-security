const { createUser, alterUser, dropUser } = require('../DAL/user');

const VALID = 1;
//const QUOTA_INVALID = 'QUOTA is not a number';
const STATUS_INVALID = 'STATE must be LOCK or UNLOCK';

function checkUserInfo(user) {
    const stateLock = 'LOCK';
    const stateUnlock = 'UNLOCK';

    if (user.state !== undefined) {
        if (!(user.state.trim().toUpperCase() === stateLock || user.state.trim().toUpperCase() === stateUnlock)) return STATUS_INVALID;
    }
    //if (user.quota.isNaN()) return QUOTA_INVALID;
    return VALID;
}

module.exports = {
    //input: {name:"user69",password:123[,defaultTablespace:"USERS",quota:'5M',
    //tempTablespace:'TEMP',profile:'pro69',state:'LOCK||UNLOCK'] }
    //output:{ rowsAffected: 0 }
    create(connection, user) {
        const isValid = checkUserInfo(user);
        if (isValid === 1) return createUser(connection, user);
        return isValid;

    },
    //input: {name:"user69",password:123[,defaultTablespace:"USERS",quota:'5M',
    //tempTablespace:'TEMP',profile:'pro69',state:'LOCK||UNLOCK'] }
    //output:{ rowsAffected: 0 }
    alter(connection, user) {
        const isValid = checkUserInfo(user);
        if (isValid === 1) return alterUser(connection, user);
        return isValid;
    },
    //input:userName:String
    //output:{ rowsAffected: 0 }
    drop(connection, userName) {
        return dropUser(connection, userName);
    },
}

