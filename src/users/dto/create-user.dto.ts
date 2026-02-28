import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'John'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example:'john@mail.com'})
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example:'johny'})
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({example:'Kei234#a%o'})
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    verifyToken: string;

    isEmailVerified: string;


}
