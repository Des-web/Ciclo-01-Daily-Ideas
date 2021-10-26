import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Tag')
export default class Tag {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string
}
