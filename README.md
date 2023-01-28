# NodeJS Auth REST API with Express and Prisma

## Features

1. User can sign up
2. User can sign in

## API endpoints

1. `POST /api/auth/signup`: Creates a new user
2. `POST /api/auth/signin`: Logs in a user

## Body Payload Specification

Signup expects

```js
{
    email:      string,
    password:   string,
    name:       string
}
```

Signin expects

```js
{
    email:      string,
    password:   string
}
```

## Tools

- NodeJS/Express: Server
- MySQL: Storage
- JWT: Token based authentication
- bcryptjs: Password security
- winston/morgan: Logs
- Prisma: DB Management

## Available scripts

- `start`: Starts the server with node
- `start:dev`: Starts the server in watch mode

## Getting started

You can either fork this repository or clone it by starting your terminal, then change the directory to where you would like to save it and run

```sh
git clone https://github.com/RightShiner/node-auth-back-social-media.git
```

Change to the newly downloaded directory with

```sh
cd node-auth-back-social-media
```

Rename the file named `.env.example` to `.env` and update the variable values with valid ones

Install the required dependencies with

```sh
npm install
```

Prisma deploy

```sh
npx prisma migrate deploy
```

Prisma seed

```sh
npx prisma db seed
```

Start the app with

```sh
npm start
```

You can also start it in watch mode with

```sh
npm run start:dev
```

You can use email: `z@mail.com` and password: `123456` to login
