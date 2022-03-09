
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsBoolean()
  readonly isActive: boolean;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateUserDto {

  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsBoolean()
  readonly isActive: boolean;
}
