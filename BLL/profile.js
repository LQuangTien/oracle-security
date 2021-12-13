const { createProfile, alterProfile, dropProfile } = require('../DAL/profile');
//const { } = require('../DAL/table');

const VALID = 1;
const PROFILE_VALUE_INVALID = 'Profile value must be default or unlimited or a number';
const PROFILE_NAME_INVALID = 'Profile name must be string';

function checkProfileInfo(profile) {

    const profileDefaultValue = 'DEFAULT';
    const profileUnlimitValue = 'UNLIMITED';

if(isNaN(profile.name)===false) return PROFILE_NAME_INVALID;
const { name,...other} = profile;

    for (const field in other) {

        if (isNaN(other[field]) && (other[field].trim().toUpperCase() !== profileDefaultValue || other[field].trim().toUpperCase() !== profileUnlimitValue))
            return PROFILE_VALUE_INVALID;
    }
    return VALID;
}

module.exports = {
//phai co it nhat 1 trong 3 thang session,connect,idle
//input:{name:string,session:int[,connect:int,idle:int]}
//output:{ rowsAffected: 0 }
    create(connection, profile) {
        const isValid = checkProfileInfo(profile);

        if (isValid === 1) return createProfile(connection, profile);
        return isValid;
    },
//phai co it nhat 1 trong 3 thang session,connect,idle
//input:{name:string,session:int[,connect:int,idle:int]}
//output:{ rowsAffected: 0 }
    alter(connection, profile) {
        const isValid = checkProfileInfo(profile);
        if (isValid === 1) return alterProfile(connection, profile);
        return isValid;
    },
//input:profileName:string
//output:{ rowsAffected: 0 }
    drop(connection, profileName) {
        return dropProfile(connection, profileName);
    },
}