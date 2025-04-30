import {StatsResponse} from "../types.ts";

const mockStats: StatsResponse = {
	mostViewed: [
		{
			title: "Popular Article",
			id: 2,
			author: {
				id: 1,
				name: "test",
				createdAt: "2025-04-09",
				updatedAt: "2025-04-09",
			},
			content: "",
			views: 23,
			shares: 11,
			summary: "",
			createdAt: "",
			updatedAt: "",
		},
	],
	mostShared: [
		{
			title: "Popular Article",
			id: 2,
			author: {
				id: 1,
				name: "testing 2",
				createdAt: "2025-04-09",
				updatedAt: "2025-04-09",
			},
			content: "",
			views: 1,
			shares: 55,
			summary: "",
			createdAt: "",
			updatedAt: "",
		},
	],
};

export default mockStats;