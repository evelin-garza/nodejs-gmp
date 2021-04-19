# NodeJS Global Mentoring Program

## PostgreSQL and layered architecture

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

- **GET users:**

`http://localhost:3000/api/users`

- **GET users (include deleted entries):**

`http://localhost:3000/api/users?includeDeleted=true`

- **GET auto suggest users:**

`http://localhost:3000/api/users?loginSubstring=sub&limit=10&order=asc`

- **GET user by id:**

`http://localhost:3000/api/user/id`

- **POST create user:**

`http://localhost:3000/api/user`

Body:
```
{
  "login": "value",
  "password": "p4ssw0rd",
  "age": 20
}
```

- **PUT update user:**

`http://localhost:3000/api/user`

Body:
```
{
  "id": "id"
  "login": "update",
  "password": "p4ssw0rd",
  "age": 20
}
```

- **DELETE soft delete user:**

`http://localhost:3000/api/user/id`

- **Run ESLint:**

`npm run lint`