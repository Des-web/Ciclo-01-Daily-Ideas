import { getCustomRepository } from "typeorm"
import UserRepository from "./repositories/UserRepository"
import IdeaRepository from "./repositories/IdeaRepository"
import CollectionRepository from "./repositories/CollectionRepository"
import TagRepository from "./repositories/TagRepository"
import CommentRepository from "./repositories/CommentRepository"
import User from "./entities/User"
import Tag from "./entities/Tag"
import Idea from "./entities/Idea"
import Collection from "./entities/Collection"

import { 
  IGetUserArgs,
  IGetIdeaArgs,
  ICreateProfileArgs,
  IEditProfileArgs,
  ICreateIdeaArgs,
  IAddTagArgs,
  IRemoveTagArgs,
  ICreateCollectionArgs,
  IAddIdeaToCollectionArgs,
  ILikeUnlikeIdeaArgs,
  IFollowUserArgs,
  ICommentIdeaArgs,
  IEditCommentArgs,
  IDeleteCommentArgs,
} from "./types/resolvers"

const userRepository = getCustomRepository(UserRepository)
const ideaRepository = getCustomRepository(IdeaRepository)
const collectionRepository = getCustomRepository(CollectionRepository)
const tagRepository = getCustomRepository(TagRepository)
const commentRepository = getCustomRepository(CommentRepository)

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
    createProfile: async (_: any, {
      name,
      email
    }: ICreateProfileArgs) => {
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

    addTagToIdea: async (_: any, {
      idea_id,
      name
    }: IAddTagArgs) => {
      let upperCaseName = name.toUpperCase()
      const idea = await ideaRepository.findOne(idea_id, {
        relations: ['tags']
      })

      if(!idea) return

      let tag = await tagRepository.findOne({
        where: {
          name: upperCaseName
        },
        relations: ['ideas']
      })

      if(!tag) {
        tag = tagRepository.create({
          name: upperCaseName
        })
        await tagRepository.save(tag)
      }

      const tags = idea.tags
      const tagAlreadyIncluded = tags.find(item => item.id === tag!.id)
      idea.tags = tagAlreadyIncluded ? tags : [...tags, tag]

      await ideaRepository.save(idea as Idea)
      return idea
    },

    removeTagFromIdea: async (_: any, {
      idea_id,
      tag_id,
    }: IRemoveTagArgs) => {
      const idea = await ideaRepository.findOne(idea_id, {
        relations: ['tags']
      })

      let tag = await tagRepository.findOne(tag_id, {
        relations: ['ideas']
      })
      
      if(!idea || !tag) return

      idea.tags = idea.tags.filter(item => item.id !== tag!.id)
      await ideaRepository.save(idea)

      tag = await tagRepository.findOne(tag_id, {
        relations: ['ideas']
      })
      
      if(tag!.ideas.length === 0) {
        tagRepository.remove(tag as Tag)
      }
      
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
    }: IAddIdeaToCollectionArgs) => {
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
    }: ILikeUnlikeIdeaArgs) => {
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
    },

    followUser: async (_: any, {
      user_id,
      follower_id
    }: IFollowUserArgs) => {
      const user = await userRepository.findOne(user_id, {
        relations: ['followers']
      })
      const follower = await userRepository.findOne(follower_id)

      if(!user || !follower) {
        return
      }

      const followers = user.followers
      if(followers) {
        const followerIndex = followers.findIndex(item => item.id === follower.id)

        // Adds follower to array or removes it if already exists 
        if(followerIndex === -1) {
          user.followers = [...followers, follower]
        } else {
          user.followers.splice(followerIndex)
        }
        
      } else {
        user.followers = [follower]
      }

      await userRepository.save(user)
      return user
    },

    commentIdea: async (_: any, {
      user_id,
      idea_id,
      content
    } :ICommentIdeaArgs) => {
      const user = await userRepository.findOne(user_id)
      const idea = await ideaRepository.findOne(idea_id)

      if(!user || !idea) {
        return
      }

      const comment = commentRepository.create({
        author: user,
        idea: idea,
        content
      })

      await commentRepository.save(comment)
      return comment
    },

    editComment: async (_: any, {
      comment_id,
      content
    }: IEditCommentArgs) => {
      const comment = await commentRepository.findOne(comment_id) 

      if(!comment) {
        return
      }

      comment.content = content
      await commentRepository.save(comment)
      return comment
    },

    deleteComment: async(_: any, {
      comment_id
    }: IDeleteCommentArgs) => {
      const comment = await commentRepository.findOne(comment_id)
      if(comment) {
        await commentRepository.delete(comment.id)
      }
      return
    },
  }
}

export default resolvers
