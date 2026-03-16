import { IsString, IsEmail, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class Profile {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  headline: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  bio: string;
}
