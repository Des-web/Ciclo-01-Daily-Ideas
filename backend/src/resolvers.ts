import { getCustomRepository } from "typeorm"
import UserRepository from "./repositories/UserRepository"
import IdeaRepository from "./repositories/IdeaRepository"
import CollectionRepository from "./repositories/CollectionRepository"
import TagRepository from "./repositories/TagRepository"
import User from "./entities/User"
import Idea from "./entities/Idea"

const userRepository = getCustomRepository(UserRepository)
const ideaRepository = getCustomRepository(IdeaRepository)
const collectionRepository = getCustomRepository(CollectionRepository)
const tagRepository = getCustomRepository(TagRepository)

interface ICreateProfileArgs {
  name: string
  email: string
}

interface ICreateIdeaArgs {
  title: string
  content: string
  author_id: number
}

interface ICreateCollectionArgs {
  name: string
  description: string
  author_id: number
}

interface IEditProfileArgs {
  user_id: number
  name?: string
  email?: string
}

interface IAddTagArgs {
  idea_id: number
  name: string
}

const resolvers = {
  Query: {
    getUsers: async () => {
      const users = await userRepository.find()
      return users
    }
  },

  Mutation: {
    // (parent, args, context, info) => {}
    createProfile: async (_: any, { name, email }: ICreateProfileArgs) => {
      const user = userRepository.create({
        name,
        email,
      })
      await userRepository.save(user)
      return user
    },

    editProfile: async (_: any, {
      user_id,
      name,
      email
    }: IEditProfileArgs) => {
      const user = await userRepository.findOne(user_id)
      user!.name = name ? name : user!.name
      user!.email = email ? email : user!.email
      
      await userRepository.save(user as User)
      return user
    },

    createIdea: async (_: any, {
      title,
      content,
      author_id
    }: ICreateIdeaArgs) => {
      const user = await userRepository.findOne(author_id)
      const idea = ideaRepository.create({
        title,
        content,
      })
      idea.author = user as User
      await ideaRepository.save(idea)
      return idea
    },

    createCollection: async (_: any, {
      name,
      description,
      author_id
    }: ICreateCollectionArgs) => {
      console.log(name)
      console.log(description)
      console.log(author_id)
      const user = await userRepository.findOne(author_id)
      const collection = collectionRepository.create({
        name,
        description,
      })
      collection.owner = user as User
      await collectionRepository.save(collection)
      return collection
    },

    addTagToIdea: async (_: any, { idea_id, name }: IAddTagArgs) => {
      const idea = await ideaRepository.findOne(idea_id)
      let tag = await tagRepository.findOne({
        where: {
          name
        }
      })

      if(!tag) {
        tag = tagRepository.create({
          name
        })
      }

      const oldTags = idea?.tags
      if(oldTags && oldTags.includes(tag)) {
        return idea
      }
      idea!.tags = oldTags ? [...oldTags, tag] : [tag]

      await ideaRepository.save(idea as Idea)
      await tagRepository.save(tag)
      return idea
    }
  }
}

export default resolvers
