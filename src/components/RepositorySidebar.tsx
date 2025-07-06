import type { FC } from "react";
import type { Repository } from "../types/repository";
import { Box, Typography } from "@mui/material";
import RepositoryDescriptionCard from "./RepositoryDescriptionCard";

const sideBarStyles = {
  width: "40%",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid #bdbdbd",
};

const repoListStyles = {
  height: "85vh",
  overflow: "scroll",
};

const RepositorySidebar: FC<{
  repos: Repository[];
  selectedRepo: Repository | null;
  handleRepoSelection: (repo: Repository) => void;
}> = ({ repos, selectedRepo, handleRepoSelection }) => {
  return (
    <Box sx={sideBarStyles}>
      <Typography variant="h5">GoDaddy Repositories</Typography>
      <Box sx={repoListStyles}>
        {repos.map((repo, index) => (
          <RepositoryDescriptionCard
            key={repo.name}
            repo={repo}
            handleClick={() => handleRepoSelection(repo)}
            isSelected={
              repo?.name === selectedRepo?.name || (index == 0 && !selectedRepo)
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default RepositorySidebar;
