import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { NavBar } from "./NavBar";

const genres = [
  { "id": "KnvZfZ7vAvv", "name": "Alternative" },
  { "id": "KnvZfZ7vAve", "name": "Ballads/Romantic" },
  { "id": "KnvZfZ7vAvd", "name": "Blues" },
  { "id": "KnvZfZ7vAvA", "name": "Chanson Francaise" },
  { "id": "KnvZfZ7vAvk", "name": "Children's Music" },
  { "id": "KnvZfZ7vAeJ", "name": "Classical" },
  { "id": "KnvZfZ7vAv6", "name": "Country" },
  { "id": "KnvZfZ7vAvF", "name": "Dance/Electronic" },
  { "id": "KnvZfZ7vAva", "name": "Folk" },
  { "id": "KnvZfZ7vAv1", "name": "Hip-Hop/Rap" },
  { "id": "KnvZfZ7vAvJ", "name": "Holiday" },
  { "id": "KnvZfZ7vAvE", "name": "Jazz" },
  { "id": "KnvZfZ7vAJ6", "name": "Latin" },
  { "id": "KnvZfZ7vAvI", "name": "Medieval/Renaissance" },
  { "id": "KnvZfZ7vAvt", "name": "Metal" },
  { "id": "KnvZfZ7vAvn", "name": "New Age" },
  { "id": "KnvZfZ7vAvl", "name": "Other" },
  { "id": "KnvZfZ7vAev", "name": "Pop" },
  { "id": "KnvZfZ7vAee", "name": "R&B" },
  { "id": "KnvZfZ7vAed", "name": "Reggae" },
  { "id": "KnvZfZ7vAe7", "name": "Religious" },
  { "id": "KnvZfZ7vAeA", "name": "Rock" },
  { "id": "KnvZfZ7vAe6", "name": "Undefined" },
  { "id": "KnvZfZ7vAeF", "name": "World" },
];

describe("rendering NavBar with a props", () => {
  const initialState = {
    filters: { id: "all-genres", name: "All genres" },
    events: { selectedEvent: { isDetailsVisible: false } },
  };
  const mockStore = configureStore();
  let store;

  it("should have active default filter", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <NavBar genresFilters={genres} isMobile={false} />
      </Provider>
    );
    expect(screen.getByTestId("genres-filter-active")).toHaveTextContent(
      "All genres"
    );
  });

  it("should have 4 visible not active filter with desktop view", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <NavBar genresFilters={genres} isMobile={false} />
      </Provider>
    );

    const visibleFilters = screen.getAllByTestId("genres-filter");
    expect(visibleFilters.length).toEqual(4);
  });

  it("should have More button", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <NavBar genresFilters={genres} isMobile={false} />
      </Provider>
    );
    expect(screen.getByText("More...")).toBeInTheDocument();
  });

  it("should not have visible not active filter with mobile view", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <NavBar genresFilters={genres} isMobile={true} />
      </Provider>
    );

    const visibleFilters = screen.queryAllByTestId("genres-filter");
    expect(visibleFilters.length).toEqual(0);
  });
});
