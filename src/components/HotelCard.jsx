import { useNavigate } from "react-router";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    addToWishlist,
    removeFromWishlist,
} from "../redux/slices/wishlistSlice";

const HotelCard = ({ hotel }) => {
    const navigate = useNavigate();
    const wishlist = useSelector((state) => state.wishlist.items);
    const isWishlisted = wishlist.some((item) => item.id === hotel.id);
    const dispatch = useDispatch();

    return (
        <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.01] transition-transform duration-300 ">
            {/* Image */}
            <img
                src={hotel.image}
                alt={hotel.name}
                className="h-48 w-full object-cover"
            />

            {/* Wishlist button */}
            <button
                onClick={() =>
                    isWishlisted
                        ? dispatch(removeFromWishlist(hotel))
                        : dispatch(addToWishlist(hotel))
                }
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition duration-200 cursor-pointer"
            >
                <FaHeart
                    className={isWishlisted ? "text-red-500" : "text-gray-400"}
                />
            </button>

            {/* Card content */}
            <div className="p-4 space-y-2">
                {/* Name and Rating */}
                <div className="flex items-start justify-between gap-2">
                    {/* Hotel Name */}
                    <h3 className="text-lg font-semibold leading-snug flex-1">
                        {hotel.name}
                    </h3>

                    {/* Rating + Reviews */}
                    <div className="flex items-center gap-1 text-sm whitespace-nowrap">
                        <span className="bg-primary text-white px-2 py-1 rounded-md flex items-center gap-1">
                            ⭐ {hotel.rating}
                        </span>

                        <span className="text-sm text-gray-500">
                            ({hotel.reviewCount} reviews)
                        </span>
                    </div>
                </div>

                {/* City */}
                <p className="text-gray-500 text-base">{hotel.city}</p>

                {/* Description */}
                <div
                    className="text-sm text-gray-600 line-clamp-3 [&>p]:mb-1 [&>p>strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: hotel.description }}
                />

                {/* Price */}
                <div className="flex justify-between items-center pt-2">
                    <p className="text-primary font-bold text-xl">
                        {hotel.price ? `$${hotel.price}` : "Price Unavailable"}
                        {hotel.price && (
                            <span className="text-sm font-normal text-gray-500">
                                {" "}
                                / night
                            </span>
                        )}
                    </p>

                    <button
                        onClick={() => navigate(`/hotel/${hotel.id}`)}
                        className="bg-accent text-white px-4 py-2 rounded-md hover:scale-105 transition cursor-pointer"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
