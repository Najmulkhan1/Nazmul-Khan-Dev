import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide sender name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide sender email.'],
    trim: true,
  },
  subject: {
    type: String,
    default: 'Project Inquiry',
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Please provide message content.'],
    trim: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
