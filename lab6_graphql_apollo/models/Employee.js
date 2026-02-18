import mongoose from "mongoose";

const emailRegEx = /^\S+@\S+\.\S+$/;
const cityRegEx = /^[a-zA-Z\s]+$/;

//Create Schema
const EmployeeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please Enter First Name"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name must be at most 50 characters"],
    },
    lastname: {
      type: String,
      alias: "surname", //Familyname
      required: [true, "Please enter last name"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name must be at most 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      trim: true,
      lowercase: true,
      minlength: [5, "Email must be at least 5 characters"],
      maxlength: [100, "Email must be at most 100 characters"],
      match: [emailRegEx, "Email format is invalid."],
      unique: [true, "Duplicate Email Not allowed"],
    },
    gender: {
      type: String,
      required: [true, "Please select gender"],
      enum: {
        values: ["male", "female", "other"],
        message: "Gender must be one of: male, female, other",
      },
      lowercase: true,
    },
    city: {
      type: String,
      required: [true, "Please enter city"],
      trim: true,
      minlength: [2, "City must be at least 2 characters"],
      maxlength: [60, "City must be at most 60 characters"],
      match: [cityRegEx, "City name can only have letters and spaces"],
    },
    designation: {
      type: String,
      equired: [true, "Please enter designation"],
      trim: true,
      minlength: [2, "Designation must be at least 2 characters"],
      maxlength: [60, "Designation must be at most 60 characters"],
    },
    salary: {
      type: Number,
      default: 0.0,
      min: [0, "Salary must not be negative"],
      validate: {
        validator: (value) => Number.isFinite(value),
        message: "Salary must be a finite number",
      },
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt automatically
    versionKey: false, // remove __v
    strict: "throw", // throw error on unknown fields to avoid silent drops
  },
);

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
