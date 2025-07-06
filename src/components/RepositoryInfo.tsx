import type { FC } from "react";
import type { Repository } from "../types/repository";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { grey } from "@mui/material/colors";
import { Circle, RemoveRedEye, CalendarToday } from "@mui/icons-material";

type LanguagePair = [string, number];
type Language = {
  [key: string]: number;
};

const cardStyle = {
  borderRadius: "8px",
  border: "1px solid #E5E7EB",
  padding: "16px",
  backgroundColor: "#F9FAFB",
  fontFamily: "sans-serif",
  minWidth: "150px",
  width: "max-content",
};

const labelStyle = {
  fontSize: "12px",
  fontWeight: "500",
  color: "#6B7280",
  marginBottom: "8px",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

const iconTextStyles = {
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "600",
  color: "#111827",
  gap: "4px",
};

const titleWrapperStyles = {
  display: "flex",
  flexDirection: "row",
  gap: "8px",
  justifyContent: "space-between",
  alignItems: "center",
};

const buttonStyles = { width: "200px", background: grey[900] };

const containerStyles = { padding: "20px", width: "100%" };

const infoContainerStyles = {
  gap: "8px",
  flexDirection: "row",
  flexWrap: "wrap",
  margin: "20px 0px",
};

const descriptionStyles = {
  ...cardStyle,
  width: "auto",
  height: "300px",
  overflow: "scroll",
};

const InfoCard: FC<{
  label: string | number;
  title: string;
  Icon?: React.FunctionComponent;
}> = ({ label, title, Icon }) => {
  return (
    <Box sx={cardStyle}>
      <Box sx={labelStyle}>{title}</Box>
      <Box sx={iconTextStyles}>
        <Box sx={{ color: grey[600] }}>{Icon ? <Icon /> : null}</Box>
        {label}
      </Box>
    </Box>
  );
};

const RepositoryInfo: FC<{ repo: Repository | null }> = ({ repo }) => {
  const {
    name,
    description,
    open_issues_count,
    html_url,
    watchers_count,
    forks_count,
    updated_at,
    license,
    languages_url,
  } = repo ?? {};

  const { data: languages, isFetching } = useQuery({
    queryKey: ["languages"],
    queryFn: async () => {
      if (!languages_url) return;
      const response = await fetch(languages_url);
      return await response.json();
    },
  });

  const sortedLanguages = Object.entries((languages as Language) ?? {})
    .sort((a: LanguagePair, b: LanguagePair) => b[1] - a[1])
    .map(([language]) => language)
    .join(",");

  if (!repo) return <div>Select a repository to view changes</div>;

  return (
    <Box sx={containerStyles}>
      <Stack sx={titleWrapperStyles}>
        <Typography variant="h6" fontWeight="600">
          {name}
        </Typography>
        <Button sx={buttonStyles} variant="contained" href={html_url}>
          View On Github
        </Button>
      </Stack>
      <Stack sx={infoContainerStyles}>
        <InfoCard
          title="Language"
          label={isFetching ? "-" : sortedLanguages}
          Icon={Circle}
        />
        <InfoCard title="Forks" label={forks_count ?? 0} />
        <InfoCard title="Open Issues" label={open_issues_count ?? 0} />
        <InfoCard
          title="Watchers"
          label={watchers_count ?? 0}
          Icon={RemoveRedEye}
        />
        <InfoCard
          title="Last Updated"
          label={updated_at ? new Date(updated_at).toLocaleString() : "-"}
          Icon={CalendarToday}
        />
        <InfoCard title="Licence" label={license?.name ?? "-"} />
      </Stack>
      <Box sx={{}}>
        <Typography variant="body1" fontWeight="500">
          Description
        </Typography>
        <Box sx={descriptionStyles}>{description}</Box>
      </Box>
    </Box>
  );
};

export default RepositoryInfo;
