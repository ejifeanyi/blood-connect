import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const page = () => {
	return (
		<div>
			{/* <Nav /> */}
			<div className="mt-[90px] px-[100px]">
				<div className="flex flex-col items-center justify-center">
					<h1 className="text-[30px] font-bold text-[#333] mb-[14px]">
						Lagos University Teaching Hospital (LUTH)
					</h1>
					<p className="text-sm text-[#333] w-[482px] text-center">
						Go to{" "}
						<span className="text-[#C01A2C]">
							Ishaga Rd, Idi-Araba, Lagos 102215, Lagos,
						</span>{" "}
						or <span className="text-[#916400]">call 0807 059 1395</span> to
						book.
					</p>
				</div>

				<div>Bento grid</div>

				<div className="mt-[150px] mb-[60px]">
					<h2 className="font-semibold text-[30px] text-[#333] mb-4">
						Wanna Donate Blood and Save Life?
					</h2>
					<p className="text-[#5C5C5C] w-[545px]">
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry.
					</p>
				</div>

				<div className="w-full bg-[#333] rounded-[14px] py-10 px-14 flex items-center justify-between gap-8 mb-20">
					<div>
						<h3 className="text-white font-medium text-[30px] mb-1">
							Start Here
						</h3>
						<p className="max-w-[636px] text-white">
							By clicking continue, you will be able to book your date to donate
							your blood to this hospital.
						</p>
					</div>
					<form className="flex items-center bg-white p-1 rounded-[8px]">
						<Input
							placeholder="Enter email address"
							className="placeholder:text-[#898989] font-light mr-2 text-xs outline-none focus:outline-none"
						/>
						<Button className="bg-[#F95655] text-xs font-light text-white">
							Continue
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default page;
