import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"events"})
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    
}
