import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Idea from './Idea'
import User from './User'

@Entity('Collection')
export default class Collection {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column('text', { nullable: true })
  description!: string

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @ManyToOne(() => User, user => user.collections, {
    nullable: false
  })
  owner!: User;

  @ManyToMany(() => Idea)
  @JoinTable({ name: 'collection_idea' })
  ideas!: Idea[]
}
