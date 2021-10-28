import { gql } from 'apollo-server-express'


const typeDefs = gql`
  type Query {
    getUsers: [User]!
    getIdeas: [Idea]!
    getUser(user_id: ID!): User
    getIdea(idea_id: ID!): Idea
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
    author: User!
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

  type Comment {
    id: ID!
    author: User!
    idea: Idea!
    content: String!
  }

  type Mutation {
    "Creates a User Profile"
    createProfile(name: String!, email: String!): User

    "Edits a User Profile"
    editProfile(user_id: ID!, name: String!, email: String!): User

    "Creates an Idea by an User"
    createIdea(title: String!, content: String!, author_id: ID!): Idea

    "Adds Tag to a Post"
    addTagToIdea(idea_id: ID!, name: String!): Idea

    "Removes a Tag from an Idea"
    removeTagFromIdea(idea_id: ID!, tag_id: ID!): Idea

    "Creates a Collection by an User"
    createCollection(name: String, description: String, author_id: ID!): Collection

    "Adds Idea to Collection"
    addIdeaToCollection(idea_id: ID!, collection_id: ID!): Collection

    "Adds/removes Likes to an Idea"
    likeUnlikeIdea(idea_id: ID!, user_id: ID!): Idea

    "Adds/removes User as Follower of another"
    followUser(user_id: ID!, follower_id: ID!): User

    "Add a Comment by an User on one Idea"
    commentIdea(user_id: ID!, idea_id: ID!, content: String!): Comment

    "Edit a Comment by an User on one Idea"
    editComment(comment_id: ID!, content: String!): Comment

    "Delete a Comment by an User on one Idea"
    deleteComment(comment_id: ID!): Comment
  }
`

export default typeDefs
