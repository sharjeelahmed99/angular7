import { Contact } from './contact';
import { Model } from './model';

export class Vehical {
  ModelId: number;
  IsRegistered: string;
  Contact: Contact;
  Features: number[];

  constructor() {
    this.Features = [];
    this.Contact = new Contact();
  }
}
