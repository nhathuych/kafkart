import type { Kafka, Consumer } from 'kafkajs';

export const createConsumer = (kafka: Kafka, groupId: string) => {
  const consumer: Consumer = kafka.consumer({ groupId });

  const connect = async () => {
    await consumer.connect();
    console.log(`Consumer connected to Kafka with groupId: "${groupId}"`);
  };

  const subscribe = async (
    topic: string,
    handler: (message: any) => Promise<void>
  ) => {
    await consumer.subscribe({ topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const value = message.value?.toString();
          if (value) {
            await handler(JSON.parse(value));
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      }
    });
  };

  const disconnect = async () => {
    await consumer.disconnect();
    console.log(`Consumer disconnected from Kafka groupId: "${groupId}"`);
  };

  return {
    connect,
    subscribe,
    disconnect,
  };
};
