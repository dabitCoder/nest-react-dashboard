import {Article} from "../types.ts";

export const mockArticles: Article[] = [
	{
		id: 1,
		title: "First Test Article",
		author: "Author One",
		content: "Content of the first test article.",
		views: 500,
		shares: 100,
		createdAt: "2025-04-26T14:00:00.000Z",
		updatedAt: "2025-04-26T15:00:00.000Z",
	},
	{
		id: 2,
		title: "Second Test Article with More Details",
		author: "Author Two",
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
		author: "Author Three",
		content: "Brief content of the third article.",
		views: 300,
		shares: 50,
		createdAt: "2025-04-27T12:00:00.000Z",
		updatedAt: "2025-04-27T12:30:00.000Z",
	},
];
