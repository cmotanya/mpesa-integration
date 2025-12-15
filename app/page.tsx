import { Button } from "@/components/button";
import { Info, ShoppingBagIcon, Sparkle } from "lucide-react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

const FoodLandingPage = () => {
  const imgUrl =
    "https://images.pexels.com/photos/262918/pexels-photo-262918.jpeg";
  return (
    <section
      id="home"
      className="relative flex h-full min-h-screen w-full flex-col items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={imgUrl}
          alt="Delicious food background"
          width={2000}
          height={1400}
          className="h-full w-full object-cover"
        />

        <div className="bg-text/50 absolute inset-0 z-0" />
      </div>

      <div className="z-50">
        <div className="space-y-4 text-center">
          <Fade direction="down" duration={100} damping={0.5} triggerOnce>
            <div>
              <Sparkle className="text-secondary ml-auto size-4" />
              <h1 className="text-accent text-3xl font-bold uppercase">
                Fresh and Delicious Meals
              </h1>
            </div>

            <p className="mx-auto mb-12 max-w-2xl leading-relaxed font-medium text-balance text-white sm:text-2xl">
              Discover our handcrafted menu featuring premium ingredients and
              authentic flavors delivered right to your door
            </p>
          </Fade>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Fade
            direction="left"
            delay={100}
            duration={100}
            damping={0.5}
            triggerOnce
          >
            <Button
              href="/menu"
              className="flex w-fit items-center justify-center uppercase"
            >
              <ShoppingBagIcon />
              Order Now
            </Button>
          </Fade>

          <Fade
            direction="right"
            delay={100}
            duration={100}
            damping={0.5}
            triggerOnce
          >
            <Button
              href=""
              className="bg-accent/10 border-accent/50 flex w-fit items-center justify-center border font-medium text-white uppercase backdrop-blur-md"
            >
              <Info />
              Learn More
            </Button>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default FoodLandingPage;
