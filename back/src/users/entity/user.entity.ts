import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity({
  name: 'USERS',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  address: string;

  // @OneToMany(@OneToMany(() => Orders, (order) => order.user))
  // order: Orders[]

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: ROLE;

  @Exclude()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
