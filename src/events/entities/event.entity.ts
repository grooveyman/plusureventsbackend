import { Registration } from "../../registrations/entities/registration.entity";
import { Field } from "../../fields/entities/field.entity";
import { FormAccess } from "../../form_access/entities/form_access.entity";
import { Timestamp } from "../../helpers/timestamp.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum OnOffEnum{
    on = "1",
    off = "0"
}

@Entity({name:"events"})
export class Event extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;

    //event name
    @Column({type: "varchar"})
    name: string;

    @Column({type:"varchar"})
    location: string;

    @Column({type: "varchar", nullable: true})
    description: string;

    @Column({type:"boolean", default:false})
    hasGroup: boolean;

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
    @ManyToOne(() => User, (user) => user.events, {nullable: false})
    @JoinColumn({name: "user_id"})
    user: User;

    //event flyer
    @Column({ nullable: true})
    flyer: string;

    @Column({nullable: true})
    flyerPublicId: string;

    //
    @OneToMany(() => Field, (fields) => fields.event, {nullable: true})
    fields: Field[];

    //link to form access
    @OneToMany(() => FormAccess, (formaccess) => formaccess.event, {nullable: true})
    form_access: FormAccess[];
    
    //link to registration
    @OneToMany(() => Registration, (registration) => registration.event)
    registration:Registration;

}
