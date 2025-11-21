import { consumer } from './kafka';
import { createStripeProduct, deleteStripeProduct } from './stripeProduct';

export const runKafkaSubcriptions = async () => {
  consumer.subscribe('product.created', async (message) => {
    const product = message.value;
    console.log('[product.created] Received message:', product);

    await createStripeProduct(product);
  });

  consumer.subscribe('product.deleted', async (message) => {
    const productId = message.value;
    console.log('[product.deleted] Received message:', productId);

    await deleteStripeProduct(productId);
  });
};
