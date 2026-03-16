import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ExperienceDto {

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsOptional()
  location: string;
}
