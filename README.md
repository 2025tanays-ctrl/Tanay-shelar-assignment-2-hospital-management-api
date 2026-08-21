# Hospital Management API

A simple REST API built with Node.js and Express for registering users and managing hospital records.

## Features

- Register users
- List all hospitals
- Retrieve a hospital by ID
- Create, update, and delete hospitals
- Protect hospital write operations with Passport Local authentication
- Log incoming requests to the console

## Requirements

- Node.js 18 or newer
- npm

## Installation

```bash
npm install
```

## Run the API

```bash
node server.js
```

The server runs at `http://localhost:4000`.

Hospital data and users are stored in memory, so all records are cleared when the server restarts.

## Endpoints

### Register a user

`POST /register`

```json
{
  "name": "Alex Smith",
  "username": "alex",
  "email": "alex@example.com",
  "password": "secret123"
}
```

### List hospitals

`GET /hospitals`

### Get one hospital

`GET /hospitals/:id`

### Create a hospital

`POST /hospitals`

This route requires valid `username` and `password` fields in the request body.

```json
{
  "username": "alex",
  "password": "secret123",
  "name": "City General Hospital",
  "location": "Toronto"
}
```

### Update a hospital

`PUT /hospitals/:id`

This route also requires valid `username` and `password` fields in the request body.

```json
{
  "username": "alex",
  "password": "secret123",
  "name": "Updated Hospital Name",
  "location": "Toronto"
}
```

### Delete a hospital

`DELETE /hospitals/:id`

This route requires valid `username` and `password` fields in the request body.

## Example requests

```bash
curl -X POST http://localhost:4000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex Smith","username":"alex","email":"alex@example.com","password":"secret123"}'

curl http://localhost:4000/hospitals

curl -X POST http://localhost:4000/hospitals \
  -H "Content-Type: application/json" \
  -d '{"username":"alex","password":"secret123","name":"City General Hospital","location":"Toronto"}'
```

## Project structure

```text
server.js                 Express application entry point
config/passport.js        Passport strategy configuration
middleware/               Request middleware
models/                   Mongoose model definitions
routers/                  Authentication and hospital routers
```

The modular MongoDB-based files under `config/`, `models/`, and `routers/` are included as supporting assignment structure. The current `server.js` uses in-memory arrays and does not connect to MongoDB.

## Available npm scripts

The project currently has no automated test script. Start the application directly with `node server.js`.