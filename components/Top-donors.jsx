import React from "react";

const TopDonors = () => {
	const donors = [
		{
			name: "John Doe",
			pic: "https://via.placeholder.com/150",
			bloodType: "A+",
			tag: "General",
		},
		{
			name: "Jane Smith",
			pic: "https://via.placeholder.com/150",
			bloodType: "O-",
			tag: "Recruit",
		},
		{
			name: "Mike Johnson",
			pic: "https://via.placeholder.com/150",
			bloodType: "B+",
			tag: "General",
		},
		// Add more donor objects as needed
	];

	return (
		<div className="mt-16">
			<h1 className="font-semibold text-[#333] text-[30px] mb-6">Top Donors</h1>
			<div className="flex items-center gap-[32px] overflow-x-scroll">
				{donors.map((donor, index) => (
					<div
						key={index}
						className="flex flex-col gap-1"
					>
						<h2 className="font-medium">{donor.name}</h2>
						<div className="flex items-center gap-2 mb-2">
							<p className="text-black/70 text-xs">{donor.bloodType}</p>
							<span className="px-2 py-1 bg-[#ECECEC] text-black/70 rounded-full text-[8px]">
								{donor.tag}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TopDonors;
