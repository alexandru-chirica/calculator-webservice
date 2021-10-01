import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CalculationsController } from './calculations.controller';
import { CalculationsService } from './calculations.service';
import { CalculationType } from './entities/calculation-type.enum';

describe('CalculationsController', () => {
  let controller: CalculationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculationsController],
      providers: [CalculationsService],
    }).compile();

    controller = module.get<CalculationsController>(CalculationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw an error if a non existing calculationType was specified', () => {
    const dto = {
      calculationType: -1,
      firstPart: '5',
      secondPart: '7',
    };

    expect(() => controller.calculate(dto)).toThrow(
      InternalServerErrorException,
    );
  });

  it('should add 2 numbers', () => {
    const dto = {
      calculationType: CalculationType.Addition,
      firstPart: '5',
      secondPart: '7',
    };

    expect(controller.calculate(dto)).toBe('12');
  });

  it('should subtract 2 numbers', () => {
    const dto = {
      calculationType: CalculationType.Subtraction,
      firstPart: '12',
      secondPart: '5',
    };

    expect(controller.calculate(dto)).toBe('7');
  });

  it('should multiply 2 numbers', () => {
    const dto = {
      calculationType: CalculationType.Multiplication,
      firstPart: '3',
      secondPart: '5',
    };

    expect(controller.calculate(dto)).toBe('15');
  });

  it('should divide 2 numbers', () => {
    const dto = {
      calculationType: CalculationType.Division,
      firstPart: '21',
      secondPart: '3',
    };

    expect(controller.calculate(dto)).toBe('7');
  });

  it('should handle big numbers', () => {
    const dto = {
      calculationType: CalculationType.Division,
      firstPart: '2112515125151.15125125151',
      secondPart: '124512.12515',
    };

    expect(controller.calculate(dto)).toBe('16966340.60824357595708027316');
  });
});
