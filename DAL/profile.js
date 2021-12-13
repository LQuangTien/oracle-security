const { dbConfig, createConnection, initializeQuery } = require('./db');

const createProfile = (connection, profile) => {
let createProfileQuery = ' CREATE PROFILE ' + profile.name + ' LIMIT ' ;
if(profile.session) createProfileQuery+=createProfileQuery ;
if(profile.connect)  createProfileQuery+=' CONNECT_TIME ' + profile.connect;
if(profile.idle)  createProfileQuery+=' IDLE_TIME ' + profile.idle;
/*
    const createProfileQuery = ' CREATE PROFILE ' + profile.name + ' LIMIT ' +
        ' SESSIONS_PER_USER ' + profile.session +
        ' CONNECT_TIME ' + profile.connect +
        ' IDLE_TIME ' + profile.idle;
*/
    return initializeQuery(connection, createProfileQuery);
}

const alterProfile = (connection, profile) => {
let alterProfileQuery = ' ALTER PROFILE ' + profile.name + ' LIMIT ' ;
if(profile.session) alterProfileQuery +=createProfileQuery ;
if(profile.connect)  alterProfileQuery +=' CONNECT_TIME ' + profile.connect;
if(profile.idle)  alterProfileQuery +=' IDLE_TIME ' + profile.idle;

    return initializeQuery(connection, alterProfileQuery);
}

const dropProfile = (connection, profileName) => {
    const dropProfileQuery = 'DROP PROFILE ' + profileName + ' CASCADE';

    return initializeQuery(connection, dropProfileQuery);
}

/*
(async function test() {
    try {
        const profile = { name: "z", session: 'a', connect: 1000, idle: 1000}
        //const params = ["z","z","USERS",500,"USERS","DEFAULT","UNLOCK"];
        const config = dbConfig("sys", "123", true);
        const connection = await createConnection(config);
        const result = await createProfile(connection, profile);
        profile.session = 500;
        const result1 = await alterProfile(connection, profile);
        // const result2 = await dropProfile(connection, profile);
        console.log(result,result1);
    } catch (err) {
        console.log(err.message);
    }
})();
*/
module.exports = { createProfile, alterProfile, dropProfile };