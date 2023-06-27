# Rock-Paper-Scissors
Play an old school Rock Paper, Scissors game against the pc and try and beat other players scores.
## Installation
### Packages
* npm install
-- --
### Database Setup (`dbScripts folder`)
* run both db scripts in the dbScript folder.
* * `scripts.sql`
* * `IdentityProviderDBCreate.sql`
* DB config ( `config folder -> default.json`)
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
## Run applications
* Run resourceApi for api and frontend `npm run start:api`
* * Url is `http://localhost:4040`
-- --
* Run identityProvider for auth `npm run start:identity`