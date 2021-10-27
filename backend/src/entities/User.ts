import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Collection from './Collection'
import Idea from './Idea'
import UserSavedIdea from './UserSavedIdea'

@Entity('User')
export default class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  email!: string

  @OneToMany(() => Idea, idea => idea.author)
  created_ideas!: Idea[]

  @ManyToMany(() => Idea)

  @OneToMany(() => UserSavedIdea, savedIdea => savedIdea.user)
  saved_ideas!:  UserSavedIdea[]

  @OneToMany(() => Collection, collection => collection.owner)
  collections!: Collection[]

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_follower',
    joinColumn: {
      name: "userId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "followerId",
        referencedColumnName: "id"
    }
  })
  followers!: User[]
}
