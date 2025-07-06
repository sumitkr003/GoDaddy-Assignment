import type { FC } from "react";
import type { Repository } from "../types/repository";
import { Box, Stack, Typography } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { grey } from "@mui/material/colors";

const infoStyles = {
  display: "flex",
  alignItems: "end",
  gap: "4px",
  color: grey[600],
};

const containerStyles = {
  padding: "8px",
  borderTop: `1px solid ${grey[400]}`,
  cursor: "pointer",
};

const infoContainerStyles = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "20%",
};

const visibilityStyles = {
  padding: "4px",
  background: "#9e9e9e",
  borderRadius: "4px",
};

const titleWrapperStyles = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

const InfoCount = ({
  count,
  Icon,
}: {
  Icon: React.FunctionComponent;
  count?: number;
}) => {
  return (
    <Box sx={infoStyles}>
      <Icon />
      {count ?? 0}
    </Box>
  );
};

const RepositoryDescriptionCard: FC<{
  repo: Repository | null;
  handleClick: () => void;
  isSelected: boolean;
}> = ({ repo, handleClick, isSelected }) => {
  const { name, description, open_issues_count, watchers_count, visibility } =
    repo ?? {};

  return (
    <Box
      sx={{
        ...containerStyles,
        backgroundColor: isSelected ? "#ffffff" : "none",
      }}
      role="button"
      data-testid={`repo-card-${name}`}
      onClick={handleClick}
      data-selected={isSelected}
    >
      <Stack sx={titleWrapperStyles}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body1" sx={visibilityStyles}>
          {visibility}
        </Typography>
      </Stack>
      <Typography variant="body1">{description}</Typography>
      <Stack sx={infoContainerStyles}>
        <InfoCount Icon={BugReportIcon} count={open_issues_count} />
        <InfoCount Icon={RemoveRedEyeIcon} count={watchers_count} />
      </Stack>
    </Box>
  );
};

export default RepositoryDescriptionCard;
