// aws-sns.server.ts

import { Logger } from '@nestjs/common';
import {
CustomTransportStrategy,
Server,
} from '@nestjs/microservices';
import { Context, SQSEvent, SQSRecord } from 'aws-lambda';

export class AWSSQSServer extends Server implements CustomTransportStrategy {
    event: SQSEvent;
    context: Context;

    constructor(event: SQSEvent, context: any) {
        super();
        this.event = event;
        this.context = context;
    }
  
  async listen(callback: () => void) {
    const records = this.getRecords();

    for (const record of records) {
      const key = this.getMessageAttribute(record);
      const msg = record.body;
      const handler = this.messageHandlers.get(key);
      if (handler) {
        await handler(msg, this.context);
      } else {
        Logger.error(`${key} is not a valid handler.`);
      }
    }
    callback();
  }

  close() {
    return;
  }

  private getMessageAttribute(record: SQSRecord): string {
    const messageAttributeMap = record.messageAttributes;
    const returnArray: string[] = [];
    Object.keys(messageAttributeMap).forEach((key) => {
      returnArray.push(`${key}:${messageAttributeMap[key].stringValue}`);
    });
    const stringifiedKey = JSON.stringify(Object.assign({}, returnArray));
    return stringifiedKey === '{}' ? '' : stringifiedKey;
  }


  private getRecords(): SQSRecord[] {
  	return this.event.Records;
  }

}