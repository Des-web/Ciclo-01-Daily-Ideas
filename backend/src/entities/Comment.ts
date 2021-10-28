import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Idea from './Idea'
import User from './User'

@Entity('Comment')
class Comment {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text')
  content!: string

  @ManyToOne(() => User, user => user.comments, {
    nullable: false
  })
  author!: User

  @ManyToOne(() => Idea, idea => idea.comments, {
    nullable: false
  })
  idea!: Idea

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date
}

export default Comment
