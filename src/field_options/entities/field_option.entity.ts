import { Field } from "src/fields/entities/field.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"field_option"})
export class FieldOption {
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
