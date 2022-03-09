
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsBoolean, IsOptional, IsNumber} from 'class-validator';

export class CreatePhotoDto {
    @ApiProperty()
    @IsString()
    readonly name: string;
  
    @ApiProperty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsString()
    readonly filename: string;
  
    @ApiProperty()
    @IsBoolean()
    readonly isPublished: boolean;

    @ApiProperty()
    @IsNumber()
    readonly views: number;

    @ApiProperty()
    @IsNumber()
    readonly userId: number;

}

// tslint:disable-next-line: max-classes-per-file
export class UpdatePhotoDto {

    @ApiProperty()
    @IsNumber()
    readonly id: number;    

    @ApiProperty()
    @IsString()
    readonly name: string;
  
    @ApiProperty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsString()
    readonly filename: string;
  
    @ApiProperty()
    @IsBoolean()
    readonly isPublished: boolean;

    @ApiProperty()
    @IsNumber()
    readonly views: number;

    @ApiProperty()
    @IsNumber()
    readonly userId: number;
}
