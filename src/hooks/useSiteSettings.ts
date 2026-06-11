import { useQuery } from "@tanstack/react-query";
import { getSiteSettings, listMenuItems } from "@/lib/cms.functions";

export function siteSettingsQuery() {
  return {
    queryKey: ["cms", "settings"] as const,
    queryFn: () => getSiteSettings(),
    staleTime: 60_000,
  };
}

export function useSiteSettings() {
  const { data } = useQuery(siteSettingsQuery());
  return data ?? null;
}

export function menuItemsQuery() {
  return {
    queryKey: ["cms", "menu-items"] as const,
    queryFn: () => listMenuItems(),
    staleTime: 60_000,
  };
}

export function useMenuItems(location: string) {
  const { data } = useQuery(menuItemsQuery());
  return (data ?? []).filter((i) => i.location === location);
}
