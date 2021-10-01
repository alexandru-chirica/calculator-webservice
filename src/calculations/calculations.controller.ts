import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CalculationDto } from './models/calculation.dto';
import { CalculationsService } from './calculations.service';

@Controller('calculations')
export class CalculationsController {
  constructor(private readonly calculationsService: CalculationsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  calculate(@Body() calculationDto: CalculationDto) {
    return this.calculationsService.calculate(calculationDto);
  }
}
