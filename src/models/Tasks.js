import mongoose from 'mongoose';

const { Schema } = mongoose;
const ProjectTask = new Schema({
  description: { type: String, required: true },
});

export default mongoose.model('Task', ProjectTask);
