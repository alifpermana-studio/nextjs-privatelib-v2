import mongoose from 'mongoose';
const { Schema } = mongoose;

const imageKitSchema = new Schema({
  fileName: String, // String is shorthand for {type: String}
  category: String,
});

module.exports = mongoose.models.IK_Collection || mongoose.model('IK_Collection', imageKitSchema) 