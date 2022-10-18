import mongoose from 'mongoose';

const { Schema } = mongoose;
const ProyectTask = new Schema({
  description: { type: String, required: true },
});

export default mongoose.model('Task', ProyectTask);
