import express from 'express';
import { Kafka } from 'kafkajs';

const app = express();

const kafkaCall = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

// Producer
const runProducer = async function(){
    const producer = kafkaCall.producer();
    await producer.connect();
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Olá! Acabei essa minha primeira menssagem com Kafka.'+Math.random()}
        ],
    });
    await producer.disconnect();
}

app.get('/', function (req, res) {
    runProducer();
    res.send('Enviando evento via Kafka');
})

app.listen(3040, () => {
    console.log('Server Producer is UP');
})