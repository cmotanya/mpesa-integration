import { CartModalProps } from "@/utils/types";
import { X } from "lucide-react";
import { Button } from "./button";
import { Fade } from "react-awesome-reveal";

export const CartModal = ({ showCart, setShowCart, cart }: CartModalProps) => {
  return (
    <>
      {!showCart ? null : (
        <div className="fixed inset-0 top-0 right-0 bottom-0 left-0 z-50 flex w-full items-center justify-center overflow-auto bg-black/50 backdrop-blur-sm">
          <div className="bg-background/90 w-11/12 max-w-md rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold uppercase">Cart</h2>

              <Fade duration={150} direction="right" cascade>
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-error flex size-7 items-center justify-center gap-1 rounded-full text-sm font-medium text-white transition-all duration-200 ease-in-out active:scale-105"
                >
                  <X />
                </button>
              </Fade>
            </div>

            <div className="relative mt-4 max-h-96 space-y-4 overflow-y-auto">
              {cart.length === 0 && <p className="text-sm">Cart is empty</p>}

              <Fade
                direction="up"
                cascade
                duration={150}
                delay={100}
                triggerOnce
              >
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border-b-secondary/30 flex items-center justify-between border-b py-2"
                  >
                    <div>
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs font-medium">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">
                        Total: KES{" "}
                        {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </Fade>
            </div>

            <Fade direction="right" duration={150} delay={200} triggerOnce>
              <Button
                href="/checkout"
                className="mt-4 ml-auto w-fit p-2 text-sm"
              >
                Proceed to Checkout
              </Button>
            </Fade>
          </div>
        </div>
      )}
    </>
  );
};
