import { Injectable } from '@nestjs/common';
import { GetUserRequestDto } from './dto/get-user-request.dto';

@Injectable()
export class AppService {
  private readonly users: ({userId: string, stripeUserId: string})[] = [
    {
      userId: '123',
      stripeUserId: '654654654'
    },
    {
      userId: '456',
      stripeUserId: '8758415245'
    }
  ]



  getHello(): string {
    return 'Hello World!';
  }

  getUser({userId}: GetUserRequestDto){
    return this.users.find((user) => user.userId === userId)
  }
}
