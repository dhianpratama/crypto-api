import { Controller, forwardRef, Inject, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject(forwardRef(() => AppService)) private readonly appService: AppService) {}

  @EventPattern('')
  async handleMessage(message: string) {
    Logger.log(`Handle message: ${message}`)
    await this.appService.handleMessage(JSON.parse(message))
  }
}
