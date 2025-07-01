import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } =
    useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;

    try {
      setLoading(true);

      const orderData = {
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          restaurantId: item.restaurantId,
        })),
        totalAmount: getTotalPrice(),
        deliveryAddress: "123 Main St", // In a real app, this would come from user input
        customerInfo: {
          name: "John Doe",
          phone: "+1234567890",
          email: "john@example.com",
        },
      };

      // Replace with actual API call
      // const response = await axios.post('/api/orders', orderData);
      // const orderId = response.data.id;

      // Mock API response
      const orderId = Date.now().toString();

      clearCart();
      navigate(`/track-order/${orderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some delicious items from our restaurants
            </p>
            <Link to="/">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Browse Restaurants
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.restaurantId}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        from {item.restaurantName}
                      </p>
                      <p className="text-green-600 font-semibold">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-right font-semibold">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <h2 className="text-xl font-bold">Order Summary</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>$2.99</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>
                      $
                      {(
                        getTotalPrice() +
                        2.99 +
                        getTotalPrice() * 0.08
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </Button>

                <Link to="/" className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
