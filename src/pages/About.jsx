import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-light px-6 md:px-16 py-12">

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">
          About TripNest
        </h1>

        <p className="text-gray-600 text-lg">
          TripNest is a modern travel discovery platform designed to help
          travelers explore and find the perfect hotels across the world.
          We simplify travel planning by providing detailed hotel
          information, real ratings, and powerful search tools to help
          you make confident decisions for your next journey.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-10 mb-16">

        <div className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Our Mission
          </h2>

          <p className="text-gray-600">
            Our mission is to make travel planning effortless and enjoyable.
            TripNest connects travelers with the best accommodations by
            offering transparent information, real guest insights, and
            intuitive search tools.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Our Vision
          </h2>

          <p className="text-gray-600">
            Our vision is to become a trusted global travel platform where
            users can easily discover destinations, compare hotels, and
            plan memorable trips with confidence.
          </p>
        </div>

      </section>

      {/* Why Choose TripNest */}
      <section className="mb-16">

        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Why Choose TripNest
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">
              🌍 Global Hotel Discovery
            </h3>
            <p className="text-gray-600 text-sm">
              Explore hotels across multiple countries with powerful
              search and filtering tools.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">
              ⭐ Trusted Ratings
            </h3>
            <p className="text-gray-600 text-sm">
              View authentic ratings and review insights to choose the
              best hotels for your stay.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">
              ⚡ Fast Experience
            </h3>
            <p className="text-gray-600 text-sm">
              Built using modern technologies to provide a fast and
              seamless user experience.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">
              ❤️ Save Favorites
            </h3>
            <p className="text-gray-600 text-sm">
              Easily save hotels to your wishlist and plan your trip
              without losing track of great options.
            </p>
          </div>

        </div>

      </section>

      {/* Team Section */}
      <section>

        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Our Team
        </h2>

        <div className="flex justify-center gap-8 max-w-5xl mx-auto">

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="font-semibold text-lg">
              Durga Prasad
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Founder & Developer
            </p>
            <p className="text-gray-600 text-sm">
              Passionate about building modern web applications and
              solving real-world problems using technology.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default About;