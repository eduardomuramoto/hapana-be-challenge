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
    createLocation: async (_: any, { name }: { name: string }) => {
      const location = new Location({ name });
      return await location.save();
    },
    updateLocation: async (_: any, { id, name }: { id: string; name: string }) => {
      return await Location.findByIdAndUpdate(id, { name }, { new: true });
    },
    deleteLocation: async (_: any, { id }: { id: string }) => {
      await Location.findByIdAndDelete(id);
      return true;
    },
  },
};
