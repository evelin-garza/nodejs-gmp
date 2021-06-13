# NodeJS Global Mentoring Program

## Unit tests and config

**Getting Started**

- **Install dependencies:**

`npm install`

- **Start the server:**

`npm run dev`
> The server will start running at `http://localhost:3000`

**Database setup**

This project connects to a database in queenie.db.elephantsql.com, to use your own db configuration, update values in [db.config.ts](https://github.com/evelin-garza/nodejs-gmp/blob/task3-postgresql-and-layered-architecture/src/config/db.config.ts)

> Users table is populated with some test data, you can go to http://localhost:3000/api/users to check it.

**API**

- **POST login:**

`http://localhost:3000/api/auth/login`

Body:
```
{
  "login": "value",
  "password": "p4ssw0rd"
}
```

- **NOTE:** the following endpoints require authorization token
Headers:
```
{
  "Authorization": "Bearer accessToken"
}
```

- **GET users:**

`http://localhost:3000/api/users`

- **GET users (include deleted entries):**

`http://localhost:3000/api/users?includeDeleted=true`

- **GET auto suggest users:**

`http://localhost:3000/api/users?loginSubstring=sub&limit=10&order=asc`

- **GET user by id:**

`http://localhost:3000/api/users/id`

- **POST create user:**

`http://localhost:3000/api/users`

Body:
```
{
  "login": "value",
  "password": "p4ssw0rd",
  "age": 20
}
```

- **PUT update user:**

`http://localhost:3000/api/users/id`

Body:
```
{
  "login": "update",
  "password": "p4ssw0rd",
  "age": 20
}
```

- **GET Add Users To Group:**

`http://localhost:3000/api/users/addToGroup`

Body:
```
{
  "groupId": "efa817b8-f6e3-48a3-bc5a-1458eec13885",
  "userIds": [1,2,3]
}
```

- **DELETE soft delete user:**

`http://localhost:3000/api/users/id`

- **GET groups:**

`http://localhost:3000/api/groups`

- **GET group by id:**

`http://localhost:3000/api/groups/id`

- **POST create group:**

`http://localhost:3000/api/groups`

Body:
```
{
  "name": "Superadmin",
  "permissions": ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"]
}
```

- **PUT update group:**

`http://localhost:3000/api/groups/id`

Body:
```
{
  "name": "User",
  "permissions": ["READ"]
}
```

- **DELETE group:**

`http://localhost:3000/api/groups/id`

- **Run ESLint:**

`npm run lint`

**UNIT TESTS**

- **Run tests:**

`npm run test`

- **Run tests with coverage:**

`npm run coverage`