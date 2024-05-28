# Product-manager

- RESTful API for product management with a model with the following fields:
  name, description, price, category.
- With routes for creating, reading, updating, and deleting products.
- Routes protected by JSON Web Tokens (JWT)

## Installation:

### Clone the repo from comand line:

```bash
$ git clone https://github.com/dmytro-chushko/product-manager.git
$ cd product-manager
```

### Install packeges:

```bash
$ npm i
```

## To run the project:

### To run with Docker:

1. Make sure you have an actual version of [Docker](https://www.docker.com/)
   installed on your computer. Download and install if it is necessary.
2. Configure `.env` file like described below
3. Staying in root directory build the docker images from command line:

```bash
$ docker-compose build
```

4. Run the project:

```bash
$ docker-compose up
```

5. You may change settings in `docker-compose.yml` file

### To run from your local machine:

1. Make sure you have a version of [Node.js](https://nodejs.org/en/download) not
   lower than 18.18.1 installed on your computer. Download and install if it is
   necessary.
2. Make sure you have [PostgreSQL](https://www.postgresql.org/) database.
   Download and install if it is necessary.
3. Configure `.env` files like described below
4. Being in the root directory run the application from the command line:

```bash
$ npm run start:dev
```

_*Navigate to the address in your browser http://localhost:8090/api/docs to see
the Swagger API documentation.*_

## Configuration of the `.env` files:

Create `.development.env` file in the root directory and set the next variables:

- PORT = application port
- DB_TYPE = `postgres`
- POSTGRES_HOST = database host
- POSTGRES_POR T= database port
- POSTGRES_USER = database user
- POSTGRES_PASSWORD= database password
- POSTGRES_DB = databasee name
- JWT_SECRET_KEY = secret key for JWT service
- TOKEN_EXP_IN = lifetime access token expiration 24h

## Technologies

### Base backend libraries

- **Framework**: NestJS
- **Validation**: Class Validator
- **ORM**: TypeORM
- **DB**: PostgreSQL
- **API Protocol**: REST(OpenAPISwagger)

### Environment:

- **Docker Compose**
