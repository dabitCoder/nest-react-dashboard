const Header = () => {
	return (
		<header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
			<div className="container mx-auto px-4 py-6 flex items-center justify-between max-w-7xl">
				<div className="flex items-center space-x-2">
					<h1 className="text-2xl font-bold">Dashboard</h1>
				</div>
				<div>
					<p className="text-sm text-white/80">Analyze your content performance</p>
				</div>
			</div>
		</header>
	);
}

export default Header