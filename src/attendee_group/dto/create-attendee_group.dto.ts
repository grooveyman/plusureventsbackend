import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAttendeeGroupDto {
    @ApiProperty({example:''})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example:''})
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({example:''})
    @IsNotEmpty()
    @IsString()
    contact_person_name: string;
    
    @ApiProperty({example:''})
    @IsNotEmpty()
    @IsString()
    contact_person_phone: string;

    @ApiProperty({example:''})
    @IsString()
    contact_person_email: string;

    @ApiProperty({example:''})
    @IsNumber()
    @IsNotEmpty()
    number_heads: number;
}
