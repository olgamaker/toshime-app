import { QRCodeSVG } from "qrcode.react";

export interface QRCodeProps {
	value: string;
}

function QRCode({ value }: QRCodeProps) {
	return (
		<div className="relative p-6 md:p-10">
			<QRCodeSVG value={value} className="w-full h-full" />
			{/* Corner brackets */}
			<div className="absolute top-2 left-2 w-4 h-4 border-t-4 border-l-4 border-blue-500 rounded-tl-md" />
			<div className="absolute top-2 right-2 w-4 h-4 border-t-4 border-r-4 border-blue-500 rounded-tr-md" />
			<div className="absolute bottom-2 left-2 w-4 h-4 border-b-4 border-l-4 border-blue-500 rounded-bl-md" />
			<div className="absolute bottom-2 right-2 w-4 h-4 border-b-4 border-r-4 border-blue-500 rounded-br-md" />
		</div>
	);
}

export { QRCode };
