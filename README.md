# NodeJS Global Mentoring Program

## In-memory CRUD REST service with validation

**Getting Started**

- **Install dependencies:**

`npm install`

- **Start the server:**

`npm run dev`
> The server will start running at `http://localhost:3000`

- **GET users:**

`http://localhost:3000/api/users`

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