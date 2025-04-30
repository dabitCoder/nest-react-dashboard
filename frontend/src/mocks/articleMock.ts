import { Article } from "../types.ts";

export const mockArticles: Article[] = [
  {
    id: 1,
    title: "First Test Article",
    author: {
      id: 1,
      name: "Author One",
      createdAt: "2025-04-29",
      updatedAt: "2025-04-29",
    },
    summary: "test test",
    content: "Content of the first test article.",
    views: 500,
    shares: 100,
    createdAt: "2025-04-26T14:00:00.000Z",
    updatedAt: "2025-04-26T15:00:00.000Z",
  },
  {
    id: 2,
    title: "Second Test Article with More Details",
    author: {
      id: 2,
      name: "Author Two",
      createdAt: "2025-04-29",
      updatedAt: "2025-04-29",
    },
    summary: "test test 2",
    content:
      "This is the extended content of the second test article. It includes more details and context.",
    views: 1200,
    shares: 250,
    createdAt: "2025-04-27T08:00:00.000Z",
    updatedAt: "2025-04-27T09:15:00.000Z",
  },
  {
    id: 3,
    title: "A Short Test Article",
    author: {
      id: 3,
      name: "Author Three",
      createdAt: "2025-04-29",
      updatedAt: "2025-04-29",
    },
    summary: "test test 3",
    content: "Brief content of the third article.",
    views: 300,
    shares: 50,
    createdAt: "2025-04-27T12:00:00.000Z",
    updatedAt: "2025-04-27T12:30:00.000Z",
  },
];
