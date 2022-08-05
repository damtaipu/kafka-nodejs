const { Kafka } = require('kafkajs')

class KafkaConsumer {
    consumer;

    constructor() {
        this.consumer = this.kafkaCall().consumer();
        this.runConsumer();
    }

    runConsumer = async () => {
        await this.consumer.connect()
        await this.consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                })
            },
        })
    }

    kafkaCall() {
        return new Kafka({
            clientId: 'my-app',
            brokers: ['localhost:9092']
        });
    }
}

module.exports = KafkaConsumer;