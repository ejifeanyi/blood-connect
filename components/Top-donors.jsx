import React, { useEffect, useState } from "react";
import axios from "axios";

const TopDonors = () => {
	const [topDonors, setTopDonors] = useState([]);

	useEffect(() => {
		const fetchTopDonors = async () => {
			try {
				const response = await axios.get(
					"https://bc-latest.onrender.com/donations/top-donors",
					{
						params: {
							bloodGroup: "A+",
						},
					}
				);
				console.log(response.data.data);
				setTopDonors(response.data.data.donations);
			} catch (error) {
				console.error("Error fetching blood banks:", error);
			}
		};

		fetchTopDonors();
	}, []);

	return (
		<div className="mt-16">
			<h1 className="font-semibold text-[#333] text-xl mb-4 md:text-[30px] md:mb-6">
				Top Donors
			</h1>
			<div className="flex items-center gap-[32px] overflow-x-scroll">
				{topDonors.map((donor, index) => (
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
