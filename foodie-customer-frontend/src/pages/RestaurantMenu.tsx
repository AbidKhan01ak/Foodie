import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MenuItemCard from "@/components/MenuItemCard";
import { MenuItem } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RestaurantDetails {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  description?: string;
}

// Mock data for demonstration
const mockRestaurant: RestaurantDetails = {
  id: "1",
  name: "Mario's Pizzeria",
  cuisine: "Italian",
  rating: 4.5,
  deliveryTime: "25-35 min",
  deliveryFee: 2.99,
  description: "Authentic Italian pizza made with fresh ingredients",
};

const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, basil, and olive oil",
    price: 16.99,
    category: "Pizza",
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with mozzarella cheese",
    price: 18.99,
    category: "Pizza",
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Romaine lettuce, parmesan, croutons, and caesar dressing",
    price: 12.99,
    category: "Salads",
  },
  {
    id: "4",
    name: "Chicken Alfredo",
    description: "Grilled chicken with creamy alfredo sauce over fettuccine",
    price: 19.99,
    category: "Pasta",
  },
  {
    id: "5",
    name: "Garlic Bread",
    description: "Fresh baked bread with garlic butter and herbs",
    price: 6.99,
    category: "Appetizers",
  },
];

const RestaurantMenu = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRestaurantAndMenu(id);
    }
  }, [id]);

  const fetchRestaurantAndMenu = async (restaurantId: string) => {
    try {
      setLoading(true);
      // Replace with actual API calls
      // const [restaurantResponse, menuResponse] = await Promise.all([
      //   axios.get(`/api/restaurants/${restaurantId}`),
      //   axios.get(`/api/restaurants/${restaurantId}/menu`)
      // ]);
      // setRestaurant(restaurantResponse.data);
      // setMenuItems(menuResponse.data);

      // Using mock data for now
      setTimeout(() => {
        setRestaurant(mockRestaurant);
        setMenuItems(mockMenuItems);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading menu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Restaurant not found
          </h2>
          <Link to="/">
            <Button>Back to Restaurants</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Group menu items by category
  const itemsByCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="text-orange-600 hover:text-orange-700 mb-4 inline-block"
          >
            ← Back to Restaurants
          </Link>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
              <div className="text-4xl">🍽️</div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {restaurant.name}
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  ⭐ {restaurant.rating}
                </Badge>
              </div>

              <p className="text-lg text-gray-600 mb-4">{restaurant.cuisine}</p>

              {restaurant.description && (
                <p className="text-gray-700 mb-4">{restaurant.description}</p>
              )}

              <div className="flex gap-4 text-sm text-gray-600">
                <span>🕒 {restaurant.deliveryTime}</span>
                <span>🚚 ${restaurant.deliveryFee.toFixed(2)} delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Object.entries(itemsByCategory).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {category}
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  restaurantId={restaurant.id}
                  restaurantName={restaurant.name}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
