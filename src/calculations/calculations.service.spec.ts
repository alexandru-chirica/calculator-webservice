import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CalculationsService } from './calculations.service';
import { CalculationType } from './entities/calculation-type.enum';

describe('CalculationsService', () => {
  let service: CalculationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculationsService],
    }).compile();

    service = module.get<CalculationsService>(CalculationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if a non existing calculationType was specified', () => {
    const dto = {
      calculationType: -1,
      firstPart: '5',
      secondPart: '7',
    };

    expect(() => service.calculate(dto)).toThrow(InternalServerErrorException);
  });

  it('should add 2 numbers', () => {
    const dto = {
      calculationType: CalculationType.Addition,
      firstPart: '5',
      secondPart: '7',
    };

    expect(service.calculate(dto)).toBe('12');
  });

  it('should subtract 2 numbers', () => {
    const dto = {
      calculationType: CalculationType.Subtraction,
      firstPart: '12',
      secondPart: '5',
    };

    expect(service.calculate(dto)).toBe('7');
  });

  it('should multiply 2 numbers', () => {
    const dto = {
      calculationType: CalculationType.Multiplication,
      firstPart: '3',
      secondPart: '5',
    };

    expect(service.calculate(dto)).toBe('15');
  });

  it('should divide 2 numbers', () => {
    const dto = {
      calculationType: CalculationType.Division,
      firstPart: '21',
      secondPart: '3',
    };

    expect(service.calculate(dto)).toBe('7');
  });

  it('should handle big numbers', () => {
    const dto = {
      calculationType: CalculationType.Division,
      firstPart: '2112515125151.15125125151',
      secondPart: '124512.12515',
    };

    expect(service.calculate(dto)).toBe('16966340.60824357595708027316');
  });
});
