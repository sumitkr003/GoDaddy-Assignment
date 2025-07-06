import { render, screen, fireEvent } from "@testing-library/react";
import RepositorySidebar from "../RepositorySidebar";
import type { Repository } from "../../types/repository";

jest.mock("../RepositoryDescriptionCard", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ repo, isSelected, handleClick }: any) => (
    <div
      data-testid={`repo-card-${repo.name}`}
      data-selected={isSelected}
      onClick={handleClick}
    >
      {repo.name}
    </div>
  ),
}));

const mockRepos: Repository[] = [
  {
    name: "repo-1",
    description: "First repo",
    html_url: "https://github.com/example/repo-1",
    open_issues_count: 2,
    watchers_count: 5,
    forks_count: 1,
    updated_at: "2023-06-01T00:00:00Z",
    license: { name: "MIT" },
    languages_url: "",
  },
  {
    name: "repo-2",
    description: "Second repo",
    html_url: "https://github.com/example/repo-2",
    open_issues_count: 3,
    watchers_count: 8,
    forks_count: 2,
    updated_at: "2023-06-02T00:00:00Z",
    license: { name: "Apache-2.0" },
    languages_url: "",
  },
];

describe("RepositorySidebar", () => {
  it("renders the title and repository cards", () => {
    render(
      <RepositorySidebar
        repos={mockRepos}
        selectedRepo={null}
        handleRepoSelection={jest.fn()}
      />
    );

    expect(screen.getByText(/GoDaddy Repositories/i)).toBeInTheDocument();
    expect(screen.getByTestId("repo-card-repo-1")).toBeInTheDocument();
    expect(screen.getByTestId("repo-card-repo-2")).toBeInTheDocument();
  });

  it("marks the first repository as selected if no selectedRepo is passed", () => {
    render(
      <RepositorySidebar
        repos={mockRepos}
        selectedRepo={null}
        handleRepoSelection={jest.fn()}
      />
    );

    expect(screen.getByTestId("repo-card-repo-1")).toHaveAttribute(
      "data-selected",
      "true"
    );
    expect(screen.getByTestId("repo-card-repo-2")).toHaveAttribute(
      "data-selected",
      "false"
    );
  });

  it("marks the correct repository as selected when selectedRepo is provided", () => {
    render(
      <RepositorySidebar
        repos={mockRepos}
        selectedRepo={mockRepos[1]}
        handleRepoSelection={jest.fn()}
      />
    );

    expect(screen.getByTestId("repo-card-repo-1")).toHaveAttribute(
      "data-selected",
      "false"
    );
    expect(screen.getByTestId("repo-card-repo-2")).toHaveAttribute(
      "data-selected",
      "true"
    );
  });

  it("calls handleRepoSelection when a repository card is clicked", () => {
    const handleRepoSelection = jest.fn();

    render(
      <RepositorySidebar
        repos={mockRepos}
        selectedRepo={null}
        handleRepoSelection={handleRepoSelection}
      />
    );

    fireEvent.click(screen.getByTestId("repo-card-repo-2"));

    expect(handleRepoSelection).toHaveBeenCalledWith(mockRepos[1]);
  });
});
