import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export type SwipeEntry = {
  pokemonId: number;
  name: string;
  joke: string;
};

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'json', default: '[]' })
  likes: SwipeEntry[];

  @Column({ type: 'json', default: '[]' })
  dislikes: SwipeEntry[];

  @CreateDateColumn()
  createdAt: Date;
}
