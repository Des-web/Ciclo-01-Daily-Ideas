import { getCustomRepository } from "typeorm"
import UserRepository from "./repositories/UserRepository"
import IdeaRepository from "./repositories/IdeaRepository"
import CollectionRepository from "./repositories/CollectionRepository"
import TagRepository from "./repositories/TagRepository"
import User from "./entities/User"
import Idea from "./entities/Idea"
import Collection from "./entities/Collection"

import { 
  IGetUserArgs,
  IGetIdeaArgs,
  ICreateProfileArgs,
  IEditProfileArgs,
  ICreateIdeaArgs,
  IAddTagArgs,
  ICreateCollectionArgs,
  IAddIdeaToCollection,
  ILikeUnlikeIdea,
} from "./types/resolvers"

const userRepository = getCustomRepository(UserRepository)
const ideaRepository = getCustomRepository(IdeaRepository)
const collectionRepository = getCustomRepository(CollectionRepository)
const tagRepository = getCustomRepository(TagRepository)

const resolvers = {
  Query: {
    getUsers: async () => {
      const users = await userRepository.find()
      return users
    },

    getUser: async (_: any, { user_id }: IGetUserArgs) => {
      const user = await userRepository.findOne(user_id)
      return user
    },

    getIdea: async (_: any, { idea_id }: IGetIdeaArgs) => {
      const idea = await ideaRepository.findOne(idea_id)
      return idea
    },
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

    addTagToIdea: async (_: any, { idea_id, name }: IAddTagArgs) => {
      const idea = await ideaRepository.findOne(idea_id, {
        relations: ['tags']
      })

      if(!idea) return

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

      const tags = idea.tags
      if(tags) {
        const tagAlreadyIncluded = tags.find(item => item.id === tag!.id)
        idea.tags = tagAlreadyIncluded ? tags : [...tags, tag]

      } else {
        idea.tags = [tag]
      }

      await ideaRepository.save(idea as Idea)
      await tagRepository.save(tag)

      return idea
    },

    createCollection: async (_: any, {
      name,
      description,
      author_id
    }: ICreateCollectionArgs) => {
      const user = await userRepository.findOne(author_id)
      const collection = collectionRepository.create({
        name,
        description,
        owner: user
      })
      await collectionRepository.save(collection)
      return collection
    },

    addIdeaToCollection: async(_: any, {
      idea_id,
      collection_id
    }: IAddIdeaToCollection) => {
      const collection = await collectionRepository.findOne(collection_id, {
        relations: ['ideas']
      })
      const idea = await ideaRepository.findOne(idea_id)

      if(!idea || !collection) {
        return
      }
      
      const ideas = collection.ideas
      if(ideas) {
        const ideaAlreadyIncluded = ideas.find(element => element.id === idea.id)
        collection.ideas = ideaAlreadyIncluded ? ideas : [...ideas, idea]

      } else {
        collection.ideas = [idea]
      }

      await collectionRepository.save(collection as Collection)
      return collection
    },

    likeUnlikeIdea: async (_: any, {
      idea_id,
      user_id
    }: ILikeUnlikeIdea) => {
      const idea = await ideaRepository.findOne(idea_id, {
        relations: ['likes']
      })
      const user = await userRepository.findOne(user_id)
      
      if(!idea || !user) {
        return
      }

      const likes = idea.likes
      if(likes) {
        const userIndex = likes.findIndex(item => item.id === user.id)
        
        // Adds user to array or removes it if already exists 
        if(userIndex === -1) {
          idea.likes = [...likes, user]
        } else {
          idea.likes.splice(userIndex)
        }
      } else {
        idea.likes = [user]
      }

      await ideaRepository.save(idea)
      return idea
    }
  }
}

export default resolvers