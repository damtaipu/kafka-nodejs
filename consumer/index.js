import express from 'express';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const app = express();

// Consumer
const runConsumer = async function () {
  const consumer = kafka.consumer({ groupId: 'test-group' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  });
}

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.listen(3042, () => {
  runConsumer();
  console.log('Server Consumer is UP');
});