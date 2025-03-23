import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getTimeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};