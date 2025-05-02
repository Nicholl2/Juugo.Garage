const users = require('./users');

async function main() {
  try {
    console.log('Get all users:');
    let allUsers = await users.getAllUsers();
    console.log(allUsers);

    console.log('\nCreate a new user:');
    const newUserId = await users.createUser('Alice', 'alice@example.com');
    console.log('New user ID:', newUserId);

    console.log('\nGet user by ID:', newUserId);
    const user = await users.getUserById(newUserId);
    console.log(user);

    console.log('\nUpdate user:');
    const updatedRows = await users.updateUser(newUserId, 'Alice Smith', 'alice.smith@example.com');
    console.log('Rows updated:', updatedRows);

    console.log('\nGet updated user by ID:', newUserId);
    const updatedUser = await users.getUserById(newUserId);
    console.log(updatedUser);

    console.log('\nDelete user:');
    const deletedRows = await users.deleteUser(newUserId);
    console.log('Rows deleted:', deletedRows);

    console.log('\nGet all users at the end:');
    allUsers = await users.getAllUsers();
    console.log(allUsers);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
