import { Timestamp } from "../../helpers/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"attendee_groups"})
export class AttendeeGroup extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar", nullable: false})
    name: string;

    @Column({type: 'varchar', nullable:false})
    address: string;

    @Column({type:'varchar', nullable:false})
    contact_person_name: string;

    @Column({type:'varchar', nullable: false})
    contact_person_phone: string;

    @Column({type:'varchar', nullable: true})
    contact_person_email: string;

    @Column({type:'int', nullable: false})
    number_heads: number;



}
