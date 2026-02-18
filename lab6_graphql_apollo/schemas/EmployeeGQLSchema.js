// This file will contain all GraphQL types such as queries, mutation, model
import { gql } from 'graphql-tag';

const employeeSchema = gql`
  # object type - represents the model
    type Employee {
    id: String!
    firstname: String!
    lastname: String!
    email: String!
    gender: String!
    city: String!
    designation: String!
    salary: Float!
  }
  
  # query type - retrieve operations from database
  
  type Query {
    getEmployees : [Employee]
    getEmployeesByCity(city: String!) : [Employee]
    getEmployeesByFirstname(firstname: String!) : [Employee]
    getEmployeeById(id: String!) : Employee
  }
  
  # Mutation type - Modify operations on database such as insert, update, delete
  
  type Mutation {
    addEmployee(
      firstname: String!
      lastname: String!
      email: String!
      gender: String!
      city: String!
      designation: String!
      salary: Float!
    ) : Employee
    
    # Can choose what you want to be updated here
    updateEmployee(
      id: String!
      city: String!
      designation: String!
      salary: Float!      
    ) : Employee
    
    deleteEmployee(id : String!): Employee
  }
    
`;

export default employeeSchema;


