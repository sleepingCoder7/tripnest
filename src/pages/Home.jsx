import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Pagination from "../components/Pagination";

const Home = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
	const blogsSectionRef = useRef(null);

    const totalPages = Math.ceil(blogs.length / 9);
    const currentBlogs = blogs.slice((page - 1) * 9, page * 9);
	

	const handlePageChange = (page) => {
		setPage(page);
		blogsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
	};

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const res = await fetch(
                    "https://dev.to/api/articles?tag=travel",
                    options,
                ).then((res) => res.json());
                setBlogs(res.filter((blog) => blog.language === "en"));
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="bg-light min-h-screen">
            {/* Hero Section*/}
            <section
                className="h-[90vh] bg-fixed bg-center bg-cover flex items-center justify-center text-white"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21')",
                }}
            >
                <div className="bg-black/50 p-10 rounded-xl text-center max-w-xl">
                    <h1 className="text-4xl font-bold mb-4">
                        Find your perfect stay with TripNest
                    </h1>

                    <p className="text-lg mb-6">
                        Discover top-rated hotels and inspiring travel stories.
                    </p>

                    <button
                        onClick={() => navigate("/hotels")}
                        className="bg-accent px-8 py-3 rounded-lg font-semibold hover:scale-105 transition cursor-pointer"
                    >
                        Explore Hotels
                    </button>
                </div>
            </section>

            {/*Travel Blogs Section*/}
            <section ref={blogsSectionRef} className="scroll-mt-24 px-8 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Travel Blogs
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                        >
                            <img
                                src={blog.cover_image || blog.social_image}
                                alt={blog.title}
                                className="h-48 w-full object-cover"
                            />

                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">
                                    {blog.title}
                                </h3>

                                <p className="text-gray-600 text-sm line-clamp-2">
                                    {blog.description}
                                </p>

                                <a
                                    href={blog.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 text-md font-medium mt-3 inline-block"
                                >
                                    Read More →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </section>
        </div>
    );
};

export default Home;
