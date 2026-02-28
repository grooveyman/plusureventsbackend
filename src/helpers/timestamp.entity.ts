import { CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

export abstract class Timestamp{
    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;

    @DeleteDateColumn({type: "timestamp"})
    deletedAt: Date;
}