import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
  
  @EventSubscriber()
  export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(
        private connection: Connection
    ) {
      connection.subscribers.push(this);
    }
  
    listenTo() {
      return User;
    }
  
    async beforeInsert(event: InsertEvent<User>) {
      console.log(`BEFORE USER INSERTED: `, event.entity);
      event.entity.salt = await bcrypt.genSalt();
      //event.entity.password = event.entity.password || 'P@$$w0rd';
      event.entity.password = await bcrypt.hash(event.entity.password, event.entity.salt);  
    }
  }