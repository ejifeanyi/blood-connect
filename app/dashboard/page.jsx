import BloodPintQuantity from "@/components/Blood-pints-quanty";
import DonorsTable from "@/components/Donors-table";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Page = () => {
	// Example data, replace this with data fetched from your backend
	const bloodData = [
		{ type: "A+", quantity: 900 },
		{ type: "A-", quantity: 400 },
		{ type: "B+", quantity: 500 },
		{ type: "B-", quantity: 300 },
		{ type: "O+", quantity: 1000 },
		{ type: "O-", quantity: 200 },
		{ type: "AB+", quantity: 100 },
		{ type: "AB-", quantity: 50 },
	];

	const donors = [
		{
			id: "BC001",
			name: "Aisha Bello",
			sex: "Female",
			age: 27,
			bloodGroup: "AB-",
			qtyDonated: 2,
			address: "Victoria Island, Lagos.",
			phone: "0803427651",
			date: "May 3rd, 2024",
		},
		{
			id: "BC002",
			name: "John Doe",
			sex: "Male",
			age: 30,
			bloodGroup: "O+",
			qtyDonated: 3,
			address: "Lekki, Lagos.",
			phone: "0801234567",
			date: "June 1st, 2024",
		},
		// Add more donors as needed
	];

	return (
		<div className="flex h-screen">
			<Sidebar className="h-screen" />

			<div className="flex-1 flex flex-col overflow-y-auto p-6">
				<div className="flex gap-6">
					{bloodData.map((blood) => (
						<BloodPintQuantity
							key={blood.type}
							type={blood.type}
							quantity={blood.quantity}
						/>
					))}
				</div>

				<DonorsTable donors={donors} />

				<div className="flex gap-5 justify-end items-center mt-4">
					<Button variant="ghost" size="icon">
						<ChevronLeft className="text-sm text-black" />
					</Button>
					<Button variant="ghost" size="icon">
						<ChevronRight className="text-sm text-black" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Page;
