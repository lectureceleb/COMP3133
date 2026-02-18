import { GraphQLError } from "graphql";
import Employee from "../models/Employee.js";

// This file will contain all GraphQL Resolvers
// Resolver performs the operations to complete types defined in typedefs

const employeeResolvers = {
  Query: {
    getEmployees : async () => {
      console.log(`Fetching all employees....`);
      const emps = await Employee.find({})

      if (!emps) {
        throw new GraphQLError("Employees not found", {
          extensions: {
            code: "EMPLOYEES_NOT_FOUND",
            field: 'all',
            http: {status : 400}
          }
        });
      }

      return emps
    }, // getEmployees
    getEmployeesByCity : async (_, args) => {
      if (!args.city){
        throw new GraphQLError("City parameter is required", {
          extensions: {
            code: "MISSING_CITY_PARAM",
            field: 'city',
            http: {status : 400}
          }
        });
      }

      console.log(`Fetching all employees by city....`);
      const emps = await Employee.find({ city: new RegExp(args.city, "i")})

      if (!emps){
        throw new GraphQLError("Employees not found", {
          extensions: {
            code: "EMPLOYEES_NOT_FOUND",
            field: 'all',
            http: {status : 400}
          }
        });
      }

      console.log(`${emps.length} matching employees found`);

      return emps
    }, // getEmployeesByCity
    getEmployeesByFirstname : async (_, args) => {
      if (!args.firstname){
        throw new GraphQLError("Firstname parameter is required", {
          extensions: {
            code: "MISSING_FIRSTNAME_PARAM",
            field: 'firstname',
            http: {status : 400}
          }
        });
      }

      console.log(`Fetching all employees by firstname....`);
      const emps = await Employee.find({ firstname: new RegExp(args.firstname, "i")})

      if (!emps){
        throw new GraphQLError("Employees not found", {
          extensions: {
            code: "EMPLOYEES_NOT_FOUND",
            field: 'all',
            http: {status : 400}
          }
        });
      }

      console.log(`${emps.length} matching employees found`);

      return emps
    }, // getEmployeesByFirstname
    getEmployeeById : async (_, args) => {
      if (!args.id){
        throw new GraphQLError("Id parameter is required", {
          extensions: {
            code: "MISSING_ID_PARAM",
            field: 'id',
            http: {status : 400}
          }
        });
      }

      console.log(`Fetching employees by id....`);
      const emps = await Employee.findById({ _id: args.id})

      if (!emps){
        throw new GraphQLError("Employees not found", {
          extensions: {
            code: "EMPLOYEES_NOT_FOUND",
            field: 'all',
            http: {status : 400}
          }
        });
      }

      console.log(`${emps.length} matching employees found`);

      return emps
    }, // getEmployeeById
  },
  Mutation: {
    addEmployee : async (_, args) => {
      if (!args.firstname || !args.lastname || !args.email || !args.gender || !args.city || !args.designation || !args.salary ){
        throw new GraphQLError("All parameters are required", {
          extensions: {
            code: "MISSING_PARAM",
            field: 'all',
            http: {status : 400}
          }
        });
      }

      console.log(`trying to inder employee with email ${args.email}`);

      let newEmp = new Employee({
        firstname : args.firstname,
        lastname: args.lastname,
        email: args.email,
        gender: args.gender,
        city: args.city,
        designation: args.designation,
        salary: args.salary,
      })

      const emps = await newEmp.save()

      if (!emps){
        throw new GraphQLError("Employees not inserted", {
          extensions: {
            code: "EMPLOYEES_NOT_INSERTED",
            field: 'new employee',
            http: {status : 400}
          }
        });
      }

      console.log(`${emps.length} employees added to database`);

      return emps
    },
    updateEmployee : async (_, args) => {
      if (!args.id || !args.city || !args.designation || !args.salary ){
        throw new GraphQLError("All parameters are required", {
          extensions: {
            code: "MISSING_PARAM",
            field: 'all',
            http: {status : 400}
          }
        });
      }

      console.log(`trying to update employee with id ${args.id}`);

      const emps = await Employee.findByIdAndUpdate(
          args.id,
          {
            city: args.city,
            designation: args.designation,
            salary: args.salary,
          },
          { new : false }
      )

      if (!emps){
        throw new GraphQLError("Employees not updated", {
          extensions: {
            code: "EMPLOYEES_NOT_UPDATED",
            field: 'id',
            http: {status : 400}
          }
        });
      }

      console.log(`Employees with email ${emps.email} updated in database. Id : ${emps.id}`);

      return emps
    },
    deleteEmployee : async (_, args) => {
      if (!args.id ){
        throw new GraphQLError("Id parameter is required", {
          extensions: {
            code: "MISSING_PARAM",
            field: 'id',
            http: {status : 400}
          }
        });
      }

      console.log(`trying to delete employee with id ${args.id}`);

      const emps = await Employee.findByIdAndDelete( args.id)

      if (!emps){
        throw new GraphQLError("Employees not deleted", {
          extensions: {
            code: "EMPLOYEES_NOT_DELETED",
            field: 'id',
            http: {status : 400}
          }
        });
      }

      console.log(`Employees with email ${emps.email} deleted from database. Id : ${emps.id}`);

      return emps
    }
  }, // Mutation
};

export default employeeResolvers;