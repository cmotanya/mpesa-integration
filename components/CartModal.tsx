import { CartItem, CartModalProps } from "@/utils/types";
import { ArrowLeft, ShoppingBag, X } from "lucide-react";
import { Button } from "./button";
import { Fade } from "react-awesome-reveal";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export const CartModal = ({ showCart, setShowCart }: CartModalProps) => {
  const { cart, clearCart, removeFromCartItem } = useCart();
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleClickDelete = (item: CartItem) => {
    setIsDeleting(true);

    setTimeout(() => {
      removeFromCartItem(item.id);
    }, 300);
  };

  return (
    <>
      <div className="fixed inset-0 top-0 right-0 bottom-0 left-0 z-50 flex w-full items-center justify-center overflow-auto bg-black/50 backdrop-blur-sm">
        <div className="bg-background w-11/12 max-w-md overflow-hidden rounded-lg py-4 shadow-lg">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-primary flex items-center justify-center gap-2 text-2xl font-bold uppercase">
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
              <div className="relative mt-4 max-h-96 overflow-y-auto">
                <Fade direction="down" duration={150} delay={100} triggerOnce>
                  {cart.map((item) => {
                    const isEven = cart.indexOf(item) % 2 === 0;

                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "border-b-accent/30 flex items-center justify-between px-2 py-4",
                          isEven && "bg-secondary/10 shadow-secondary/10",
                        )}
                      >
                        <Fade
                          direction="up"
                          duration={150}
                          delay={150}
                          triggerOnce
                        >
                          <div className="flex flex-row items-center justify-center gap-2">
                            <button
                              className="text-error/80 hover:text-error cursor-pointer transition-colors duration-150 active:scale-95"
                              aria-label={`Remove ${item.name} from cart`}
                              onClick={() => handleClickDelete(item)}
                            >
                              <X className="text-error size-5" />
                            </button>

                            <div>
                              <p className="text-sm font-medium uppercase">
                                {item.name}
                              </p>
                              <p className="text-xs font-medium">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Total: KES{" "}
                              {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </Fade>
                      </div>
                    );
                  })}
                </Fade>
              </div>

              <div className="border-t-accent/80 flex items-center justify-between border-t-2 px-2">
                <Fade direction="left" duration={150} delay={200} triggerOnce>
                  <Button
                    onClick={() => clearCart()}
                    className="bg-error mt-4 ml-auto w-fit cursor-pointer rounded-xl p-3 text-xs font-medium uppercase"
                  >
                    Clear
                  </Button>
                </Fade>

                <Fade direction="right" duration={150} delay={200} triggerOnce>
                  <Button
                    href="/checkout/delivery-address"
                    className="mt-4 ml-auto w-fit cursor-pointer rounded-xl p-3 text-xs font-medium uppercase"
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
