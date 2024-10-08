# Hapana Back-end Challenge

## What MUST be used

- [MongoDB][mongodb-url], using [mongoose][mongoose-url].
- [GraphQL][graphql-url], using [Apollo GraphQL][apollo-graphql-url].
- Javascript, Typescript is a plus but not required.

## What is NOT allowed

- No big frameworks such as Next.js, Nest, Meteor and such.

## The test

Create a basic event management system (no need to implement a user system) where you can create, update, delete, view and list locations and events.

### Data Structure

- Locations should have a `name`.
- Each event should have:
  - `name`
  - `date/time`
  - `type`
  - `location`
  - `description`
  - `tags`

### Requirements

- The application should allow the querying of upcoming events by location;
- The location of an event should not be updatable after it's been created;
- An event cannot be updated or deleted after the date/time passed;
- Metadata such as created and updated date should be stored and be available to query;
- The listing endpoints should:
  - Require a Location;
  - Be sortable by date/time and name both ways (ascending and descending);
  - Be paginated;
  - Be searchable by `name`.
- The Location type should one of:
  - `class`
  - `1-on-1`
  - `workshop`
- Locations should be previously created and referenced in the events by their ID field.
- All Location fields are required except `tags`.
- The Location `name` field should accept:
  - Alphanumerical characters;
  - Only `-` as a special character.
 
### What is NOT required
- No UI is needed. Showing the mutations and query usages through Apollo Studio is what we are looking for.

## Tip

Though not required, it is strongly advised that you create a developer diary for the task including any relevant details, questions that you might have about the requirements, how you got around issues, the decisions you made etc.

If you dont't know a particular tech that is required, **be honest** and mention about it on the above.

Do your best and have fun!

[mongodb-url]: https://www.mongodb.com/
[mongoose-url]: https://mongoosejs.com/
[graphql-url]: https://graphql.org/
[apollo-graphql-url]: https://www.apollographql.com/