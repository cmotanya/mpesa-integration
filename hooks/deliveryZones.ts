import { supabase } from "@/lib/supabase";
import { DeliveryZonesProps } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const useDeliveryZones = () => {
  return useQuery<DeliveryZonesProps[]>({
    queryKey: ["delivery-zones"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("delivery_zones")
        .select("*")
        .eq("is_active", true)
        .order("fee", { ascending: true });

      if (error) throw new Error(error.message);

      return data ?? [];
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

export default useDeliveryZones;
