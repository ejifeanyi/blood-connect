import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const DonorsTable = ({ donors }) => {
	return (
		<div className="p-6 w-full">
			<Table>
				<TableHeader className="bg-[#1E2833]">
					<TableRow className="p-2">
						<TableHead className="text-white font-semibold text-base">
							ID
						</TableHead>
						<TableHead className="text-white font-semibold text-base">
							Name
						</TableHead>
						<TableHead className="text-white font-semibold text-base">
							Sex
						</TableHead>
						<TableHead className="text-white font-semibold text-base">
							Age
						</TableHead>
						<TableHead className="text-white font-semibold text-base">
							Blood Group
						</TableHead>
						<TableHead className="text-white font-semibold text-base">
							Quantity Donated
						</TableHead>
						<TableHead className="text-white font-semibold text-base">
							Address
						</TableHead>
						<TableHead className="text-white font-semibold text-base">
							Phone
						</TableHead>
						<TableHead className="text-white font-semibold text-base">
							Date
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{donors.map((donor) => (
						<TableRow key={donor.id}>
							<TableCell>{donor.id}</TableCell>
							<TableCell>{donor.name}</TableCell>
							<TableCell>{donor.sex}</TableCell>
							<TableCell>{donor.age}</TableCell>
							<TableCell>{donor.bloodGroup}</TableCell>
							<TableCell>{donor.qtyDonated}</TableCell>
							<TableCell>{donor.address}</TableCell>
							<TableCell>{donor.phone}</TableCell>
							<TableCell>{donor.date}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default DonorsTable;
