const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: 4,
    maxlength: 100,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "This email already exists"],
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"]
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
    match: [/^[a-zA-Z\s]*$/, "City can only contain letters and spaces"]
  },
  website: {
    type: String,
    required: [true, "Website is required"],
    trim: true,
    match: [/^https?:\/\/.*/, "Please enter a valid website"],
  },
  zipcode: {
    type: String,
    required: [true, "Zip Code is required"],
    trim: true,
    match: [/^\d{5}-\d{4}$/, "Zip code must be in '12345-1234' format."]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    match: [/^\d-\d{3}-\d{3}-\d{4}$/, "Phone number must be in '1-123-123-1234' format."]
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;