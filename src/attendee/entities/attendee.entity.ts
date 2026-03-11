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

    @Column({type: 'varchar', length: 255, unique: true,  nullable:true})
    email: string;

    @Column({type: 'varchar', length: 255, unique: true, nullable:false})
    phone: string;

    @Column({type: 'varchar', length: 255, nullable:false})
    residence: string;

    @Column({type:"boolean", nullable:true})
    firstTime: boolean; 
}
