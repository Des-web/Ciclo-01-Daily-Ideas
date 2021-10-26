import { gql } from 'apollo-server-express'


const typeDefs = gql`
  type Query {
    getUsers: [User]!
  }

  "A User represents one's account"
  type User {
    id: ID!
    name: String!
    email: String!
    saved_ideas: [Idea]!
    collections: [Collection]
    followers: [User]!
  }

  "An Idea is one idea post created by a User"
  type Idea {
    id: ID!
    title: String!
    content: String!
    created_at: String
    updated_at: String
    tags: [Tag]!
    author: User
    likes: [User]!
  }

  "A Tag is a way to mark or categorize an Idea"
  type Tag {
    id: ID!
    name: String!
  }

  "A Collection is a group of Ideas created by one User"
  type Collection {
    id: ID!
    name: String
    description: String
    created_at: String
    updated_at: String
    ideas: [Idea]!
    owner: User!
  }

  type Mutation {
    "Creates a User Profile"
    createProfile(name: String, email: String): User

    "Edits a User Profile"
    editProfile(user_id: ID, name: String, email: String): User

    "Creates an Idea by an User"
    createIdea(title: String, content: String, author_id: ID): Idea

    "Creates a Collection by an User"
    createCollection(name: String, description: String, author_id: ID): Collection

    addTagToIdea(idea_id: ID, name: String): Idea
  }
`

export default typeDefs
