"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import pic from "../../../public/img1.jpeg";

const DonatePage = () => {
	const params = useParams();
	const { id } = params;
	const [date, setDate] = useState(new Date());
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async () => {
		try {
			const response = await axios.post(
				"https://bc-latest.onrender.com/appointments",
				{
					hospital: id,
					date: date.toISOString(),
					name,
					email,
					phoneNumber,
				}
			);
			console.log("Donation submitted:", response.data);
			setMessage(response.data.data.message);
		} catch (error) {
			console.error("Error submitting donation:", error);
		}
	};

	return (
		<div className="flex items-center py-auto min-h-screen w-full px-5 sm:px-[100px] gap-[80px]">
			<div className="w-1/2">
				<h1 className="text-xl sm:text-[30px] mb-5 font-semibold">
					Book an appointment
				</h1>
				<p className="text-sm text-gray-600">{message}</p>
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
				/>
				<div className="mt-5 mb-20">
					<Input
						type="text"
						placeholder="Your Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mb-3 w-full"
					/>
					<Input
						type="email"
						placeholder="Your Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="mb-3 w-full"
					/>
					<Input
						type="text"
						placeholder="Your Phone Number"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						className="mb-3 w-full"
					/>
					<Button
						className="bg-[#C01A2C] text-white mt-5 w-full"
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</div>
			</div>
			<div className="w-1/2 hidden md:block">
				{/* <div className="flex items-center justify-between w-full h-[68px] border-red-200 border rounded-sm mt-5">
					<div className="w-1/2 flex items-center justify-center h-full">
						<p>Your code is -</p>
					</div>
					<div className="w-1/2 flex items-center h-full justify-center bg-[#C01A2C]">
						<p className="text-white">code</p>
					</div>
				</div> */}
				<Image
					src={pic}
					alt="Hospital"
					className="w-full h-[240px] bg-gray-500 object-cover"
				/>
			</div>
		</div>
	);
};

export default DonatePage;
