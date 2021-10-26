import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Tag from './Tag';
import User from './User';
import UserSavedIdea from './UserSavedIdea';

@Entity('Idea')
export default class Idea {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column('text')
  content!: string

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @ManyToOne(() => User, user => user.created_ideas, {
    nullable: false
  })
  author!: User;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({ name: 'idea_tag' })
  tags!: Tag[]

  @OneToMany(() => UserSavedIdea, savedIdea => savedIdea.idea)
  saved_by!:  UserSavedIdea[]

  @ManyToMany(() => User)
  @JoinTable({ name: 'idea_like' })
  likes!: User[]
}
