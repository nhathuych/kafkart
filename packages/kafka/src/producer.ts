import type { Kafka, Producer } from 'kafkajs';

export const createProducer = (kafka: Kafka) => {
  const producer: Producer = kafka.producer();

  const connect = async () => {
    await producer.connect();
    console.log('Producer connected to Kafka');
  };

  const send = async (topic: string, messge: object) => {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(messge) }],
    });
  };

  const disconnect = async () => {
    await producer.disconnect();
    console.log('Producer disconnected from Kafka');
  };

  return {
    connect,
    send,
    disconnect,
  };
};
