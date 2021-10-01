import { BigNumber } from 'bignumber.js';

import { ICalculationStrategy } from '../contracts/calculation-strategy.interface';

export class MultiplicationStrategy implements ICalculationStrategy {
  calculate(firstPart: string, secondPart: string): string {
    const firstNumber = new BigNumber(firstPart);
    const secondNumber = new BigNumber(secondPart);
    const result = firstNumber.multipliedBy(secondNumber);

    return result.toString();
  }
}
