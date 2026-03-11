import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToWishlist,
    removeFromWishlist,
} from "../redux/slices/wishlistSlice";
import { FaHeart } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const HotelDetail = () => {
    const { id } = useParams();

    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.items);

    const isWishlisted = wishlist.some((item) => item.id === id);
    const images = hotel?.hotelImages || [];

    useEffect(() => {
        const fetchHotel = async () => {
            setLoading(true);

            try {
                const options = {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "X-API-Key": import.meta.env.VITE_API_KEY,
                    },
                };

                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/v3.0/data/hotel?hotelId=${id}&timeout=10`,
                    options,
                ).then((response) => response.json());
                setHotel(response.data);
            } catch (error) {
                console.error(error);
            }

            setLoading(false);
        };

        fetchHotel();
    }, [id]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) =>
                prev === images.length - 1 ? 0 : prev + 1,
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    else if (!hotel)
        return <p className="text-center mt-20">Hotel Not Found</p>;

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Title */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold">{hotel.name}</h1>

                    <p className="text-gray-500 mt-1">{hotel.city}</p>
                </div>

                <button
                    onClick={() =>
                        isWishlisted
                            ? dispatch(removeFromWishlist({
                                id: hotel.id,
                                      name: hotel.name,
                                      city: hotel.city,
                                      countryCode: hotel.country?.toUpperCase(),
                                      rating: hotel.rating,
                                      reviewCount: hotel.reviewCount,
                                      description: hotel.hotelDescription,
                                      image: hotel.main_photo,
                            }))
                            : dispatch(
                                  addToWishlist({
                                      id: hotel.id,
                                      name: hotel.name,
                                      city: hotel.city,
                                      countryCode: hotel.country?.toUpperCase(),
                                      rating: hotel.rating,
                                      reviewCount: hotel.reviewCount,
                                      description: hotel.hotelDescription,
                                      image: hotel.main_photo,
                                  }),
                              )
                    }
                    className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition duration-200 border border-gray-300 cursor-pointer"
                >
                    <FaHeart
                        className={
                            isWishlisted ? "text-red-500" : "text-gray-400"
                        }
                    />
                </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-4">
                <span className="bg-primary text-white px-2 py-1 rounded-md text-sm">
                    ⭐ {hotel.rating}
                </span>

                <span className="text-gray-600 text-sm">
                    ({hotel.reviewCount} reviews)
                </span>
            </div>

            {/* Image */}
            <div className="relative mt-6 overflow-hidden rounded-xl">
                <img
                    src={images[currentImage]?.url}
                    alt="hotel"
                    className="w-full aspect-video object-cover rounded-xl"
                />

                {/* Left Arrow */}
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-white/80 rounded-full shadow-md hover:bg-white transition"
                    onClick={() =>
                        setCurrentImage(
                            currentImage === 0
                                ? images.length - 1
                                : currentImage - 1,
                        )
                    }
                >
                    <FaChevronLeft />
                </button>

                {/* Right Arrow */}
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-white/80 rounded-full shadow-md hover:bg-white transition"
                    onClick={() =>
                        setCurrentImage(
                            currentImage === images.length - 1
                                ? 0
                                : currentImage + 1,
                        )
                    }
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Thumbnail list */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img.url}
                        onClick={() => setCurrentImage(index)}
                        className={`h-16 w-24 object-cover rounded-md cursor-pointer border-2 transition
                        ${
                            currentImage === index
                                ? "border-primary"
                                : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                    />
                ))}
            </div>

            {/* Description */}
            <div
                className="prose max-w-none mt-8"
                dangerouslySetInnerHTML={{ __html: hotel.hotelDescription }}
            />

            {/* Amenities */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {hotel.facilities
                        ?.slice(0, showAll ? hotel.facilities.length : 12)
                        .map((facility) => (
                            <div
                                key={facility.facilityId}
                                className="bg-gray-100 px-3 py-2 rounded-md text-md"
                            >
                                ⭐ {facility.name}
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-4 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition cursor-pointer"
                >
                    {showAll ? "Show Less Amenities" : "Show All Amenities"}
                </button>
            </div>
        </div>
    );
};

export default HotelDetail;
