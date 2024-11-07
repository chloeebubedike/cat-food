import { Injectable } from '@nestjs/common';
import {
  main as generateCustomers,
  Customer,
} from '../.tools/create-fake-data';

@Injectable()
export class AppService {
  private customers: Customer[] = [];
  private customer: Customer | undefined;

  async onModuleInit() {
    console.log('Initialiser running');
    await this.loadCustomers();
  }

  private async loadCustomers() {
    this.customers = await generateCustomers();
    console.log(`${this.customers.length} customers loaded successfully`);
    if (
      this.customers.find((customer) => customer.id === '123') === undefined
    ) {
      this.customer = this.mockData;
    }
  }

  getCustomerById(id: string): Customer | undefined {
    console.log(
      `CUSTOMER: ${this.customers.find((customer) => customer.id === id)}`,
    );
    this.customer = this.customers.find((customer) => customer.id === id);
    return this.customer;
  }

  private mockData = {
    id: 'ff535484-6880-4653-b06e-89983ecf4ed5',
    firstName: 'Kayleigh',
    lastName: 'Wilderman',
    email: 'Kayleigh_Wilderman@hotmail.com',
    cats: [
      {
        name: 'Dorian',
        subscriptionActive: true,
        breed: 'Thai',
        pouchSize: 'C',
      },
      {
        name: 'Ocie',
        subscriptionActive: true,
        breed: 'Somali',
        pouchSize: 'F',
      },
      {
        name: 'Eldridge',
        subscriptionActive: false,
        breed: 'Himalayan',
        pouchSize: 'A',
      },
    ],
  };

  private pouchSizePrices = {
    A: 55.5,
    B: 59.5,
    C: 62.75,
    D: 66.0,
    E: 69.0,
    F: 71.25,
  } as { [key: string]: number };

  getHello(): string {
    return 'Hello World!!';
  }

  getUserName(): string {
    if (this.mockData?.firstName) {
      return this.mockData?.firstName;
    }
    return '';
  }

  getCatNames(): string {
    let catNames = this.mockData?.cats.map((cat) => cat.name);

    let result;
    if (catNames.length === 1) {
      result = catNames[0];
    } else if (this.mockData.cats.length === 2) {
      result = catNames.join(' and ');
    } else {
      result =
        catNames.slice(0, -1).join(', ') +
        ' and ' +
        catNames[catNames.length - 1];
    }

    return result;
  }

  getActivePouchSizes(): string[] {
    let pouchSizes = this.mockData.cats
      .filter((cat) => cat.subscriptionActive)
      .map((cat) => cat.pouchSize);
    return pouchSizes;
  }

  calculateTotalPrice(): number {
    let activePouchSizes = this.getActivePouchSizes();

    const totalPrice: number = activePouchSizes.reduce(
      (accumulator, pouchSize) => {
        const price = this.pouchSizePrices[pouchSize];
        return price ? accumulator + price : accumulator;
      },
      0,
    );

    return totalPrice;
  }

  checkEligibileForFreeGift(): boolean {
    let result;
    if (this.totalPrice < 120) {
      result = false;
    } else {
      result = true;
    }

    return result;
  }

  userName = this.getUserName();
  catNames = this.getCatNames();
  totalPrice = this.calculateTotalPrice();
  isEligibleForFreeGift = this.checkEligibileForFreeGift();
  user = this.getCustomerById('f268af24-51ac-4694-b840-870829cdef8e');

  getUser(customerId: string): object {
    return {
      catNames: this.catNames,
      userName: this.userName,
      totalPrice: this.totalPrice,
      freeGift: this.isEligibleForFreeGift,
      customer: this.user,
    };
  }
}
