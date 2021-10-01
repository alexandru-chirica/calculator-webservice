import { BigNumber } from 'bignumber.js';

import { ICalculationStrategy } from '../contracts/calculation-strategy.interface';

export class SubtractionStrategy implements ICalculationStrategy {
  calculate(firstPart: string, secondPart: string): string {
    const firstNumber = new BigNumber(firstPart);
    const secondNumber = new BigNumber(secondPart);
    const result = firstNumber.minus(secondNumber);

    return result.toString();
  }
}
