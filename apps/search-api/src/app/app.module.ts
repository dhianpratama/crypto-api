import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigOptions } from '@nimo/common';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfigOptions),
    HistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
