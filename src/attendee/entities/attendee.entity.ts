import { Timestamp } from "../../helpers/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"attendees"})
export class Attendee extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    lastname: string;

    @Column({type: 'varchar', length: 255})
    firstname: string;

    @Column({type: 'varchar', length: 255, unique: true})
    email: string;

    @Column({type: 'varchar', length: 255})
    phone: string;

    @Column({type: 'varchar', length: 255})
    residence: string;
}
