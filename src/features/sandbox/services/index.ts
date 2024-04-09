import {
  PaginationRequest,
  PaginationResponse,
} from "@/features/common/types/pagination";
import { Item, ItemStatus, ItemTag } from "@/features/sandbox/types";
import { faker } from "@faker-js/faker";

const items: Item[] = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: faker.commerce.productName(),
  description: faker.commerce.productName(),
  status: [ItemStatus.PENDING, ItemStatus.DONE][
    faker.number.int({ min: 0, max: 1 })
  ],
  tags: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => {
    return [ItemTag.IMPORTANT, ItemTag.OPTIONAL, ItemTag.URGENT][
      faker.number.int({ min: 0, max: 2 })
    ];
  }),
  createdAt: faker.date.recent().toISOString(),
}));

export const getItems = (
  payload: PaginationRequest
): Promise<PaginationResponse<Item>> => {
  const { filters, pageIndex, pageSize, search } = payload;

  const filteredItems = items.filter((item) => {
    if (search) {
      return item.name.toLowerCase().includes(search.toLowerCase());
    }
    if (filters.length > 0) {
      return filters.every(({ id, value }) => {
        if (id === "status") {
          return item.status === value;
        }
        if (id === "tags") {
          return item.tags.every((tag) => (value as ItemTag[]).includes(tag));
        }
        if (id === "name") {
          return item.name
            .toLowerCase()
            .includes((value as string).toLowerCase());
        }
        if (id === "description") {
          return item.description
            .toLowerCase()
            .includes((value as string).toLowerCase());
        }
        return true;
      });
    }
    return true;
  });

  const count = filteredItems.length;

  const results = filteredItems.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  return new Promise((resolve) => {
    console.log("getItems", payload);
    setTimeout(() => resolve({ results, count }), 1000);
  });
};
