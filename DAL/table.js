const { dbConfig, createConnection, initializeQuery } = require('./db');

const createTable = (connection, table) => {
    let createTableQuery = ' CREATE TABLE ' + table.name
        + ' ( ' + table.columns.join(',') + ' ) ';
    return initializeQuery(connection, createTableQuery);
}

//table.action=[add,alter,modify]
const alterTable = (connection, table) => {

    const alterTableQuery = ' ALTER TABLE ' + table.name + ' ' + table.action + ' ' + table.column;

    return initializeQuery(connection, alterTableQuery);
}

const dropTable = (connection, table) => {
    const dropTableQuery = 'DROP TABLE ' + table.name;

    return initializeQuery(connection, dropTableQuery);
}


const selectFromTable = (connection, table) => {
    const selectTableQuery = 'SELECT * FROM ' + table.name;

    return initializeQuery(connection, selectTableQuery);
}

const insertIntoTable = (connection, table) => {
    const insertIntoTableQuery = 'INSERT INTO ' + table.name + ' ( ' + table.columns.join(',') + ' ) ' +
        ' VALUES ( ' + table.values.join(',') + ' ) ';

    return initializeQuery(connection, insertIntoTableQuery);
}

const updateTable = (connection, table) => {
    const count = 0;
    let content;
    while (count < table.columns.length()) {
        const addQuoteIfValueIsString = table.values[count].isNaN() ? "'" + table.values[count] + "'" : table.values[count];
        content = table.columns[count] + ' = ' + addQuoteIfValueIsString + " , ";
    }
    const updateTableQuery = "UPDATE " + table.name + " SET " + content + " WHERE ID ='" + table.id + "'";

    return initializeQuery(connection, updateTableQuery);
}

const deleteFromTable = (connection, table) => {
    const deleteFromTableQuery = "DELETE FROM " + table.name + " WHERE ID ='" + table.id + "'";

    return initializeQuery(connection, deleteFromTableQuery);
}

(async function test() {
    try {
        let result;
        const profile = { name: "z", session: 1000, connect: 1000, idle: 1000 }
        //const params = ["z","z","USERS",500,"USERS","DEFAULT","UNLOCK"];
        const config = dbConfig("sys", "123", true);
        const connection = await createConnection(config);
        result = await createTable(connection, profile);
        console.log(result);

        profile.session = 500;
        result = await alterTable(connection, profile);
        // const result2 = await dropProfile(connection, profile);
        console.log(result);
        result = await selectFromTable(connection, profile);
        console.log(result);

        result = await insertIntoTable(connection, profile);
        console.log(result);

        result = await updateTable(connection, profile);
        console.log(result);

        result = await deleteFromTable(connection, profile);
        console.log(result);

    } catch (err) {
        console.log(err.message);
    }
})();

module.exports = {
    createTable, alterTable, dropTable, selectFromTable, insertIntoTable,
    updateTable, deleteFromTable
};