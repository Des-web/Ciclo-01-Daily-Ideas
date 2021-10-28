import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import Idea from './Idea'

@Entity('Tag')
export default class Tag {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @ManyToMany(() => Idea)
  @JoinTable({ name: 'idea_tag' })
  ideas!: Idea[]
}
