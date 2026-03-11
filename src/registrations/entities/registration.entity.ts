import { Event } from "../../events/entities/event.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"registrations"})
export class Registration {
    @PrimaryGeneratedColumn()
    id: number;

    //link to event
    @ManyToOne(() => Event, (event) => event.registration)
    @JoinColumn({name:'event_id'})
    event: Event;

    @Column({type:'jsonb'})
    responses: Record<string, string>;
}
