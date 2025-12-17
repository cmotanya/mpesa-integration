import { reverseGeocode } from "./reverseLocation";
import { HandleLocationProps } from "./types";

export const handleLocationClick = async ({
  setIsGettingLocation,
  setLocationError,
  form,
}: HandleLocationProps) => {
  if (!navigator.geolocation) {
    setLocationError("Geolocation is not supported by your browser");
    return;
  }

  setIsGettingLocation(true);
  setLocationError(null);

  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      },
    );

    const { latitude, longitude } = position.coords;

    // Get address from coordinates
    const addressData = await reverseGeocode(latitude, longitude);

    form.setValue("streetAddress", addressData.streetAddress, {
      shouldValidate: true,
      shouldDirty: true,
    });
    form.setValue("areaNeighborhood", addressData.areaNeighborhood, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Smooth scroll to form to show populated fields
    setTimeout(() => {
      const formElement = document.querySelector('input[name="streetAddress"]');
      formElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setLocationError(
            "Location permission denied. Please enable location access in your browser settings.",
          );
          break;
        case error.POSITION_UNAVAILABLE:
          setLocationError(
            "Location information unavailable. Please try again.",
          );
          break;
        case error.TIMEOUT:
          setLocationError("Location request timed out. Please try again.");
          break;
      }
    } else {
      setLocationError(
        "Could not get your location. Please enter address manually.",
      );
    }
  } finally {
    setIsGettingLocation(false);
  }
};
