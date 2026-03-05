import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

interface event{
    id: number;
    name: string;
    location: string;
    description?: string;
    hasGroup: boolean;
    start_date: string;
    end_date: string;
    expiry_date: string;
    no_attendee: number;
    flyer: string | File;
}

interface user{
    id: number;
}

export class CreateEventDto {
    @ApiProperty({ example: 'IYES 2026' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'UPSA Auditorium, Accra' })
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({ example: 'This is the most influential youth program' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ example: 'true' })
    @IsNotEmpty()
    @IsBoolean()
    group?:boolean;

    @ApiProperty({ example: '2026-03-12' })
    @IsNotEmpty()
    @IsString()
    start_date: string;

    @ApiProperty({ example: '2026-03-14' })
    @IsNotEmpty()
    @IsString()
    end_date: string;

    @ApiProperty({ example: '2026-03-14' })
    @IsNotEmpty()
    @IsString()
    expiry: string;

    @ApiProperty({ example: '2000' })
    @IsNotEmpty()
    @IsNumber()
    no_attendee: number;

    @ApiProperty({ example: '' })
    @IsNotEmpty()
    @IsObject()
    user: user;

}
