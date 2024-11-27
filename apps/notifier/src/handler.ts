import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Context, Handler, SQSEvent } from 'aws-lambda';
import { AppModule } from './app/app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AWSSQSServer } from '@nimo/common';

let cachedSQSServer;

async function bootstrapSQSServer(
  event: SQSEvent,
  context: Context,
): Promise<INestMicroservice> {
  if (!cachedSQSServer) {
    cachedSQSServer = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        strategy: new AWSSQSServer(event, context),
        logger: console,
      },
    );
  }
  return cachedSQSServer;
}

export const handler: Handler = async (
  event: SQSEvent,
  context: Context,
) => {
  cachedSQSServer = await bootstrapSQSServer(event, context);
  await cachedSQSServer.listen();
};