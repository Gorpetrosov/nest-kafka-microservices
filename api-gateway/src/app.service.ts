import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './events/order-created.event';

@Injectable()
export class AppService {
  constructor(@Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka) {
  }
  getHello(): string {
    return 'Hello World!';
  }

   createOrder({userId, price}: CreateOrderDto) {
    this.billingClient.emit('order_created', new OrderCreatedEvent('123', userId, price))
  }
}
