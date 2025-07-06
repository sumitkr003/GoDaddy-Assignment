import { render, screen, waitFor } from "@testing-library/react";
import RepositoryInfo from "../RepositoryInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Repository } from "../../types/repository";

// Create a fresh client for each test
const createTestClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const mockRepo: Repository = {
  name: "my-repo",
  description: "Test repo description.",
  html_url: "https://github.com/example/my-repo",
  open_issues_count: 5,
  watchers_count: 10,
  forks_count: 3,
  updated_at: "2023-06-01T12:00:00Z",
  license: { name: "MIT" },
  languages_url: "https://api.github.com/repos/example/my-repo/languages",
};

describe("RepositoryInfo", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ JavaScript: 5000, TypeScript: 2000 }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
  });

  it('renders "Select a repository" message when repo is null', () => {
    render(
      <QueryClientProvider client={createTestClient()}>
        <RepositoryInfo repo={null} />
      </QueryClientProvider>
    );

    expect(
      screen.getByText(/select a repository to view changes/i)
    ).toBeInTheDocument();
  });

  it("renders repository info when repo is provided", async () => {
    render(
      <QueryClientProvider client={createTestClient()}>
        <RepositoryInfo repo={mockRepo} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/my-repo/i)).toBeInTheDocument();
    expect(screen.getByText(/test repo description/i)).toBeInTheDocument();
    expect(screen.getByText(/view on github/i)).toBeInTheDocument();
    expect(screen.getByText("Forks")).toBeInTheDocument();
    expect(screen.getByText("Open Issues")).toBeInTheDocument();
    expect(screen.getByText("Watchers")).toBeInTheDocument();
    expect(screen.getByText("Last Updated")).toBeInTheDocument();
    expect(screen.getByText("Licence")).toBeInTheDocument();

    // Wait for async fetch of languages
    await waitFor(() => {
      expect(screen.getByText(/JavaScript,TypeScript/)).toBeInTheDocument();
    });
  });
});
