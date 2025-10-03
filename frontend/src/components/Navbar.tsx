import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem,
  Chip,
  Badge,
  Stack,
  Divider
} from "@mui/material";
import { 
  Email as EmailIcon, 
  Logout, 
  Settings, 
  AccountCircle,
  NotificationsNone,
  Search,
  Brightness4,
  Help
} from "@mui/icons-material";
import { useState, createContext, useContext } from "react";

// Create a simple dark mode context for this component
const DarkModeContext = createContext({ 
  darkMode: false, 
  toggleDarkMode: () => {} 
});

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply dark mode to document body
    document.body.style.backgroundColor = !darkMode ? "#1a1a1a" : "#f8fafc";
    document.body.style.color = !darkMode ? "#ffffff" : "#0f172a";
  };

  // Mock user data - in real app this would come from auth context
  const userEmail = localStorage.getItem("userEmail") || "";
  const userName = userEmail.split("@")[0];

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
        color: "#0f172a",
      }}
    >
      <Toolbar sx={{ px: 4, py: 1 }}>
        {/* Logo and Brand */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              boxShadow: "0 8px 32px rgba(79, 70, 229, 0.3)",
            }}
          >
            <EmailIcon sx={{ color: "white", fontSize: 28 }} />
          </Box>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 800,
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.025em",
            }}
          >
            EmailHub
          </Typography>
          <Chip
            label="Pro"
            size="small"
            sx={{
              ml: 2,
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "white",
              fontWeight: 700,
              fontSize: "0.7rem",
              height: 24,
            }}
          />
        </Box>

        {/* Right Side Actions */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* Theme Toggle */}
          <IconButton 
            onClick={toggleDarkMode}
            sx={{ 
              color: darkMode ? "#f59e0b" : "#64748b",
              backgroundColor: darkMode ? "rgba(245, 158, 11, 0.1)" : "transparent",
              "&:hover": { 
                backgroundColor: darkMode ? "rgba(245, 158, 11, 0.2)" : "rgba(79, 70, 229, 0.1)",
                color: darkMode ? "#f59e0b" : "#4f46e5",
              },
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Brightness4 />
          </IconButton>

          {/* User Profile */}
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Box sx={{ textAlign: "right", mr: 2, display: { xs: "none", md: "block" } }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#0f172a" }}>
                {userName || ""}
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748b" }}>
                {userEmail}
              </Typography>
            </Box>
            
            <IconButton
              onClick={handleProfileClick}
              sx={{ 
                p: 0,
                "&:hover": { 
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  border: "2px solid rgba(79, 70, 229, 0.2)",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 4,
                minWidth: 240,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                overflow: "hidden",
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ p: 3, borderBottom: "1px solid rgba(148, 163, 184, 0.2)" }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userEmail}
              </Typography>
            </Box>
            
            <MenuItem 
              onClick={handleClose}
              sx={{ 
                py: 2,
                "&:hover": { backgroundColor: "rgba(79, 70, 229, 0.05)" },
              }}
            >
              <AccountCircle sx={{ mr: 2, color: "#4f46e5" }} />
              My Profile
            </MenuItem>
            
            <MenuItem 
              onClick={handleClose}
              sx={{ 
                py: 2,
                "&:hover": { backgroundColor: "rgba(79, 70, 229, 0.05)" },
              }}
            >
              <Settings sx={{ mr: 2, color: "#64748b" }} />
              Settings
            </MenuItem>
            
            <MenuItem 
              onClick={handleClose}
              sx={{ 
                py: 2,
                "&:hover": { backgroundColor: "rgba(79, 70, 229, 0.05)" },
              }}
            >
              <Help sx={{ mr: 2, color: "#64748b" }} />
              Help & Support
            </MenuItem>
            
            <Divider />
            
            <MenuItem 
              onClick={handleLogout}
              sx={{ 
                py: 2,
                color: "#ef4444",
                "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.05)" },
              }}
            >
              <Logout sx={{ mr: 2 }} />
              Sign Out
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
