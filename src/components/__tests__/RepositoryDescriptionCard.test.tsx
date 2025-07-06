import { render, screen, fireEvent } from "@testing-library/react";
import RepositoryDescriptionCard from "../RepositoryDescriptionCard";
import type { Repository } from "../../types/repository";

const mockRepo: Repository = {
  name: "test-repo",
  description: "This is a test repository.",
  open_issues_count: 3,
  watchers_count: 5,
  visibility: "public",
};

describe("RepositoryDescriptionCard", () => {
  it("renders repo name, description, visibility, and counts", () => {
    render(
      <RepositoryDescriptionCard
        repo={mockRepo}
        handleClick={jest.fn()}
        isSelected={false}
      />
    );

    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("This is a test repository.")).toBeInTheDocument();
    expect(screen.getByText("public")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument(); // open_issues_count
    expect(screen.getByText("5")).toBeInTheDocument(); // watchers_count
  });

  it("calls handleClick when clicked", () => {
    const handleClick = jest.fn();
    render(
      <RepositoryDescriptionCard
        repo={mockRepo}
        handleClick={handleClick}
        isSelected={false}
      />
    );

    const card = screen.getByRole("button");
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders fallback counts when values are undefined", () => {
    const partialRepo = {
      ...mockRepo,
      open_issues_count: undefined,
      watchers_count: undefined,
    };
    render(
      <RepositoryDescriptionCard
        repo={partialRepo}
        handleClick={jest.fn()}
        isSelected={false}
      />
    );

    expect(screen.getAllByText("0")).toHaveLength(2);
  });

  it("applies white background when selected", () => {
    render(
      <RepositoryDescriptionCard
        repo={mockRepo}
        handleClick={jest.fn()}
        isSelected={true}
      />
    );

    const card = screen.getByTestId("repo-card-test-repo");
    expect(card).toHaveStyle("background-color: #ffffff");
  });
});
