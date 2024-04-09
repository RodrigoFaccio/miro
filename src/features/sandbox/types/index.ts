export enum ItemStatus {
  PENDING = "PENDING",
  DONE = "DONE",
}

export enum ItemTag {
  URGENT = "URGENT",
  IMPORTANT = "IMPORTANT",
  OPTIONAL = "OPTIONAL",
}

export type Item = {
  id: number;
  name: string;
  description: string;
  status: ItemStatus;
  tags: ItemTag[];
  createdAt: string;
};
