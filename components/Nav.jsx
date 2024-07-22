"use client";

import { Badge } from "lucide-react";
import Image from "next/image";
import React from "react";

const Nav = () => {
	return (
		<div className="flex items-center justify-between py-4">
			<Image
				href="/"
				height="40px"
				width="40px"
				alt="Blood-connect"
				src=""
			/>
			<Badge />
		</div>
	);
};

export default Nav;
