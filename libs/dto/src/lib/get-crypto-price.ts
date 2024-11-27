import {IsEnum, IsNotEmpty, IsString} from 'class-validator';
import { CoinEnum, CurrencyEnum } from '@nimo/common';

export class GetCryptoPriceRequestDto {
    @IsNotEmpty()
    @IsEnum(CoinEnum, { message: 'sssss' })
    ticker!: CoinEnum;

    @IsNotEmpty()
    @IsEnum(CurrencyEnum)
    vsCurrency?: CurrencyEnum;
}

export class GetCryptoPriceResponseDto {
    @IsString()
    message!: string

    static factory(ticker: string): GetCryptoPriceResponseDto {
		const response = new GetCryptoPriceResponseDto();
		response.message = `${ticker.toUpperCase()} price will be sent to your email.`
		return response;
	}
}