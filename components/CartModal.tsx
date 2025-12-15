import { CartModalProps } from "@/utils/types";
import { ArrowLeft, ShoppingBag, X } from "lucide-react";
import { Button } from "./button";
import { Fade } from "react-awesome-reveal";
import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";

export const CartModal = ({ showCart, setShowCart }: CartModalProps) => {
  const { cart, clearFromCart, removeFromCartItem } = useCart();

  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCart]);

  if (!showCart) return null;

  return (
    <>
      <div className="fixed inset-0 top-0 right-0 bottom-0 left-0 z-50 flex w-full items-center justify-center overflow-auto bg-black/50 backdrop-blur-sm">
        <div className="bg-background/90 w-11/12 max-w-md overflow-hidden rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-primary/70 flex items-center justify-center gap-2 text-2xl font-bold uppercase">
              Cart <ShoppingBag className="inline-block size-6" />
            </h2>

            <Fade duration={150} direction="right" cascade>
              <button
                onClick={() => setShowCart(false)}
                className="bg-error flex size-7 cursor-pointer items-center justify-center gap-1 rounded-full text-sm font-medium text-white transition-all duration-200 ease-in-out active:scale-105"
              >
                <X />
              </button>
            </Fade>
          </div>

          {cart.length === 0 ? (
            <Fade direction="up" duration={150} delay={100} triggerOnce>
              <div className="text-text/80 mt-10 flex flex-col items-center justify-center space-y-3 text-center">
                <ShoppingBag className="text-secondary size-16" />
                <h2 className="text-text/70 font-italic text-2xl font-bold">
                  Your cart is empty.
                </h2>
                <p className="text-text/70 text-sm font-medium">
                  Please add some delicious items to your cart!
                </p>

                <Button
                  onClick={() => setShowCart(false)}
                  className="group mt-4 w-fit p-3 transition-all duration-150 hover:scale-105 active:scale-95"
                >
                  <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />{" "}
                  Browse Menu
                </Button>
              </div>
            </Fade>
          ) : (
            <>
              <div className="relative mt-4 max-h-96 space-y-4 overflow-y-auto">
                <Fade
                  direction="down"
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
                      <div className="flex flex-row items-center justify-center gap-2">
                        <button
                          className="text-error/80 hover:text-error transition-colors duration-150 active:scale-95"
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => removeFromCartItem(item.id)}
                        >
                          <X className="text-error size-5" />
                        </button>

                        <div>
                          <p className="text-sm font-bold">{item.name}</p>
                          <p className="text-xs font-medium">
                            Quantity: {item.quantity}
                          </p>
                        </div>
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

              <div className="flex items-center justify-between">
                <Fade direction="up" duration={150} delay={200} triggerOnce>
                  <Button
                    onClick={() => clearFromCart()}
                    className="bg-error mt-4 ml-auto w-fit cursor-pointer p-3 text-sm font-medium uppercase"
                  >
                    Clear
                  </Button>

                  <Button
                    href="/checkout"
                    className="ase mt-4 ml-auto w-fit cursor-pointer p-3 text-sm font-medium uppercase"
                  >
                    Proceed to Checkout
                  </Button>
                </Fade>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
