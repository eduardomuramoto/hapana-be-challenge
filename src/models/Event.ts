import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
  name: { type: String, required: true },
  dateTime: { type: Date, required: true },
  type: { type: String, required: true },
  location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
});

export const Event = model('Event', EventSchema);
