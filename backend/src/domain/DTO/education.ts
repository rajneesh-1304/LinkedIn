import { IsString, IsEmail, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class EducationDto {

  @IsString()
  @IsNotEmpty()
  instituteName: string;

  @IsString()
  @IsNotEmpty()
  degreeName: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsOptional()
  Grade: string;
}
