import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import Idea from './Idea'
import User from './User'

@Entity('user_saved_idea')
export default class UserSavedIdea {  
  @ManyToOne(() => User, user => user.saved_ideas, {
    nullable: false,
    primary: true
  })
  user!: User

  @ManyToOne(() => Idea, idea => idea.saved_by, {
    nullable: false,
    primary: true
  })
  idea!: Idea

  @CreateDateColumn()
  created_at!: Date
}