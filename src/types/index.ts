export type Project = {
  id: string;
  name: string;
  concept: string | null;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | null | string;
};
