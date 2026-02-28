import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamp } from "../../helpers/timestamp.entity";

export enum StatusEnum{
    ACTIVE = "1",
    INACTIVE = "0"
}
@Entity({name:"users"})
export class User extends Timestamp {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar", length:200})
    name: string;

    @Column({type:"varchar", length:100, unique:true})
    email: string

    @Column({type:"varchar", length:50, unique:true})
    username: string;

    @Column({type: "varchar"})
    password: string;

    @Column({type: "varchar", length:200})
    verifyToken: string | null;

    @Column({type: "enum", enum:StatusEnum, default:StatusEnum.INACTIVE})
    isEmailVerified: StatusEnum;

    @Column({nullable: true, type: 'timestamp'})
    emailVerifiedExpiry: Date | null;
}
