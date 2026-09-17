import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Please provide a unique string identifier for the project.'],
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for the project.'],
  },
  images: {
    type: [String],
    default: [],
  },
  videos: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  technologies: {
    type: [String],
    default: [],
  },
  liveLink: {
    type: String,
    required: false,
  },
  githubLink: {
    type: String,
    required: false,
  },
  challenges: {
    type: [String],
    default: [],
  },
  improvements: {
    type: [String],
    default: [],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "Full Stack Architect",
  },
  timeline: {
    type: String,
    default: "2025 Production",
  },
  deployment: {
    type: String,
    default: "Docker & VPS",
  },
  archClient: {
    type: String,
    default: "Next.js / React SSR",
  },
  archServer: {
    type: String,
    default: "Node / Express API",
  },
  archDb: {
    type: String,
    default: "MongoDB & Redis",
  },
}, { timestamps: true });

// Clear mongoose cache for hot reloading
delete mongoose.models.Project;

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
