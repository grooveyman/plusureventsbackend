import { Event } from "../../events/entities/event.entity";
import { FieldOption } from "../../field_options/entities/field_option.entity";
import { Timestamp } from "../../helpers/timestamp.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"fields"})
export class Field extends Timestamp{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar", length:50})
    label: string;

    @Column({type:"varchar", length:50})
    field_type: string;

    @Column({type:"boolean", default:false})
    is_required: boolean;

    //link to events
    @ManyToOne(() => Event, (event) => event.fields)
    @JoinColumn({name:"event_id"})
    event:Event;

    //link to field options
    @OneToMany(() => FieldOption, (field_options) => field_options.field)
    field_options: FieldOption[];
}
