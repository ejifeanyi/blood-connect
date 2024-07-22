"use client";

import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
	const [activeLink, setActiveLink] = useState("Dashboard");

	const links = [
		{ name: "Dashboard", href: "/dashboard" },
		{ name: "Appointments", href: "/appointments" },
		{ name: "Blood Quantity", href: "/blood-quantity" },
		{ name: "Donors", href: "/donors" },
		{ name: "Settings", href: "/settings" },
	];

	const logout = { name: "Logout", href: "/logout" };

	return (
		<div className="max-w-[288px] w-full h-screen pt-[155px] px-10 bg-[#C01A2C] mr-6">
			{links.map((link) => (
				<div
					key={link.name}
					className={`px-3 py-[14px] w-full rounded-[4px] mb-1 text-white/70 hover:bg-white/20 ${
						activeLink === link.name ? "bg-white/20 text-white/100" : ""
					}`}
					onClick={() => setActiveLink(link.name)}
				>
					<Link
						href={link.href}
						className="text-lg font-medium"
					>
						{link.name}
					</Link>
				</div>
			))}

			<div
				key={logout.name}
				className={`px-3 py-[14px] w-full rounded-[4px] mt-12 text-white/70 hover:bg-white/20 ${
					activeLink === logout.name ? "bg-white/20 text-white/100" : ""
				}`}
				onClick={() => setActiveLink(logout.name)}
			>
				<Link
					href={logout.href}
					className="text-lg font-medium"
				>
					{logout.name}
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
