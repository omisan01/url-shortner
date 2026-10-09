import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm"

@Entity({ name: "urls" })
export class Url {
    @PrimaryGeneratedColumn("increment", { type: "bigint" })
    id: string;

    @Column({
        name: "short_code",
        type: "varchar",
        length: 8,
        unique: true
    })
    shortCode: string

    @Column({
        name: "original_url",
        type: "text",
    })
    originalUrl: string

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
    })
    createdAt: Date;

    @Column({
        name: 'expires_at',
        type: 'timestamptz',
        nullable: true,
    })
    expiresAt: Date | null;
}