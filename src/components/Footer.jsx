import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-gray-100 mt-20 border-t">
            <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* Logo + About */}
                <div className="md:col-span-4">
                    <h2 className="text-xl font-bold text-primary mb-3">
                        TripNest
                    </h2>

                    <p className="text-gray-600 text-sm leading-relaxed">
                        TripNest helps travelers discover the best hotels around
                        the world. Compare prices, read reviews, explore
                        destinations and save your favorite stays effortlessly.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="md:col-span-2">
                    <h3 className="font-semibold mb-4">Quick Links</h3>
                    <div className="space-y-2 text-gray-600 text-sm">
                        <Link
                            to="/"
                            onClick={() => window.scrollTo(0, 0)}
                            className="hover:text-primary hover:underline cursor-pointer"
                        >
                            Home
                        </Link>
                        <br />
                        <Link
                            to="/hotels"
                            onClick={() => window.scrollTo(0, 0)}
                            className="hover:text-primary hover:underline cursor-pointer"
                        >
                            Hotels
                        </Link>
                        <br />
                        <Link
                            to="/wishlist"
                            onClick={() => window.scrollTo(0, 0)}
                            className="hover:text-primary hover:underline cursor-pointer"
                        >
                            Wishlist
                        </Link>
                        <br />
                        <Link
                            to="/about"
                            onClick={() => window.scrollTo(0, 0)}
                            className="hover:text-primary hover:underline cursor-pointer"
                        >
                            About
                        </Link>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="md:col-span-4 lg:col-span-3">
                    <h3 className="font-semibold mb-4">
                        Subscribe to Newsletter
                    </h3>

                    <p className="text-gray-600 text-sm mb-3">
                        Get travel inspiration and exclusive deals.
                    </p>

                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="border rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />

                        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Contact */}
                <div className="md:col-span-2 lg:col-span-3">
                    <h3 className="font-semibold mb-4">Contact</h3>

                    <p className="text-sm text-gray-600 mb-2">
                        📧 contact@tripnest.com
                    </p>

                    <p className="text-sm text-gray-600 mb-4">
                        📞 +91 9876543210
                    </p>

                    {/* Social icons */}
                    <div className="flex gap-4 text-gray-600 text-xl">
                        <FaInstagram className="hover:text-primary cursor-pointer transition" />

                        <FaYoutube className="hover:text-primary cursor-pointer transition" />

                        <FaLinkedin className="hover:text-primary cursor-pointer transition" />
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}

            <div className="border-t py-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} TripNest. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
