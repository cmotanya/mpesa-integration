import { Fade } from "react-awesome-reveal";

const DeliveryAddress = () => {
  return (
    <div className="my-4">
      <div className="mb-4">
        <Fade cascade duration={100} delay={100} direction="up" damping={0.5}>
          <p className="font-bold">Delivery Address</p>
          <p className="text-text/70 text-sm">
            Where should we deliver your order?
          </p>
        </Fade>
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <Fade cascade duration={100} delay={200} direction="up" damping={0.5}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Street Address"
            className="ring-primary/30 bg-primary/5 focus:ring-primary/50 w-full rounded-full py-3 ps-4 shadow-sm ring transition-all duration-200 ease-in-out focus:ring-2 focus:outline-none"
          />

          <input
            type="tel"
            name=""
            id=""
            placeholder="Mobile Number"
            className="ring-primary/30 bg-primary/5 focus:ring-primary/50 w-full rounded-full py-3 ps-4 shadow-sm ring transition-all duration-200 ease-in-out focus:ring-2 focus:outline-none"
          />
        </Fade>
      </div>
    </div>
  );
};

export default DeliveryAddress;
