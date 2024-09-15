import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useAppQueryParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const mergeQueryParams = (newParams: Record<string, string>) => {
    // Create a new URLSearchParams object to hold both current and new params
    const params = new URLSearchParams(searchParams.toString());

    // Add or update the new query parameters
    Object.keys(newParams).forEach((key) => {
      params.set(key, newParams[key]);
    });

    // Push the updated query params to the router
    router.push(`${pathname}?${params.toString()}`);
  };

  return { searchParams, mergeQueryParams };
};
