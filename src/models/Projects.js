import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProjectSchemas = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: false },
  clientName: { type: String, required: true },
  employees: [
    {
      role: { type: String, required: true, enum: ['DEV', 'QA', 'TL', 'PM'] },
      rate: { type: Number, required: true },
    }],
});

export default mongoose.model('Projects', ProjectSchemas);
