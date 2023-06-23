const sql = require("mssql");
const config = require('config');

class User{
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

const identityProviderConfig = config.identityProvider.dbConfig;

var formatconfig = {
    user: identityProviderConfig.dbUser,
    password: identityProviderConfig.dbPassword,
    server: identityProviderConfig.server, 
    database: identityProviderConfig.dbName,
    options: {
        encrypt: false,
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
};

async function fetchUser(email, password) {
    try {
      await sql.connect(formatconfig);

      const query = `select Username, Email, Password from Users where Email = @email and Password = @password`;
      const request = new sql.Request();
      request.input('email', sql.VarChar, email);
      request.input('password', sql.VarChar, password);
  
      const result = await request.query(query);

      const user = new User(result.recordset[0].username, result.recordset[0].email, result.recordset[0].password);
  
      await sql.close();
  
      return user;
    } catch (error) {
        throw error;
    }
}

async function addUser(username, email, password) {
    try {
        await sql.connect(formatconfig);

        const query = `INSERT INTO Users (Username, Email, Password)
        OUTPUT inserted.Username, inserted.Email, inserted.Password
        VALUES (@username, @email, @password);`;
        const request = new sql.Request();
        request.input('username', sql.VarChar, username);
        request.input('email', sql.VarChar, email);
        request.input('password', sql.VarChar, password);
    
        const insertResult = await request.query(query);
    
        const newUser = new User(insertResult.recordset[0].username
          , insertResult.recordset[0].Email
          , insertResult.recordset[0].password
          );
    
        await sql.close();
    
        return newUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    fetchUser,
    addUser,
};