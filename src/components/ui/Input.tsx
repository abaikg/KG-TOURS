import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, type = "text", ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-forest-800 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-500">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "nature-input",
                            icon && "pl-12",
                            error && "border-red-500 focus:border-red-500",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
