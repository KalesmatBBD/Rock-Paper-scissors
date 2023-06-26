# Config file

Create a `default.json` file in the config folder if there is not one and use your db credentials for both databases.


### Database Setup
* run both db scripts in the dbScript folder.
* * `scripts.sql`
* * `IdentityProviderDBCreate.sql`
* * Make the following changes in the `default.json`
* * Make sure to only change the `user` and `password` for the `dbConfig`.
```json
{
  "identityProvider" : {
    "port": 8080,
    "dbConfig" : {
      "user": "Your user name",
      "password": "Your password",
      "database": "IdentityProviderDB",
      "server": "localhost",
      "options": {
          "encrypt": false,
          "trustServerCertificate": true
      }
      
    },
    "secret": "BBD_GRAD_SECRET_STRING",
    "key": "certs/identity.key"
  },
  "resourceApi" : {
    "port": 4040,
    "dbConfig" : {
      "user": "Your username",
      "password": "Your password",
      "database": "RockPaperScissors",
      "server": "localhost",
      "options": {
        "encrypt": false,
        "trustServerCertificate": true
      }
    },
    "key": "certs/api.key"
  }
}
```