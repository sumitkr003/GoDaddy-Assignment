import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import RepositorySidebar from "../components/RepositorySidebar";
import { Box, Typography } from "@mui/material";
import RepositoryInfo from "../components/RepositoryInfo";
import type { Repository } from "../types/repository";
import { repoList } from "../mocks/repo";
import { Loader } from "../components";

const RepoList = () => {
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch("https://api.github.com/orgs/godaddy/repos");
      return await response.json();
    },
  });

  const handleRepoSelection = (repo: Repository) => {
    setSelectedRepo(repo);
  };

  if (isPending) return <Loader />;
  if (error) return "An error has occurred: " + error?.message;

  const defaultSelectedRespitory = selectedRepo ?? data?.[0];
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Repository Explorer
      </Typography>
      <Box sx={{ display: "flex" }}>
        <RepositorySidebar
          repos={data ?? repoList}
          selectedRepo={defaultSelectedRespitory}
          handleRepoSelection={handleRepoSelection}
        />
        <RepositoryInfo repo={defaultSelectedRespitory} />
      </Box>
    </>
  );
};

export default RepoList;
