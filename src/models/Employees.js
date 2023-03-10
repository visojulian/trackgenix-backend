import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeesSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  firebaseUid: { type: String, required: true },
});

export default mongoose.model('Employees', employeesSchema);
