import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class signIn {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    tokenId: string;
}
