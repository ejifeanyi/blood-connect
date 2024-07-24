"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";
import TopDonors from "@/components/Top-donors";

const page = () => {
	const [bloodBanks, setBloodBanks] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [location, setLocation] = useState("");
	const [bloodType, setBloodType] = useState("");
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);

	const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

	useEffect(() => {
		const fetchBloodBanks = async () => {
			try {
				const response = await axios.get(
					"https://bc-latest.onrender.com/hospitals",
					{
						params: {
							page: currentPage,
							perPage: 10,
						},
					}
				);
				console.log(response.data.data);
				setBloodBanks(response.data.data.hospitals);
				setTotalPages(response.data.data.total);
			} catch (error) {
				console.error("Error fetching blood banks:", error);
			}
		};

		fetchBloodBanks();
	}, [currentPage]);

	useEffect(() => {
		const getLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						setLatitude(position.coords.latitude);
						setLongitude(position.coords.longitude);
					},
					(error) => {
						console.error("Error getting location:", error);
					}
				);
			} else {
				console.error("Geolocation is not supported by this browser.");
			}
		};

		getLocation();
	}, []);

	const handleSearch = async (event) => {
		event.preventDefault();
		if (!latitude || !longitude || !bloodType) {
			alert("Please provide all search criteria: location and blood type.");
			return;
		}

		try {
			const response = await axios.get(
				"https://bc-latest.onrender.com/hospitals/near-me",
				{
					params: {
						page: currentPage,
						perPage: 10,
						longitude: longitude,
						latitude: latitude,
						bloodGroup: bloodType,
						search: location,
					},
				}
			);
			setBloodBanks(response.data.hospitals);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error("Error fetching nearby blood banks:", error);
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

	const handleLocationChange = (e) => {
		const value = e.target.value;
		setLocation(value);
		// Geocode the location to get latitude and longitude
		// This is a placeholder. You need a geocoding API or browser geolocation to get these values
		// setLatitude(lat);
		// setLongitude(lng);
	};

	return (
		<div className="px-5 sm:px-[100px]">
			<form
				className="flex justify-center mt-10"
				onSubmit={handleSearch}
			>
				<div className="flex items-center justify-center gap-3 w-full sm:w-1/3">
					<Input
						type="text"
						placeholder="Location"
						value={location}
						className="placeholder:text-sm text-sm text-black/70 border-[#2C2C2C]/10 w-full sm:w-[228px]"
						onChange={handleLocationChange}
					/>
					<select
						value={bloodType}
						onChange={(e) => setBloodType(e.target.value)}
						className="placeholder:text-sm text-black/70 border-[#2C2C2C]/10 flex h-10 w-full sm:w-[228px] rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

			<TopDonors />

			<div className="mt-16">
				<h1 className="font-semibold text-[#333] text-xl mb-4 md:text-[30px] md:mb-6">
					Blood Banks Near You
				</h1>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
					{bloodBanks.length > 0 ? (
						bloodBanks.map((bloodbank, index) => (
							<div
								key={index}
								className="flex flex-col"
							>
								<div className="mb-2 w-full h-[200px]">
									<img
										src={bloodbank.pic}
										alt={`${bloodbank.name}'s picture`}
										className="object-cover w-full h-full rounded-[14px] bg-gray-400"
									/>
								</div>
								<div className="space-y-1">
									<Link
										href={`/hospitals/${bloodbank.id}`}
										className="font-semibold text-sm sm:text-base"
									>
										{bloodbank.name}
									</Link>
									<div className="flex items-center justify-between">
										<p className="text-black/70 text-xs sm:text-sm">
											{bloodbank.pints || "N/A"} pints
										</p>
										<p className="text-black/70 text-xs sm:text-sm flex items-center">
											<MapPin
												size={16}
												strokeWidth={1}
												absoluteStrokeWidth
												className="text-black/70 text-xs mr-1"
											/>
											{bloodbank.proximity || "N/A"} KM
										</p>
									</div>
								</div>
							</div>
						))
					) : (
						<p>No blood banks found.</p>
					)}
				</div>

				<div className="flex items-center justify-end mt-6 text-sm">
					<Button
						onClick={handlePreviousPage}
						disabled={currentPage === 1}
						variant="ghost"
					>
						Previous
					</Button>
					<span>
						Page {currentPage} of {totalPages}
					</span>
					<Button
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
						variant="ghost"
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default page;
