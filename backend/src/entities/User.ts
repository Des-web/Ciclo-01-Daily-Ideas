import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Collection from './Collection'
import Comment from './Comment'
import Idea from './Idea'

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

  @OneToMany(() => Comment, comment => comment.author)
  comments!: Comment[]
}
