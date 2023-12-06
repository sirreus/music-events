import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { Filter } from "./Filter";

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

function getRandomIndex(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

describe("rendering Filter with a props", () => {
  it("filter should be active", () => {
    const filterIndex = 0;
    const filterData = genres[filterIndex];
    render(
      <Filter
        filter={filterData}
        index={0}
        currentFilter={filterData.name}
        onSelect={() => {}}
      />
    );
    expect(screen.getByTestId("genres-filter-active")).toHaveTextContent(
      filterData.name
    );
  });

  it("filter should be not active", () => {
    const filterIndex = getRandomIndex(1, genres.length - 1);
    let currentFilter = genres[0].name;
    render(
      <Filter
        filter={genres[filterIndex]}
        index={filterIndex}
        currentFilter={currentFilter}
        onSelect={() => {}}
      />
    );
    expect(screen.getByTestId("genres-filter")).toHaveTextContent(
      genres[filterIndex].name
    );
  });

  it("set filter active", () => {
    const handleClick = jest.fn((index: number) => {
      currentFilter = genres[index].name;
    });

    const filterIndex = getRandomIndex(1, genres.length - 1);
    let currentFilter = genres[0].name;

    render(
      <Filter
        filter={genres[filterIndex]}
        index={filterIndex}
        currentFilter={currentFilter}
        onSelect={handleClick}
      />
    );

    fireEvent.click(screen.getByTestId("genres-filter"));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(filterIndex);

    render(
      <Filter
        filter={genres[filterIndex]}
        index={filterIndex}
        currentFilter={currentFilter}
        onSelect={handleClick}
      />
    );

    expect(screen.getByTestId("genres-filter-active")).toHaveTextContent(
      genres[filterIndex].name
    );
  });
});
