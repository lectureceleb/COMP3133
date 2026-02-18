# Steps
## Install Packages

npm i @apollo/server @as-integrations/express5 graphql graphql-tag cors dotenv express mongoose

npm install -D nodemon


# References

https://www.apollographql.com/docs/apollo-server/getting-started

https://medium.com/better-programming/a-simple-crud-app-using-graphql-nodejs-mongodb-78319908f563

https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

# Sample Queries

### 1. Query all employees

query{
  getEmployees { 
    id
    firstname 
    lastname 
    city 
    designation 
  }
}


### 2. Query employees by city

query{
  getEmployeesByCity(city: "toronto") {
    firstname
    email
    city
  }
}

### 3. Query employees by id

query{
  getEmployeeById(id: "6996216eabea70348f2937b8") {
    id
    firstname
    email
    city
  }
}

### 4. Running multiple queries - get employee by firstname and city

query {
  getEmployeesByFirstname(firstname: "alex") {
    id
    firstname
    email
    city
  }

  getEmployeesByCity(city: "toronto") {
    id
    firstname
    email
    city
  }
}

### 5. Mutation to add a new employee

mutation {
  addEmployee(
    firstname: "Alex", 
    lastname: "Smith", 
    email: "alex.smith@gmail.com", 
    gender: "Male", 
    city: "Hurontorio",
    designation: "System Analyst", 
    salary: 1234.90) {
      id
      firstname
      lastname
      email
      gender
      city
      designation
      salary
    }
}


### 6. Mutation to update an employee

mutation {
  updateEmployee(
    id: "6995f24fb5817b4470365a95",
    firstname: "Alex", 
    lastname: "Smith", 
    gender: "Male", 
    city: "Mississauga",
    designation: "Senior System Analyst", 
    salary: 3986.2) {
      firstname
      lastname
      gender
      email
      city
      designation
      salary
    }
}

### 7. Mutation to delete a movie

mutation {
  deleteEmployee(id: "6995f24fb5817b4470365a95") {
    id
    firstname
    lastname
    email
    gender
    city
    designation
    salary
  }
}
