import { Button } from "@/components/button";
import { cn } from "@/utils/cn";
import { handleLocationClick } from "@/utils/helper/handleLocation";
import { PageSectionProps } from "@/utils/types";
import { Fade } from "react-awesome-reveal";

const PageSection = ({
  IconNavigation,
  IconAlertCircle,
  form,
  title,
  description,
  text,
  isGettingLocation,
  setIsGettingLocation,
  setLocationError,
  locationError,
  children,
}: PageSectionProps) => {
  return (
    <>
      <div className="mt-8 text-center">
        <Fade
          cascade
          duration={100}
          delay={100}
          triggerOnce
          direction="down"
          damping={0.5}
        >
          <p className="text-3xl font-bold uppercase">{title}</p>

          <p className="text-text/70 text-sm font-medium">{description}</p>
        </Fade>
      </div>

      <div
        className={cn(
          "flex flex-col gap-3 space-y-2",
          isGettingLocation && "pointer-events-none opacity-50",
        )}
      >
        <Fade
          cascade
          duration={100}
          delay={200}
          direction="down"
          triggerOnce
          damping={0.5}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <Button
              buttonType="button"
              onClick={() =>
                handleLocationClick({
                  setIsGettingLocation,
                  setLocationError,
                  form,
                })
              }
              className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              <IconNavigation
                className={cn("mr-2", isGettingLocation && "animate-spin")}
                size={20}
              />
              {isGettingLocation
                ? "Getting Current Location..."
                : "Use Current Location"}
            </Button>

            <Fade direction="up" duration={100} damping={0.5} triggerOnce>
              {locationError && (
                <div className="flex max-w-md items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  <IconAlertCircle size={20} className="mt-0.5 shrink-0" />
                  <p>{locationError}</p>
                </div>
              )}
            </Fade>
          </div>
        </Fade>

        <Fade
          cascade
          duration={100}
          delay={300}
          direction="up"
          triggerOnce
          damping={0.5}
        >
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="border-accent/50 w-full border-t-2"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background text-text/50 px-2 text-sm font-medium">
                {text}
              </span>
            </div>
          </div>
        </Fade>

        {children}
      </div>
    </>
  );
};

export default PageSection;
