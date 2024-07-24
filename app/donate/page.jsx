"use client";

import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { useState } from "react";

const page = () => {
	const [date, setDate] = useState(new Date());

	return (
		<div className="flex items-center py-auto min-h-screen w-full px-[150px] gap-[80px]">
			<div className="w-1/2">
				<h1 className="text-xl sm:text-[30px] mb-5 font-semibold">
					Book an appointment
				</h1>
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
				/>
				<div className="flex items-center justify-between w-full h-[68px] border-red-200 border rounded-sm mt-5">
					<div className="w-1/2 flex items-center justify-center h-full">
						<p>Your code is -</p>
					</div>
					<div className="w-1/2 flex items-center h-full justify-center bg-[#C01A2C]">
						<p className="text-white">code</p>
					</div>
				</div>
			</div>
			<div className="w-1/2 hidden md:block">
				<Image
					src=""
					alt="Hospital"
					className="w-full h-[240px] bg-gray-500 object-cover"
				/>
			</div>
		</div>
	);
};

export default page;
