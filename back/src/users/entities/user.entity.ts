import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'USERS'
})

export class User {
    @PrimaryGeneratedColumn()
    id: string
    @Column()
    name: string
    @Column()
    email: string
    @Column()
    password: string
    @Column()
    adress: string
    // @OneToMany(@OneToMany(() => Orders, (order) => order.user))
    // order: Orders[]
    @Column()
    roles: string
}
