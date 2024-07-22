const BloodPintQuantity = ({ type, quantity }) => {
	return (
		<div className="min-w-[170px] h-[120px] bg-[#text-white/100] bg-[#FAFAFA] rounded-lg p-6 flex flex-col justify-center">
			<p className="font-medium text-black/70 text-sm">{type}</p>
			<p className="font-extrabold text-black text-lg">{quantity} Pints</p>
		</div>
	);
};

export default BloodPintQuantity;
