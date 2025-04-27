
const ArticlesGrid = () => {
	return (
		<section>
			<div className="flex items-center gap-2 mb-4">
				<h2 className="text-xl font-semibold text-gray-800">All Articles</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{[1, 2, 3].map((i) => (
					<div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
						<div className="p-5">
							<h3 className="text-lg font-semibold text-gray-800 mb-2">Article Title</h3>
							<p className="text-sm text-gray-500 mb-3">by Author Name</p>
							<p className="text-gray-600 mb-4 line-clamp-3">
								Preview of the article content that might be a bit longer and need to be truncated...
							</p>
						</div>

						<div className="p-4 bg-gray-50 border-t border-gray-100">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-1 text-gray-600">
										<span className="text-sm font-medium">1.2k</span>
									</div>
									<div className="flex items-center gap-1 text-gray-600">
										<span className="text-sm font-medium">234</span>
									</div>
								</div>
							</div>

							<button className="w-full flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
								<span className="text-sm font-medium">Summarize</span>
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default ArticlesGrid