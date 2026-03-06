import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";


interface event {
    id: number;
}

interface fieldOptions {
    label: string;
    option_value: string;
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

    @ApiProperty({ example: [] })
    @IsObject()
    fieldOptions: fieldOptions[];

}

export class CreateFieldsDto {
    @ApiProperty({ type: [CreateFieldDto] })
    @IsArray()
    @ValidateNested({ each: true })
    //transforms each item into CreateFieldDto
    @Type(() => CreateFieldDto)
    fields: CreateFieldDto[];
}