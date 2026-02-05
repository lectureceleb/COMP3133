const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String, // Mandatory field
    required: true,
    trime: true   // Removes whitespace from after the first name
  },
  lastname: {
    type: String,
    alias: 'surname', // "Nickname" for last name; only for use in the app, not database
    required: [true, "Last cannot be empty"], // Error message if validation fails
    trime: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 5,
    maxlength: 50,
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
    lowercase: true
  },
  city:{
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: Number,
    required: true,
    default: 0.0,
    validate: function(value) {
      if (value < 0) {
        throw new Error("Salaries cannot be negative.")
      }
    }
  },
  createdOn: { 
    type: Date,
    default: Date.now
  },
  updatedOn: { 
    type: Date,
    default: Date.now
  },
});

// Declare Virtual Fields
EmployeeSchema.virtual("fullname")
  .get(function() {
    return `${this.firstname} ${this.lastname}`
  })
  .set(function(value) {
    // Optionally - Split strings to assign to firstname and lastname
    console.log("Full an e set: ", value);
  })


// Custom Schema Methods
// 1) Instance Method Declaration
EmployeeSchema.methods.getFullName = function() {
  return `${this.firstname} ${this.lastname}`
}

EmployeeSchema.methods.getFormattedSalary = function() {
  return `CAD ${this.salary}`
}


// 2) Static method declaration
EmployeeSchema.static("getEmployeeByFirstName", function(name) {
  return this.find({firstname : new RegExp(name, 'i')})
})


// Writing Query Helpers
EmployeeSchema.query.byFirstName = function(fname) {
  return this.where({firstname : new RegExp(fname, 'i')})
}


//Pre middleware
EmployeeSchema.pre('save', function(){
  console.log("PRE - Save")

  let now = Date.now()
  this.updatedOn = now

  // Set a value for createdOn only if it is null
  if (!this.createdOn) {
    this.createdOn = now
  }

  console.log('PRE - SAVE - doc', this);
});

EmployeeSchema.pre('findOneAndUpdate', function(){
  console.log("PRE - findOneAndUpdate")

  let now = Date.now()
  this.updatedOn = now

  console.log(`PRE - findOneAndUpdate - doc updated on : ${this.updatedOn}`)
});

//Post middleware
EmployeeSchema.post('init', (doc) => {
  console.log('POST - init - %s has been initialized from the db', doc._id);
});

EmployeeSchema.post('validate', (doc) => {
  console.log('POST - validate - %s has been validated (but not saved yet)', doc._id);
});

EmployeeSchema.post('save', (doc) => {
  console.log('POST - save - %s has been saved', doc._id);
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;