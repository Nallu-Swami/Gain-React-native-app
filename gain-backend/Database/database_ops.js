import supabase from '/Users/aringy/Desktop/MATH/gain-backend/Database/database.js';

async function fetchAllFromTable(tableName) {
    const { data, error } = await supabase
        .from(tableName)
        .select('*');

    if (error) {
        console.error(`Error fetching data from table ${tableName}:`, error);
    } else {
        console.log(`Data from table ${tableName}:`, data);
    }
}

async function insertIntoTable(tableName, newRow) {
    const { data, error } = await supabase
        .from(tableName)
        .insert([newRow]);

    if (error) {
        console.error(`Error inserting data into table ${tableName}:`, error);
    } else {
        console.log(`Inserted data into table ${tableName}:`, data);
    }
}

async function updateInTable(tableName, updates, criteria) {
    const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .match(criteria);

    if (error) {
        console.error(`Error updating data in table ${tableName}:`, error);
    } else {
        console.log(`Updated data in table ${tableName}:`, data);
    }
}

async function deleteFromTable(tableName, criteria) {
    const { data, error } = await supabase
        .from(tableName)
        .delete()
        .match(criteria);

    if (error) {
        console.error(`Error deleting data from table ${tableName}:`, error);
    } else {
        console.log(`Deleted data from table ${tableName}:`, data);
    }
}


async function performDatabaseOperations() {

    await fetchAllFromTable('your_table');
    await insertIntoTable('your_table', { column1: 'value1', column2: 'value2' });
    await updateInTable('your_table', { column1: 'new_value' }, { column2: 'value2' });
    await deleteFromTable('your_table', { column2: 'value2' });
}

performDatabaseOperations();
