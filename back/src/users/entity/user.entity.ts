import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'USERS',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  address: string;
  // @OneToMany(@OneToMany(() => Orders, (order) => order.user))
  // order: Orders[]
  @Column()
  roles: string;
}
