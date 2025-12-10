// Adds an item to the cart or increments its quantity if it already exists
export const addToCart = <T extends { id: string; quantity: number }>(
  cartItems: T[],
  itemToAdd: T,
  setCartItems: React.Dispatch<React.SetStateAction<T[]>>,
): T[] => {
  const existingItem = cartItems.find((item) => item.id === itemToAdd.id);

  setCartItems((cartItems) => {
    if (existingItem) {
      return cartItems.map((item) =>
        item.id === itemToAdd.id
          ? { ...item, quantity: item.quantity + itemToAdd.quantity }
          : item,
      );
    }
    return [...cartItems, { ...itemToAdd, quantity: 1 }];
  });

  return cartItems;
};

// Updates the quantity of a specific item in the cart
export const updateQuantity = <T extends { id: string; quantity: number }>(
  cartItems: T[],
  itemId: string,
  quantity: number,
  change: number,
  setCartItems: React.Dispatch<React.SetStateAction<T[]>>,
): T[] => {
  setCartItems((cartItems) =>
    cartItems
      .map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0),
  );
  return cartItems;
};

// Removes an item from the cart entirely
export const removeFromCart = <T extends { id: string }>(
  cartItems: T[],
  itemId: string,
  setCartItems: React.Dispatch<React.SetStateAction<T[]>>,
): T[] => {
  setCartItems((cartItems) => cartItems.filter((item) => item.id !== itemId));

  return cartItems;
};

// Clears all items from the cart
export const clearCart = <T extends { id: string; quantity: number }>(
  setCartItems: React.Dispatch<React.SetStateAction<T[]>>,
) => {
  setCartItems([]);
};

// Calculates total price of items in the cart
export const calculateTotal = <T extends { price: number; quantity: number }>(
  cartItems: T[],
): number => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};

// Calculates subtotal before tax
export const calculateSubtotal = <
  T extends { price: number; quantity: number },
>(
  cartItems: T[],
): number => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};

// Calculates grand total by adding subtotal and delivery fee
export const calculateGrandTotal = (
  subtotal: number,
  deliveryFee: number,
): number => {
  return subtotal + deliveryFee;
};

// Formats a number as currency (e.g., $12.34)
export const formatCurrency = (amount: number, currency = "KES"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

// Formats a date to a readable string
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Formats a time to a readable string
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

// Combines date and time formatting
export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
};
