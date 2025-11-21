import { consumer } from './kafka';
import { createOrder } from './order.creator';

export const runKafkaSubcriptions = async () => {
  consumer.subscribe('payment.successful', async (message) => {
    const order = message.value;
    console.log('[payment.successful] Received message:', order);

    await createOrder(order);
  });
};
