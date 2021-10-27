// Query Interfaces
export interface IGetUserArgs {
  user_id: number
}
export interface IGetIdeaArgs {
  idea_id: number
}

// Mutation Interfaces
export interface ICreateProfileArgs {
  name: string
  email: string
}
export interface ICreateIdeaArgs {
  title: string
  content: string
  author_id: number
}
export interface ICreateCollectionArgs {
  name: string
  description: string
  author_id: number
}
export interface IEditProfileArgs {
  user_id: number
  name?: string
  email?: string
}
export interface IAddTagArgs {
  idea_id: number
  name: string
}
export interface IAddIdeaToCollection {
  idea_id: number
  collection_id: number
}
export interface ILikeUnlikeIdea {
  idea_id: number
  user_id: number
}
