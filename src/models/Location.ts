import { Schema, model } from 'mongoose';

const LocationSchema = new Schema({
  name: { type: String, required: true },
});

export const Location = model('Location', LocationSchema);