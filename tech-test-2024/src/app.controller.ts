import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('comms')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // change naming
  @Get('your-next-delivery/:id')
  getDeliveryInformationByUserId(@Param('id') id: string): object {
    return this.appService.getUser(id);
  }
}
