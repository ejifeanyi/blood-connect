"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import axios from "axios";

const Page = () => {
	const params = useParams();
	const { id } = params;
	console.log("Hospital ID:", id);
	const [hospital, setHospital] = useState(null);
	const router = useRouter();

	useEffect(() => {
		if (id) {
			const fetchHospital = async () => {
				try {
					const response = await axios.get(
						`https://bc-latest.onrender.com/hospitals/${id}/single`
					);
					console.log("Hospital Data:", response.data.data.hospital);
					setHospital(response.data.data.hospital);
				} catch (error) {
					console.error("Error fetching hospital details:", error);
				}
			};

			fetchHospital();
		}
	}, [id]);

	const handleContinue = () => {
		router.push(`/donate/${id}`);
	};

	if (!hospital) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<div className="mt-[90px] px-5 sm:px-[100px]">
				<div className="flex flex-col items-center justify-center">
					<h1 className="text-[30px] font-bold text-[#333] mb-[14px]">
						{hospital.name || "Hospital Name"}
					</h1>
					<p className="text-sm text-[#333] max-w-[482px] text-center">
						Go to{" "}
						<span className="text-[#C01A2C]">
							{hospital.address || "Hospital Address"}
						</span>{" "}
						or{" "}
						<span className="text-[#916400]">
							{hospital.email || "Hospital Phone"}
						</span>{" "}
						to book.
					</p>
				</div>

				<div className="mt-[40px] sm:mt-[70px]">
					<Image
						src={hospital.image || ""} // Provide a fallback image
						alt="Hospital"
						className="w-full h-[240px] rounded-xl bg-gray-500"
					/>
				</div>

				<div className="mt-[40px] sm:mt-[150px] mb-[30px] sm:mb-[60px]">
					<h2 className="font-semibold text-xl sm:text-[30px] text-[#333] mb-4">
						Wanna Donate Blood and Save Life?
					</h2>
					<p className="text-[#5C5C5C] text-sm sm:text-base max-w-[545px]">
						By clicking continue, you will be able to book your date to donate
						your blood to this hospital.
					</p>
					<Button
						className="bg-[#F95655] text-xs font-light text-white mt-5"
						onClick={handleContinue}
					>
						Continue
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Page;
