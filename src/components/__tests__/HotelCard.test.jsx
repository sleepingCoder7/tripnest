import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HotelCard from "../HotelCard";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

const mockHotel = {
    id: 1,
    name: "Grand Palace Hotel",
    city: "New York",
    price: 220,
    rating: 4.6,
    reviewCount: 1200,
    image: "https://test.com/hotel.jpg",
};

test("renders hotel card with name and price", () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <HotelCard hotel={mockHotel} />
            </BrowserRouter>
        </Provider>,
    );

    expect(screen.getByText("Grand Palace Hotel")).toBeInTheDocument();
    expect(screen.getByText("$220")).toBeInTheDocument();
});

test("wishlist button can be clicked", async () => {

  render(
    <Provider store={store}>
    <BrowserRouter>
      <HotelCard hotel={mockHotel} />
    </BrowserRouter>
    </Provider>
  );

  const buttons = screen.getAllByRole("button");
  const wishlistButton = buttons[0]; // The wishlist button is the first button in the card

  await userEvent.click(wishlistButton);

  expect(wishlistButton).toBeInTheDocument();
});