import { Customer, DocumentType } from "@/features/customers/types";
import { faker } from "@faker-js/faker";
import { PaginationState } from "@tanstack/react-table";

export const mockCustomer = (): Customer => ({
  id: faker.datatype.number(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: "(99) 9 9999-9999",
  createdAt: faker.date.past(),
  docNumber: faker.datatype
    .number({ min: 10000000000, max: 99999999999 })
    .toString(),
  docType: [DocumentType.CPF, DocumentType.CNPJ][
    faker.datatype.number({ min: 0, max: 1 })
  ],
  fingerprint: faker.datatype.uuid(),
  ip: faker.internet.ip(),
  user: {
    id: faker.datatype.number(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
  },
});

const customers = Array.from({ length: 50 }, mockCustomer);

export const fakeFetchCustomers = ({
  pagination: { pageIndex, pageSize },
  search,
}: {
  pagination: PaginationState;
  search: string;
}): Promise<{ results: Customer[]; count: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = customers.filter((customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase())
      );

      const count = filtered.length;

      const results = filtered.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
      );

      resolve({ results, count });
    }, 500);
  });
};
