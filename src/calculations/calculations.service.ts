import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ICalculationStrategy } from './contracts/calculation-strategy.interface';
import { CalculationType } from './entities/calculation-type.enum';
import { CalculationDto } from './models/calculation.dto';
import { AdditionStrategy } from './strategies/addition.strategy';
import { DivisionStrategy } from './strategies/division.strategy';
import { MultiplicationStrategy } from './strategies/multiplication.strategy';
import { SubtractionStrategy } from './strategies/subtraction.strategy';

@Injectable()
export class CalculationsService {
  calculate(calculationDto: CalculationDto): string {
    const strategy = this.getStrategy(calculationDto.calculationType);

    return strategy.calculate(
      calculationDto.firstPart,
      calculationDto.secondPart,
    );
  }

  private getStrategy(calculationType: CalculationType): ICalculationStrategy {
    switch (calculationType) {
      case CalculationType.Addition: {
        return new AdditionStrategy();
      }
      case CalculationType.Division: {
        return new DivisionStrategy();
      }
      case CalculationType.Multiplication: {
        return new MultiplicationStrategy();
      }
      case CalculationType.Subtraction: {
        return new SubtractionStrategy();
      }
      default: {
        throw new InternalServerErrorException(
          'The calculation type specified was not identified.',
        );
      }
    }
  }
}
