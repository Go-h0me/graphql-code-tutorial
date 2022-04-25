const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User] #lay gia tri friends trong User
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: UsersResult #lay tat ca trong USer ,! bat buoc
    # users:[User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
    #nhan thong tin ve nguoi dung cu the
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = BRAZIL
  }
  
  input UpdateUsernameInput {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): User
  }

  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
    NGA
  }

  type UsersSuccessfulResult {
    users: [User!]!
  }

  type UsersErrorResult {
    message: String!
  }
  # UsersResult change [Users!]! but yes in here han

  union UsersResult = UsersSuccessfulResult | UsersErrorResult
`;

module.exports = { typeDefs };
