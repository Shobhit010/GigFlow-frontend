import { cn } from "../../utils/cn";

export const Skeleton = ({
    className,
    ...props
}) => {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-zinc-800/50", className)}
            {...props}
        />
    );
};
