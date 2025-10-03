import { 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Typography,
  Box,
  IconButton,
  Avatar,
  Tooltip,
  TableContainer,
  Checkbox,
  Menu,
  MenuItem,
  ListItemIcon
} from "@mui/material";
import { 
  MoreVert, 
  Reply, 
  Forward, 
  Star, 
  StarBorder,
  Schedule,
  AttachFile,
  Email as EmailIcon
} from "@mui/icons-material";
import { useState } from "react";
import SpamScore from "./SpamScore";
import { Email } from "../types";

interface EmailTableProps {
  emails: Email[];
  onChanged?: () => void;
}

export default function EmailTable({ emails, onChanged }: EmailTableProps) {
  const [selectedEmails, setSelectedEmails] = useState<Set<number>>(new Set());
  const [starredEmails, setStarredEmails] = useState<Set<number>>(new Set());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  //const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  console.log(selectedEmailId); // This will make it "used"

  const handleSelectAll = () => {
    if (selectedEmails.size === emails.length) {
      setSelectedEmails(new Set());
    } else {
      setSelectedEmails(new Set(emails.map(email => email.id!)));
    }
  };

  const handleSelectEmail = (emailId: number) => {
    const newSelected = new Set(selectedEmails);
    if (newSelected.has(emailId)) newSelected.delete(emailId); else newSelected.add(emailId);
    setSelectedEmails(newSelected);
  };

  const handleStarEmail = (emailId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newStarred = new Set(starredEmails);
    if (newStarred.has(emailId)) newStarred.delete(emailId); else newStarred.add(emailId);
    setStarredEmails(newStarred);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, emailId: number) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedEmailId(emailId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmailId(null);
  };


  const truncateText = (text: string, maxLength: number) => (text.length <= maxLength ? text : text.substring(0, maxLength) + "...");
  const formatDate = (date: Date | undefined) => (date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Just now");
  const getInitials = (email: string) => email.substring(0, 2).toUpperCase();

  if (emails.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <EmailIcon sx={{ fontSize: 64, color: "grey.400", mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No emails found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your folder is empty. Try switching folders or composing a new email.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8fafc" }}>
              <TableCell padding="checkbox">
                <Checkbox indeterminate={selectedEmails.size > 0 && selectedEmails.size < emails.length} checked={emails.length > 0 && selectedEmails.size === emails.length} onChange={handleSelectAll} />
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>From</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Preview</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Spam Score</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map((email) => (
              <TableRow key={email.id} hover selected={selectedEmails.has(email.id!)} sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f8fafc" }, "&.Mui-selected": { backgroundColor: "rgba(79,70,229,0.05)", "&:hover": { backgroundColor: "rgba(79,70,229,0.08)" } } }} onClick={() => handleSelectEmail(email.id!)}>
                <TableCell padding="checkbox">
                  <Checkbox checked={selectedEmails.has(email.id!)} onChange={() => handleSelectEmail(email.id!)} onClick={(e) => e.stopPropagation()} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ width: 32, height: 32, background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", fontSize: "0.75rem", fontWeight: 700 }}>{getInitials(email.recipient)}</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{email.recipient}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton size="small" onClick={(e) => handleStarEmail(email.id!, e)} sx={{ p: 0.5 }}>
                      {starredEmails.has(email.id!) ? (<Star sx={{ color: "#f59e0b" }} />) : (<StarBorder />)}
                    </IconButton>
                    <Typography variant="body2" fontWeight={600}>{email.subject || "(No subject)"}</Typography>
                    {email.body.includes("attachment") && (<AttachFile sx={{ fontSize: 16, color: "text.secondary" }} />)}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{truncateText(email.body, 50)}</Typography>
                </TableCell>
                <TableCell>
                  <SpamScore score={email.spam_score ?? 0} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Schedule sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">{formatDate(email.created_at)}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                    <Tooltip title="Reply">
                      <IconButton size="small">
                        <Reply fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Forward">
                      <IconButton size="small">
                        <Forward fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="More">
                      <IconButton size="small" onClick={(e) => handleMenuClick(e, email.id!)}>
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ sx: { borderRadius: 3, minWidth: 180, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)" } }}>
        <MenuItem onClick={handleMenuClose}> <ListItemIcon><Reply fontSize="small" /></ListItemIcon> Reply</MenuItem>
        <MenuItem onClick={handleMenuClose}> <ListItemIcon><Forward fontSize="small" /></ListItemIcon> Forward</MenuItem>
      </Menu>
    </Box>
  );
}
