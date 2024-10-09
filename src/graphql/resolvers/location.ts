import { Location } from '../../models/Location';

export const locationResolvers = {
  Query: {
    getLocation: async (_: any, { id }: { id: string }) => {
      return await Location.findById(id);
    },
    getLocations: async () => {
      return await Location.find();
    },
  },
  Mutation: {
    createLocation: async (_: any, { name, type }: { name: string, type:"class" | "1-on-1" | "workshop" }) => {
      //Doesn't create if location exists
      const locationExists = await Location.findOne({ name });
      if (locationExists) throw new Error('Location with this name already exists');

      const location = new Location({ name, type });
      return await location.save();
    },
    updateLocation: async (_: any, { id, name, type }: { id: string, name: string, type: "class" | "1-on-1" | "workshop" }) => {
      const location = await Location.findById(id);
      if (!location) throw new Error('Location not found');

      location.name = name;
      location.type = type;

      return await location.save();
    },
    deleteLocation: async (_: any, { id }: { id: string }) => {
      const location = await Location.findById(id);
      if (!location) throw new Error('Location not found');

      await Location.findByIdAndDelete(id);
      return true;
    },
  },
};

