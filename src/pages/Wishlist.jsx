import React, { useState, useEffect } from "react";
import HotelCard from "../components/HotelCard";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "../redux/slices/wishlistSlice";
const Wishlist = () => {
    const wishlist = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const fetchPrices = async (hotelIds) => {
        setLoading(true);
        try {
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": import.meta.env.VITE_API_KEY,
                },
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/v3.0/prices/hotels?hotelIds=${hotelIds.join(",")}`,
                options,
            ).then((res) => res.json());

            const updatedWishlist = mergePrices(wishlist, response);
            dispatch(setWishlist(updatedWishlist));
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        const hotelIds = wishlist
            .filter((hotel) => !hotel.price)
            .map((hotel) => hotel.id);

        if (hotelIds.length === 0) return;

        fetchPrices(hotelIds);
    }, []);

    const mergePrices = (hotels, priceData) => {
        const priceMap = {};

        priceData?.data?.forEach((item) => {
            const todayPrice = item.prices?.[0]?.avgPriceUsd;
            if (todayPrice) {
                priceMap[item.hotelId] = todayPrice;
            }
        });

        return hotels.map((hotel) => ({
            ...hotel,
            price: priceMap[hotel.id] || hotel.price || null,
        }));
    };

    return (
        <div className="min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Your Wishlist
            </h1>
            {wishlist.length === 0 ? (
                <p className="text-center text-primary text-lg">
                    No hotels in your wishlist
                </p>
            ) : loading ? (
                <p className="text-center text-primary text-lg">
                    Loading wishlist...
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {wishlist.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
