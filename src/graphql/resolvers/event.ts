import { ApolloError } from 'apollo-server-express';
import { Event } from '../../models/Event';
import { Location } from '../../models/Location';
import { eventValidationSchema } from '../../validation/event';

export const eventResolvers = {
  Query: {
    getEvent: async (_: any, { id }: { id: string }) => {
      return await Event.findById(id).populate('location');
    },
    getEvents: async (
      _: any,
      { name,locationName,locationId, sortBy = 'dateTime', sortDirection = 'asc', page = 1, pageSize = 10}: any
    ) => {
      const sortOptions: any = {};
      // Query by name
      let query : any = name
      ? { name: { $regex: name, $options: 'i' } }
      : {};

      sortOptions[sortBy] = sortDirection === 'asc' ? 1 : -1;
      // If locationId is provided, filter by it
      if (locationId) {
        query.location = locationId;
        return await Event.find(query).populate('location')
        .sort(sortOptions)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      }

      // If locationName is provided, find the corresponding location and filter by it
      if (locationName) {
        const location = await Location.findOne({ name: { $regex: locationName, $options: 'i' } });
        if (!location) throw new Error('Location not found');
        query.location = location.id;
      return await Event.find(query).populate('location')
        .sort(sortOptions)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      }

      // return await Event.find()
      //   .populate('location')
      //   .sort(sortOptions)
      //   .skip((page - 1) * pageSize)
      //   .limit(pageSize);
      else{
        throw new Error('Location is required to search for events');
      }
    },
    getUpcomingEvents: async (
      _: any,
      { name, locationId,locationName, sortBy = 'dateTime', sortDirection = 'asc', page = 1, pageSize = 10}: any
    ) => {
      const sortOptions: any = {};
      const currentDate = new Date();

      // Query by name
      let query : any = name
      ? { name: { $regex: name, $options: 'i' } }
      : {};
    
      sortOptions[sortBy] = sortDirection === 'asc' ? 1 : -1;

      // If locationId is provided, filter by it
      if (locationId) {
        query = { location: locationId ,dateTime: { $gte: currentDate }};
        return await Event.find(
          query
        ).populate('location')
        .sort(sortOptions)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      }
      
      // If locationName is provided, find the corresponding location and filter by it
      if (locationName) {
        const location = await Location.findOne({ name: { $regex: locationName, $options: 'i' } });
        if (!location) throw new Error('Location not found');
        query = { location: location.id ,dateTime: { $gte: currentDate }};

      return await Event.find(
          query
        ).populate('location')
        .sort(sortOptions)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      }
      else{
        throw new Error('Location is required to search for upcoming events');
      }
    },
  },
  Mutation: {
    createEvent: async (
      _: any,
      { name, dateTime, type, location, description, tags }: any
    ) => {
      // Validate input
      const { error } = eventValidationSchema.validate({ name, dateTime, type, location, description, tags }, { abortEarly: false });
      if (error) {
        throw new ApolloError(
          'Validation failed',
          'BAD_USER_INPUT',
          { validationErrors: error.details.map((err) => err.message) }
        );
      }
      // Check if location exists
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
      { id, name, dateTime, type, location,  description, tags }: any
    ) => {
      const event = await Event.findById(id);
      if (!event) throw new Error('Event not found');

      // Prevent updating past events
      if (new Date(event.dateTime) < new Date()) {
        throw new Error('Cannot update past events.');
      }

      // Prevent updating the location once the event is created, operation blocked on typedef too.
      if (location) {
        throw new Error('Location cannot be updated after event creation.');
      }

      event.name = name || event.name;
      event.dateTime = dateTime ? new Date(dateTime) : event.dateTime;
      event.type = type || event.type;
      event.description = description || event.description;
      event.tags = tags || event.tags;

      return await event.save();
    },
    deleteEvent: async (_: any, { id }: { id: string }) => {
      const event = await Event.findById(id);
      if (!event) throw new Error('Event not found');

      // Prevent deleting past events
      if (new Date(event.dateTime) < new Date()) {
        throw new Error('Cannot delete past events.');
      }

      await Event.findByIdAndDelete(id);
      return true;
    },
  },
};
