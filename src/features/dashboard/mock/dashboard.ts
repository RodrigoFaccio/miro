import { faker } from "@faker-js/faker";

export const _dailyRevenue = Array.from({ length: 30 }, () => ({
  value: faker.datatype.number({ min: 100, max: 125 }),
  date: faker.date.past({ years: 1 }).getTime(),
})).sort((a, b) => a.date - b.date);
