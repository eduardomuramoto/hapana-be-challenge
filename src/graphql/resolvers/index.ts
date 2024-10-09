import { eventResolvers } from "./event";
import { locationResolvers } from "./location";

export const resolvers = [locationResolvers, eventResolvers];