import { Contact } from './contact';
import { Model } from './model';

export class Vehical {
  modelId: number;
  isRegistered: string;
  contact: Contact;
  features: number[];
  id: number;
  make: { id: number; name: string };
  model: { id: number; name: string };

  constructor() {
    this.features = [];
    this.contact = new Contact();
  }
}
