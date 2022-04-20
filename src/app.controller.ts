import {
  Controller,
  Get,
  UseGuards,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('contr')
@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('link')
  getHello(): string {
    return this.appService.getHello();
  }
}
