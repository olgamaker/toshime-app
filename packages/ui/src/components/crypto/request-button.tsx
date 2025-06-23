import { Button } from "@repo/ui/base/button";
import { useFormStatus } from "react-dom";

function RequestButton() {
	const { pending } = useFormStatus?.() ?? { pending: false };

	return (
		<Button type="submit" className="w-full" disabled={pending} size="lg">
			{pending ? "Generating QR code" : "Confirm"}
		</Button>
	);
}

export { RequestButton };
