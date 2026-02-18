import { RabbitmqConsumer } from './rabbitmq.consumer';

describe('RabbitmqConsumer', () => {
  it('should be defined', () => {
    expect(new RabbitmqConsumer()).toBeDefined();
  });
});
