const { Kafka } = require('kafkajs')

class KafkaProducer {
    producer;

    constructor() {
        this.producer = this.kafkaCall().producer();
        this.runProducer();
    }
    
    runProducer = async () => {
        // Producing
        await this.producer.connect();
        await this.producer.send({
            topic: 'test-topic',
            messages: [
                { value: 'Olá! Acabei essa minha primeira menssagem com Kafka.'+Math.random()}
            ],
        });
    }

    kafkaCall(){
        return new Kafka({
            clientId: 'my-app',
            brokers: ['localhost:9092']
        });
    }
}

module.exports = KafkaProducer;