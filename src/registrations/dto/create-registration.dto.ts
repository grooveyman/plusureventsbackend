import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject } from "class-validator";


export class CreateRegistrationDto {
    @ApiProperty({ example: 2 })
    @IsNotEmpty()
    @IsNumber()
    event_id: number;

    @ApiProperty({
        example: { "1": "John Doe", "2": "john@email.com", "3": "M" },
        description: "Key is field_id, value is the response"
    })
    @IsNotEmpty()
    @IsObject()
    responses: Record<string, string>;
}
