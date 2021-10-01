import { Transform, TransformFnParams } from 'class-transformer';
import { IsEnum, IsNumberString } from 'class-validator';

import { CalculationType } from '../entities/calculation-type.enum';

const anyNonDigitRegex = /\D/gm;
const joinedAllowedCalculationTypes = Object.values(CalculationType)
  .reduce((accumulator, value) => {
    const lowerCaseValue = String(value).toLowerCase();

    if (anyNonDigitRegex.test(lowerCaseValue)) {
      accumulator.push(lowerCaseValue);
    }

    return accumulator;
  }, [])
  .join(', ');

/**
 * Transforms the received string to a enum value, eg: 'addition' becomes 0
 */
const calculationTypeTransformer = ({
  value,
}: TransformFnParams): CalculationType | undefined => {
  const calculationTypeKeyValuePair = Object.entries(CalculationType).find(
    ([, val]) => String(val).toLowerCase() === value,
  );
  const key = calculationTypeKeyValuePair?.[0];

  return key ? parseInt(key, 10) : undefined;
};

export class CalculationDto {
  @IsEnum(CalculationType, {
    message: ({ property }) =>
      `${property} must be a valid type (${joinedAllowedCalculationTypes})`,
  })
  @Transform(calculationTypeTransformer)
  public calculationType: CalculationType;

  @IsNumberString()
  @Transform(({ value }) => String(value))
  public firstPart: string;

  @IsNumberString()
  @Transform(({ value }) => String(value))
  public secondPart: string;
}
