"use client";

import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="mx-auto max-w-5xl p-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Your Cart
      </h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <p className="font-medium text-gray-800">
                {item.name}
              </p>
              <p className="text-sm text-gray-500">
                ₹{item.price} × {item.quantity}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-sm text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-lg font-semibold">
          Total: ₹{totalPrice}
        </p>

        <button
          onClick={clearCart}
          className="rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
