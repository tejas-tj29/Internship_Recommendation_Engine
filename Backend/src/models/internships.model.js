import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
      trim: true
    },
    sector: {
      type: String,
      required: true,
      trim: true
    },
    job_title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true 
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: Number,
      required: true,
      enum: [2, 9] 
    },
    stipend: {
      type: Number,
      required: true,
      default: 9000 
    },
    required_education: {
      type: String,
      required: true,
      enum: ['10th', '12th', 'ITI', 'Diploma', 'Bachelor', 'Master']
    },
    required_skills: {
      type: [String],
      default: []
    },
    open_positions: {
      type: Number,
      required: true,
      min: 1
    },
    
    
    descriptionVector: {
      type: [Number],
      select: false 
    }
  },
  {
    timestamps: true 
  }
);

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;