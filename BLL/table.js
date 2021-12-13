const {
    createTable, alterTable, dropTable, selectFromTable, insertIntoTable,
    updateTable, deleteFromTable
} = require('../DAL/table');

module.exports = {
    create(connection, table) {
        return createTable(connection, table);
    },
    alter(connection, table) {
        return alterTable(connection, table);
    },
    select(connection, table) {
        return selectFromTable(connection, table);
    },
    insert(connection, table) {
        return insertIntoTable(connection, table);
    },
    update(connection, table) {
        return updateTable(connection, table);
    },
    delete(connection, table) {
        return deleteFromTable(connection, table);
    }
}