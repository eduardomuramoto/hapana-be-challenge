import { Event } from '../../models/Event';
import { Location } from '../../models/Location';

export const eventResolvers = {
  Query: {
    getEvent: async (_: any, { id }: { id: string }) => {
      return await Event.findById(id).populate('location');
    },
    getEvents: async () => {
      return await Event.find().populate('location');
    },
  },
  Mutation: {
    createEvent: async (
      _: any,
      { name, dateTime, type, location, description, tags }: any
    ) => {
      const locationExists = await Location.findById(location);
      if (!locationExists) throw new Error('Location not found');
      
      const event = new Event({
        name,
        dateTime: new Date(dateTime),
        type,
        location,
        description,
        tags,
      });
      return await event.save();
    },
    updateEvent: async (
      _: any,
      { id, name, dateTime, type, location, description, tags }: any
    ) => {
      const event = await Event.findById(id);
      if (!event) throw new Error('Event not found');
      
      if (location) {
        const locationExists = await Location.findById(location);
        if (!locationExists) throw new Error('Location not found');
      }

      event.name = name || event.name;
      event.dateTime = dateTime ? new Date(dateTime) : event.dateTime;
      event.type = type || event.type;
      event.location = location || event.location;
      event.description = description || event.description;
      event.tags = tags || event.tags;

      return await event.save();
    },
    deleteEvent: async (_: any, { id }: { id: string }) => {
      await Event.findByIdAndDelete(id);
      return true;
    },
  },
};
