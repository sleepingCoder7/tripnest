import React from "react";
import { useState, useEffect } from "react";
import HotelCard from "../components/HotelCard";
import countries from "../utils/countries.json";
import Pagination from "../components/Pagination";

const Hotels = () => {
    const [countryCode, setCountryCode] = useState("");
    const [maxPrice, setMaxPrice] = useState(1000);
    const [search, setSearch] = useState("");
    const [hotels, sethotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("");

    const filteredHotels = hotels.filter(
        (hotel) =>
            hotel.price &&
            hotel.price <= maxPrice &&
            hotel.name.toLowerCase().includes(search.toLowerCase()) &&
            (countryCode === "" || hotel.countryCode === countryCode),
    );
    const sortedHotels = [...filteredHotels].sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating-desc") return b.rating - a.rating;
        if (sortBy === "rating-asc") return a.rating - b.rating;
        if (sortBy === "reviews-desc") return b.reviewCount - a.reviewCount;
        if (sortBy === "reviews-asc") return a.reviewCount - b.reviewCount;
        return 0;
    });

    const totalPages = Math.ceil(sortedHotels.length / 10);
    const currentHotels = sortedHotels.slice(
        (currentPage - 1) * 10,
        currentPage * 10,
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const fetchHotelsByCountry = async (code) => {
        setLoading(true);
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "X-API-Key": import.meta.env.VITE_API_KEY,
            },
        };
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/v3.0/data/hotels?countryCode=${code}`,
                options,
            ).then((res) => res.json());
            const hotelsbatch = response.data.slice(0, 50);
            const mappedHotels = hotelsbatch.map((hotel) => ({
                id: hotel.id,
                name: hotel.name,
                city: hotel.city,
                countryCode: hotel.country?.toUpperCase(),
                rating: hotel.rating,
                reviewCount: hotel.reviewCount,
                description: hotel.hotelDescription,
                image: hotel.main_photo,
            }));
            const hotelIds = mappedHotels.map((hotel) => hotel.id);
            const prices = await fetchPrices(hotelIds);
            const mergedHotels = mergePrices(mappedHotels, prices);
            sethotels(mergedHotels);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPrices = async (hotelIds) => {
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

        return response;
    };

    const mergePrices = (hotels, priceData) => {
        const priceMap = {};

        priceData.data.forEach((item) => {
            const todayPrice = item.prices?.[0]?.avgPriceUsd;

            priceMap[item.hotelId] = todayPrice;
        });

        return hotels.map((hotel) => ({
            ...hotel,
            price: priceMap[hotel.id] || null,
        }));
    };

    const detectCountry = async function () {
        try {
            const response = await fetch("https://free.freeipapi.com/api/json/").then(
                (res) => res.json(),
            );
            const code = response.countryCode.toUpperCase();
            setCountryCode(code);
            fetchHotelsByCountry(code);
        } catch (error) {
            console.error("Country detection failed", error);
        }
        setLoadingLocation(false);
    };

    useEffect(() => {
        detectCountry();
    }, []);

    return (
        <div className="min-h-screen bg-light p-8">
            <h1 className="text-3xl font-bold mb-4 text-center">
                Browse Hotels
            </h1>

            {/* Hotel filter */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4 ">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:flex-wrap">
                    {/* Country Dropdown */}
                    <select
                        value={countryCode}
                        onChange={(e) => {
                            setCountryCode(e.target.value);
                            if (e.target.value !== "") {
                                fetchHotelsByCountry(e.target.value);
                            }
                        }}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.Code} value={country.Code}>
                                {country.Name}
                            </option>
                        ))}
                    </select>

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search hotels..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    />
                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-2 text-sm"
                    >
                        <option value="">Sort By</option>
                        <option value="price-asc">Price: Low → High</option>
                        <option value="price-desc">Price: High → Low</option>
                        <option value="rating-desc">Rating: High → Low</option>
                        <option value="rating-asc">Rating: Low → High</option>
                        <option value="reviews-desc">
                            Reviews: High → Low
                        </option>
                        <option value="reviews-asc">
                            Reviews: Low → High
                        </option>
                    </select>

                    {/* Clear button */}
                    {(countryCode || search || sortBy) && (
                        <button
                            onClick={() => {
                                setCountryCode("");
                                setSearch("");
                                setSortBy("");
                            }}
                            className="text-sm bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                        >
                            Clear
                        </button>
                    )}

                    {/* Price Filter */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium whitespace-nowrap">
                            Max Price: ${maxPrice}
                        </span>

                        <input
                            type="range"
                            min="100"
                            max="1000"
                            step="10"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {!loadingLocation && !loading && hotels.length > 0 && (
                <>
                <p className="text-lg mb-4 text-center text-primary font-semibold">
                    Showing hotels in{" "}
                    {countries.find((c) => c.Code === countryCode)?.Name}
                </p>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
                </>
            )}


            {/* Hotel grid */}
            {loadingLocation ? (
                <p className="text-lg mb-4 text-center text-primary font-semibold">
                    Detecting your location...
                </p>
            ) : loading ? (
                <p className="text-lg mb-4 text-center text-primary font-semibold">
                    Loading hotels...
                </p>
            ) : sortedHotels.length === 0 ? (
                <p className="text-lg mb-4 text-center text-primary font-semibold">
                    No hotels found matching your criteria.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {currentHotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                </div>
            )}
            {sortedHotels.length > 0 && <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />}
        </div>
    );
};

export default Hotels;
