import { Location } from '../../models/Location';
import { Event } from '../../models/Event';

export const locationResolvers = {
  Query: {
    getLocation: async (_: any, { id, name }: { id: string, name: string }) => {
      if(id) {
        return await Location.findById(id);
      }
      if(name) {
        let location = await Location.findOne({ name: { $regex: name, $options: 'i' } });
        if (!location) throw new Error('Location with this name does not exists');
        return location;
      }
      else{
        throw new Error('Location Id or Name is required to perform search');
      }
    },
    getLocations: async () => {
      return await Location.find();
    },
  },
  Mutation: {
    createLocation: async (_: any, { name, type, tags }: { name: string, type:"class" | "1-on-1" | "workshop",tags: string[] }) => {
      //Doesn't create if location exists
      const locationExists = await Location.findOne({ name });
      if (locationExists) throw new Error('Location with this name already exists');

      const location = new Location({ name, type,tags });
      return await location.save();
    },
    updateLocation: async (_: any, { id, name, type, tags }: { id: string, name: string, type: "class" | "1-on-1" | "workshop", tags : string[] }) => {
      const location = await Location.findById(id);
      if (!location) throw new Error('Location not found');

      location.name = name;
      location.type = type;
      location.tags = tags;

      return await location.save();
    },
    deleteLocation: async (_: any, { id }: { id: string }) => {
      // Check if the location is referenced in any event
      const isLocationUsed = await Event.findOne({ location: id });
      if (isLocationUsed) {
        throw new Error('Cannot delete location as it is being used in an event.');
      }
      
      const location = await Location.findById(id);
      if (!location) throw new Error('Location not found');

      await Location.findByIdAndDelete(id);
      return true;
    },
  },
};

