import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@repo/ui/base/accordion";

function ReceiveDisclaimer() {
	return (
		<section className="my-6 md:my-10">
			<p className="text-sm text-muted-foreground">
				The app will provide a wallet address to share with the sender -
				separate from your main address.
			</p>
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="wallet-info">
					<AccordionTrigger className="font-medium">
						Why a new wallet address?
					</AccordionTrigger>
					<AccordionContent className="text-muted-foreground">
						To help protect your privacy, this app will try to use a new wallet
						address when possible. This makes it harder for others to track your
						total balance. It's safe to share — addresses can only be used to
						receive funds, not send them.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	);
}

export { ReceiveDisclaimer };
