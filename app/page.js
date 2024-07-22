"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Locate } from "lucide-react"; // Assuming this is the correct import for the Locate icon
import Link from "next/link";

const Home = () => {
	const [bloodBanks, setBloodBanks] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [location, setLocation] = useState("");
	const [bloodType, setBloodType] = useState("");
	const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
	const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

	useEffect(() => {
		fetchBloodBanks(currentPage);
	}, [currentPage]);

	const fetchBloodBanks = async (page) => {
		try {
			const res = await axios.get(
				`https://bc-latest.onrender.com/hospitals?page=${page}&perPage=2`
			);
			console.log(res.data);
			const hospitals = (res.data.hospitals || []).map((hospital) => ({
				...hospital,
				pic: hospital.pic || "https://via.placeholder.com/366x262", // Placeholder image
				proximity: hospital.proximity || (Math.random() * 10).toFixed(2), // Dummy proximity
			}));
			setBloodBanks(hospitals);
			setTotalPages(Math.ceil(res.data.total / 2)); // Assuming the API returns the total count of hospitals
		} catch (error) {
			console.log("error", error);
		}
	};

	const getAddressFromCoordinates = async (lat, lon) => {
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_MAPS_API_KEY}`
			);
			const data = await response.json();
			if (data.results && data.results.length > 0) {
				return data.results[0].formatted_address;
			} else {
				throw new Error("No address found for the given coordinates.");
			}
		} catch (error) {
			console.error("Error fetching address:", error);
			return `Lat: ${lat}, Long: ${lon}`;
		}
	};

	const handleSearch = async (event) => {
		event.preventDefault();
		const { latitude, longitude } = await getCoordinatesFromAddress(location);
		fetchBloodBanksNearMe(1, latitude, longitude, bloodType);
	};

	const getCoordinatesFromAddress = async (address) => {
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_KEY}`
			);
			const data = await response.json();
			if (data.results && data.results.length > 0) {
				const { lat, lng } = data.results[0].geometry.location;
				return { latitude: lat, longitude: lng };
			} else {
				throw new Error("No coordinates found for the given address.");
			}
		} catch (error) {
			console.error("Error fetching coordinates:", error);
			return { latitude: 0, longitude: 0 };
		}
	};

	const fetchBloodBanksNearMe = async (
		page,
		latitude,
		longitude,
		bloodGroup
	) => {
		try {
			const res = await axios.get(
				`https://bc-latest.onrender.com/hospitals/near-me`,
				{
					params: {
						page,
						perPage: 2,
						longitude,
						latitude,
						bloodGroup,
					},
				}
			);
			console.log(res.data);
			const hospitals = (res.data.hospitals || []).map((hospital) => ({
				...hospital,
				pic: hospital.pic || "https://via.placeholder.com/366x262", // Placeholder image
				proximity: hospital.proximity || (Math.random() * 10).toFixed(2), // Dummy proximity
			}));
			setBloodBanks(hospitals);
			setTotalPages(Math.ceil(res.data.total / 2)); // Assuming the API returns the total count of hospitals
		} catch (error) {
			console.log("error", error);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div className="px-[100px]">
			<form
				className="flex justify-center mt-10"
				onSubmit={handleSearch}
			>
				<div className="flex items-center justify-center gap-3 w-1/3">
					<Input
						type="text"
						placeholder="Location"
						value={location}
						className="placeholder:text-sm text-sm text-black/70 border-[#2C2C2C]/10"
						onChange={(e) => setLocation(e.target.value)}
					/>
					<select
						value={bloodType}
						onChange={(e) => setBloodType(e.target.value)}
						className="placeholder:text-sm text-black/70 border-[#2C2C2C]/10 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<option
							value=""
							disabled
						>
							Select Blood Type
						</option>
						{bloodTypes.map((type) => (
							<option
								key={type}
								value={type}
							>
								{type}
							</option>
						))}
					</select>
					<Button
						type="submit"
						className="text-white bg-[#C01A2C]"
					>
						Search
					</Button>
				</div>
			</form>

			<div className="mt-16">
				<h1 className="font-semibold text-[#333] text-[30px] mb-6">
					Blood Banks Near You
				</h1>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
					{bloodBanks.length > 0 ? (
						bloodBanks.map((bloodbank, index) => (
							<div
								key={index}
								className="flex flex-col"
							>
								<div className="mb-2">
									<img
										src={bloodbank.pic}
										alt={`${bloodbank.name}'s picture`}
										className="object-cover w-[366px] h-[262px] rounded-[14px]"
									/>
								</div>
								<div className="space-y-1">
									<Link
										href="/"
										className="font-semibold"
									>
										{bloodbank.name}
									</Link>

									<div className="flex items-center justify-between">
										<p className="text-black/70 text-sm">
											{bloodbank.pints || "N/A"} pints
										</p>
										<p className="text-black/70 text-sm flex items-center">
											<Locate className="text-black/70 text-xs mr-2" />
											{bloodbank.proximity || "N/A"} km
										</p>
									</div>
								</div>
							</div>
						))
					) : (
						<p>No blood banks found.</p>
					)}
				</div>
				<div className="flex justify-center mt-6">
					<button
						onClick={handlePreviousPage}
						disabled={currentPage === 1}
						className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:bg-gray-400"
					>
						Previous
					</button>
					<span className="px-4 py-2 mx-1">
						Page {currentPage} of {totalPages}
					</span>
					<button
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
						className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:bg-gray-400"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
