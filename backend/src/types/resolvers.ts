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
export interface IRemoveTagArgs {
  idea_id: string
  tag_id: string
}
export interface IAddIdeaToCollectionArgs {
  idea_id: number
  collection_id: number
}
export interface ILikeUnlikeIdeaArgs {
  idea_id: number
  user_id: number
}
export interface IFollowUserArgs {
  user_id: number
  follower_id: number
}
export interface ICommentIdeaArgs {
  user_id: number
  idea_id: number
  content: string
}
export interface IEditCommentArgs {
  comment_id: number
  content: string
}
export interface IDeleteCommentArgs {
  comment_id: number
}
