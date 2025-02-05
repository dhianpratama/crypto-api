import { SQSClient } from "@aws-sdk/client-sqs";
import { SqsConsumerOptions, SqsProducerOptions } from "@ssut/nestjs-sqs/dist/sqs.types";

const SQS_ENDPOINT = process.env["SQS_ENDPOINT"] || 'http://localhost:9324/000000000000';


console.log('process.env', process.env)

export enum SqsQueue {
  Email = 'email.fifo',
}

const sqs = new SQSClient({
  apiVersion: '2012-11-05',
  credentials: {
    accessKeyId: process.env["ACCESS_KEY_AWS"] as string,
    secretAccessKey: process.env["SECRET_KEY_AWS"] as string 
  },
  endpoint: SQS_ENDPOINT,
  region: 'ap-southeast-2',
});

export const SqsQueues: { [key in SqsQueue]: SqsConsumerOptions | SqsProducerOptions } = {
  [SqsQueue.Email]: {
    name: SqsQueue.Email,
    queueUrl: `${SQS_ENDPOINT}/${SqsQueue.Email}`,
    sqs,
  },
};