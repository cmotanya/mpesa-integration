import useDeliveryZones from "../hooks/deliveryZones";
import { MapPin } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const DeliveryLocationPicker = () => {
  const { area, setDeliveryArea } = useCart();

  const { data: zones = [], isLoading } = useDeliveryZones();

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "") {
      setDeliveryArea("", 0);
      return;
    }

    const selectedArea = zones.find((zone) => zone.area_name === value);

    if (selectedArea) {
      setDeliveryArea(selectedArea.area_name, selectedArea.fee);
    }
  };

  return (
    <div className="bg-background border-accent shadow-accent/30 flex items-center justify-around rounded-xl border px-2 py-3 shadow-md transition-all duration-200 active:border-2">
      <MapPin className="text-accent" />
      <select
        value={area || ""}
        onChange={handleAreaChange}
        name="location-picker"
        id="location-picker"
        className="text-text/80 placeholder:text-text/50 cursor-pointer border-0 bg-transparent text-sm font-medium outline-none focus:ring-0 sm:text-base"
      >
        <option value="">Select Your Pick Up Location</option>
        {isLoading ? (
          <option disabled>Loading...</option>
        ) : (
          zones.map((zone) => (
            <option key={zone.id} value={zone.area_name}>
              {zone.area_name}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default DeliveryLocationPicker;
