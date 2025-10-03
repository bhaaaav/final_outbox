import { Box } from "@mui/material";

interface SpamScoreProps {
  score: number;
}

export default function SpamScore({ score }: SpamScoreProps) {
  const getColor = () => {
    if (score >= 7) return "red";
    if (score >= 4) return "orange";
    return "green";
  };

  return (
    <Box
      sx={{
        display: "inline-block",
        px: 1,
        py: 0.5,
        borderRadius: 1,
        bgcolor: getColor(),
        color: "#fff",
        fontWeight: "bold",
        minWidth: 25,
        textAlign: "center",
      }}
    >
      {score}
    </Box>
  );
}
