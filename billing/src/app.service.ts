import { Inject, Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './events/order-created.event';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientKafka) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    this.authClient.send('get_user', new GetUserDto(orderCreatedEvent.userId)).subscribe((user) => {
      console.log(`Billing User with stripe id   ${user?.stripeUserId} a price of ${orderCreatedEvent.price}...`);
    })
  }
}
