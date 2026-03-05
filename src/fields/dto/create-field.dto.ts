import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


interface event{
    id: number;
}
export class CreateFieldDto {
    @ApiProperty({ example: 'Surname' })
    @IsNotEmpty()
    @IsString()
    label: string;

    @ApiProperty({ example: 'text' })
    @IsNotEmpty()
    @IsString()
    field_type: string;

    @ApiProperty({ example: true })
    @IsNotEmpty()
    @IsBoolean()
    isRequired: boolean;

    @ApiProperty({ example: 'Surname' })
    @IsNotEmpty()
    @IsString()
    event: event;

}
