import { 
  Box, 
  List, 
  ListItemButton, 
  ListItemText, 
  ListItemIcon,
  Typography,
  Divider,
  Chip,
  Button,
  Stack,
  Paper,
  LinearProgress
} from "@mui/material";
import { 
  Inbox, 
  Send, 
  Drafts, 
  Delete, 
  Star, 
  Label,
  Add,
  Folder,
  BarChart,
  Settings,
  Archive,
  Report
} from "@mui/icons-material";
import { useState } from "react";

interface SidebarProps {
  onSelectFolder: (folder: string) => void;
  onCompose?: () => void;
}

interface FolderItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  count?: number;
  color?: string;
}

export default function Sidebar({ onSelectFolder, onCompose }: SidebarProps) {
  const [selectedFolder, setSelectedFolder] = useState("inbox");

  const mainFolders: FolderItem[] = [
    { id: "inbox", name: "Inbox", icon: <Inbox /> },
    { id: "sent", name: "Sent", icon: <Send /> },
  ];
  const labels: FolderItem[] = [];

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId);
    onSelectFolder(folderId);
  };

  return (
    <Box 
      sx={{ 
        width: 320, 
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "#ffffff",
        borderRight: "1px solid rgba(148, 163, 184, 0.2)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Compose Button */}
      <Box sx={{ p: 3 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<Add />}
          onClick={onCompose}
          sx={{
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: 3,
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            boxShadow: "0 8px 32px rgba(79, 70, 229, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
              boxShadow: "0 12px 40px rgba(79, 70, 229, 0.6)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Compose
        </Button>
      </Box>

      {/* Main Folders */}
      <Box sx={{ px: 2, flex: 1 }}>
        <Typography 
          variant="overline" 
          sx={{ 
            px: 2, 
            color: "#64748b",
            fontWeight: 700,
            letterSpacing: 1.2,
            fontSize: "0.7rem",
          }}
        >
          Folders
        </Typography>
        
        <List sx={{ mt: 1, mb: 3 }}>
          {mainFolders.map((folder) => (
            <ListItemButton
              key={folder.id}
              selected={selectedFolder === folder.id}
              onClick={() => handleFolderClick(folder.id)}
              sx={{
                borderRadius: 3,
                mx: 1,
                mb: 1,
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&.Mui-selected": {
                  backgroundColor: "#4f46e5",
                  color: "#ffffff",
                  boxShadow: "0 4px 12px rgba(79, 70, 229, 0.4)",
                  "&:hover": {
                    backgroundColor: "#4338ca",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "#ffffff",
                  },
                  "& .MuiChip-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(79, 70, 229, 0.05)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 44, color: "#64748b" }}>
                {folder.icon}
              </ListItemIcon>
              <ListItemText 
                primary={folder.name}
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              />
              {folder.count !== undefined && (
                <Chip
                  label={folder.count}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    backgroundColor: "#f1f5f9",
                    color: "#64748b",
                    minWidth: 28,
                  }}
                />
              )}
            </ListItemButton>
          ))}
        </List>

        {/* No labels for now */}
      </Box>

      {/* Bottom Section removed */}
    </Box>
  );
}
