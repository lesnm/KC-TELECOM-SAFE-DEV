import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsPositive, Matches, Max, Min } from 'class-validator';
import { ConversionType } from '@prisma/client';

export class CreateConversionRequestDto {
  @IsEnum(ConversionType)
  type: ConversionType;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0.01)
  @Max(1000000)
  amount: number;

  @IsOptional()
  @Matches(/^(0[7-9][0-1]\d{8}|[7-9][0-1]\d{8})$/, {
    message: 'sourcePhone must be a valid Nigerian mobile number',
  })
  sourcePhone?: string;
}