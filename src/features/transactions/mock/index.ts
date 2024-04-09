import { mockCustomer } from "@/features/customers/mock";
import {
  PaymentMethod,
  TransactionStatus,
} from "@/features/transactions/types";
import { faker } from "@faker-js/faker";

export const mockTransaction = () => ({
  id: faker.datatype.number(),
  externalId: faker.string.uuid(),
  acquirerType: faker.word.words(1),
  customer: mockCustomer(),
  address: {
    city: faker.address.city(),
    complement: faker.address.streetAddress(),
    neighborhood: faker.address.streetName(),
    number: faker.datatype.number().toString(),
    state: faker.address.state(),
    street: faker.address.streetName(),
    zipcode: faker.address.zipCode(),
  },
  amount: faker.datatype.number(),
  createdAt: faker.date.past(),
  date: faker.date.past(),
  fee: faker.datatype.number(),
  installments: faker.datatype.number(),
  items: Array.from({ length: 5 }, () => ({
    id: faker.datatype.number(),
    externalRef: faker.datatype.uuid(),
    quantity: faker.datatype.number({
      min: 1,
      max: 3,
    }),
    tangible: faker.datatype.boolean(),
    title: faker.commerce.productName(),
    unitPrice: faker.datatype.number(),
  })),
  liquidAmount: faker.datatype.number(),
  paidAmount: faker.datatype.number(),
  paymentMethod: [
    PaymentMethod.CREDIT_CARD,
    PaymentMethod.TICKET,
    PaymentMethod.PIX,
  ][faker.datatype.number({ min: 0, max: 2 })],
  refundedAmount: faker.datatype.number(),
  status: [
    TransactionStatus.CANCELED,
    TransactionStatus.IN_PROTEST,
    TransactionStatus.PAID,
    TransactionStatus.PARTIALLY_PAID,
    TransactionStatus.PENDING,
    TransactionStatus.REFUNDED,
    TransactionStatus.REFUSED,
  ][faker.datatype.number({ min: 0, max: 6 })],
  boleto: {
    barcode: faker.datatype.uuid(),
    boletoUrl: faker.internet.url(),
    expirationDate: faker.date.future(),
  },
  card: {
    customer: mockCustomer(),
    cvv: faker.datatype.number().toString(),
    expirationDate: faker.date.future(),
    holderName: faker.name.firstName(),
    number: faker.datatype.number().toString(),
  },
  pix: {
    expirationDate: faker.date.future(),
    qrCode: faker.datatype.uuid(),
  },
  updatedAt: faker.date.past(),
});
