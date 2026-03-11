import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateAttendeeDto {
    @ApiProperty({example:'Johnson'})
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty({example:'Kelvin'})
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({example:'example@gmail.com'})
    @IsString()
    email: string;

    @ApiProperty({example:'2022222222'})
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({example:'Legon, Accra'})
    @IsString()
    address: string;

    @ApiProperty({example:true})
    @IsBoolean()
    @IsNotEmpty()
    firstTime: boolean;
}
