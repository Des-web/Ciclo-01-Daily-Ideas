import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Comment from './Comment';
import Tag from './Tag';
import User from './User';

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

  @ManyToMany(() => User)
  @JoinTable({ name: 'idea_like' })
  likes!: User[]

  @OneToMany(() => Comment, comment => comment.idea)
  comments!: Comment[]
}
