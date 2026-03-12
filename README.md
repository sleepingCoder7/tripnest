<div align="center">

# TripNest Travel 🌍✈️

TripNest Travel is a travel booking web application that allows users to browse hotels and explore travel options through a clean and responsive interface.

This project was built as a frontend learning project using **React** and deployed on **Netlify**.

🔗 Live Demo:  
[https://tripnest-travel.netlify.app/](https://tripnest-travel.netlify.app/)

</div>

---

## Features

- Browse available hotels
- View hotel cards with pricing and details
- Responsive UI for different screen sizes
- Client-side routing using React Router
- Component based architecture
- Unit testing using React Testing Library

---

## Tech Stack

**Frontend**
- React
- JavaScript (ES6)
- HTML5
- Tailwind CSS

**Libraries**
- React Router
- Redux
- React Testing Library
- Vitest

**Deployment**
- Netlify

---

## Project Structure

```text
tripnest-travel
│
├── public
│   └── _redirects
│
├── src
│   ├── components
│   │   ├── __tests__
│   │   │    └── HotelCard.test.jsx
│   │   │    └── Pagination.test.jsx
│   │   └── HotelCard.jsx
│   │   └── Navbar.jsx
│   │   └── Footer.jsx
│   │   └── Pagination.jsx
│   │
│   ├── pages
│   │   ├── __tests__
│   │   │    └── Home.test.jsx
│   │   └── Home.jsx
│   │   └── Hotels.jsx
│   │   └── HotelDetail.jsx
│   │   └── About.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── assets
│   │   ├── background
│   │   │    └── video1.mp4
│   │   └── logo
│   │       └── tripnest-logo.png
│   │
│   ├── utils
│   │   └── countries.json
│   │
│   ├── routes
│   │   └── AppRoutes.jsx
│   │
│   ├── redux
│   │   ├── slices
│   │   │   └── wishlistSlice.js
│   │   └── store.js
│   │
│   ├── App.jsx
│   └── main.jsx
│   └── index.css
│   └── App.css
│   └── setupTests.js
│
├── index.html
├── vite.config.js
├── .env
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/sleepingCoder7/tripnest-travel.git
```

Go into the project directory:

```bash
cd tripnest-travel
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Running Tests

```bash
npm run test
```

---

## Deployment

The project is deployed using **Netlify**.

---

## Future Improvements

- Booking system
- User authentication
- Backend integration (Spring Boot / Node.js)
- Payment gateway integration

---

## Author

**Durga Prasad**

GitHub:  
[https://github.com/sleepingCoder7](https://github.com/sleepingCoder7)

---

## License

This project is licensed under the MIT License.
