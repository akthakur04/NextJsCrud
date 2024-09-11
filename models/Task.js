import mongoose from 'mongoose';
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { 
  timestamps: true,
  bufferCommands: false, // Disable mongoose command buffering
  autoIndex: false       // Optional: if you want to avoid creating indexes in every instance
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);
export default Task;


