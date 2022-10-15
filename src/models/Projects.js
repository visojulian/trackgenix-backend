import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProjectSchemas = new Schema({
  name: { type: String },
  description: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  clientName: { type: String },
  employees: [
    {
      name: { type: String },
      role: { type: String, enum: ['DEV', 'QA', 'TL', 'PM'] },
      rate: { type: Number },
    }],
});

export default mongoose.model('Projects', ProjectSchemas);
