export const reverseGeocode = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
      {
        headers: {
          "User-Agent": "DeliveryApp/1.0",
        },
      },
    );

    if (!response.ok) throw new Error("Geocoding failed");

    const data = await response.json();
    const address = data.address;

    // Construct street address
    const streetParts = [
      address.house_number,
      address.road || address.street,
    ].filter(Boolean);

    // Construct area/neighborhood
    const areaParts = [
      address.neighborhood || address.suburb || address.district,
      address.city || address.town || address.village,
    ].filter(Boolean);

    return {
      streetAddress: streetParts.join(" ") || data.display_name.split(",")[0],
      areaNeighborhood:
        areaParts.join(", ") ||
        data.display_name.split(",").slice(1, 3).join(",").trim(),
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    throw new Error("Could not convert location to address");
  }
};
