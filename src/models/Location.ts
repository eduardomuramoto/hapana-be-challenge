import { Schema, model } from 'mongoose';

const LocationSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    match: /^[a-zA-Z0-9\- ]+$/,  // Location Name can only contain alphanumeric characters and '-' only
  },
  type: {
    type: String,
    required: true,
    enum: ['class', '1-on-1', 'workshop'],  // Location type should be one of the array
  },
},{ timestamps: true });

export const Location = model('Location', LocationSchema);