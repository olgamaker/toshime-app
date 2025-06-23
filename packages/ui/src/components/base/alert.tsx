"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircleIcon, AlertTriangle, Info } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

const alertVariants = cva(
	"relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]+*:ml-7",
	{
		variants: {
			variant: {
				default: "bg-background text-foreground",
				destructive:
					"border-destructive/50 text-destructive dark:border-destructive",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface AlertProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof alertVariants> {
	variant?: "default" | "destructive";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	({ className, variant = "default", ...props }, ref) => {
		return (
			<div
				ref={ref}
				role="alert"
				className={cn(alertVariants({ variant }), className)}
				{...props}
			/>
		);
	},
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h5
		ref={ref}
		className={cn("mb-1 font-medium leading-none tracking-tight", className)}
		{...props}
	/>
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-sm [&_p]:leading-relaxed", className)}
		{...props}
	/>
));
AlertDescription.displayName = "AlertDescription";

const AlertIcon = ({ variant }: { variant?: "default" | "destructive" }) => {
	if (variant === "destructive") {
		return <AlertTriangle className="h-4 w-4" />;
	}
	return <Info className="h-4 w-4" />;
};

export { Alert, AlertTitle, AlertDescription, AlertIcon, AlertCircleIcon };
