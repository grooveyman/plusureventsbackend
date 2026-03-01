import { Timestamp } from "src/helpers/timestamp.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"events"})
export class Event extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;

    //event name
    @Column({type: "varchar"})
    name: string;

    //start and end date
    @CreateDateColumn()
    start_date: string;

    @CreateDateColumn()
    end_date: string;

    //expiry date
    @CreateDateColumn()
    expiry_date: string;

    //number of expected participants
    @Column({type:"int"})
    expect_attendees: number;

    //created by
    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn({name: "user_id"})
    user: User;

    //event flyer
    @Column({ nullable: true})
    flyer: string;

    @Column({nullable: true})
    flyerPublicId: string;

    //

}
