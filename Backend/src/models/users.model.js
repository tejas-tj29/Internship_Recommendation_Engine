import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // --- Step 1: Initial Signup Fields ---
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },

    
    age: {
      type: Number,
      
    },
    location: {
      type: String,
      trim: true
    },
    willingness_to_relocate: {
      type: Boolean,
      default: false
    },
    education: {
      type: String,
      
      enum: ['10th', '12th', 'ITI', 'Diploma', 'Bachelor', 'Master']
    },
    degree: {
      type: String,
      trim: true
    },
    skills: {
      type: [String],
      default: []
    },
    preferred_sectors: {
      type: [String],
      default: []
    },

   
    skillsVector: {
      type: [Number],
      select: false 
      
    }
  },
  {
    timestamps: true 
  }
);

const User = mongoose.model("User", userSchema);

export default User;