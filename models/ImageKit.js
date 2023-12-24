import mongoose from 'mongoose';
const { Schema } = mongoose;

const imageKitSchema = new Schema({
  fileName: String, // String is shorthand for {type: String}
  uploadDate: String,
  permalink:String,
  tags:Array,
});

module.exports = mongoose.models.ImageKit_Lib || mongoose.model('ImageKit_Lib', imageKitSchema) 