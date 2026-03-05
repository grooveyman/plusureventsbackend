import { Event } from "src/events/entities/event.entity";
import { Timestamp } from "src/helpers/timestamp.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"form_access"})
export class FormAccess extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar"})
    token: string;

    //link to events
    @ManyToOne(() => Event, (event) => event.form_access)
    @JoinColumn({name:"event_id"})
    event: Event;

}
