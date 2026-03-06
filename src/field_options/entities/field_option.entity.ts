import { Field } from "../../fields/entities/field.entity";
import { Timestamp } from "../../helpers/timestamp.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"field_option"})
export class FieldOption extends Timestamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar"})
    label: string;

    @Column({type:"varchar"})
    option_value: string;

    //link to fields
    @ManyToOne(() => Field, (field) => field.field_options)
    @JoinColumn({name:"field_id"})
    field: Field;
    
}
