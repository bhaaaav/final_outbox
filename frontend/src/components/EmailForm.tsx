import { useState } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography,
  IconButton,
  Divider,
  Stack,
  InputAdornment,
  Alert,
  Fade,
  CircularProgress,
  Chip
} from "@mui/material";
import { 
  Send, 
  AttachFile, 
  FormatBold, 
  FormatItalic, 
  Close,
  PersonAdd,
  Email as EmailIcon,
  Subject as SubjectIcon,
  Message as MessageIcon
} from "@mui/icons-material";
import API from "../api/api";

interface EmailFormProps {
  onSend: (recipient: string, subject: string, body: string) => Promise<void>;
  onClose?: () => void;
}

export default function EmailForm({ onSend, onClose }: EmailFormProps) {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [spamScore, setSpamScore] = useState<number | null>(null);
  
  // Validation states
  const [recipientError, setRecipientError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [bodyError, setBodyError] = useState("");

  const validateEmail = (email: string) => {
    return email.includes("@");
  };

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setRecipientError("");
    setSubjectError("");
    setBodyError("");
    setError("");

    if (!recipient.trim()) {
      setRecipientError("Recipient is required");
      isValid = false;
    } else if (!validateEmail(recipient)) {
      setRecipientError("Email must contain '@'");
      isValid = false;
    }

    if (!subject.trim()) {
      setSubjectError("Subject is required");
      isValid = false;
    }

    if (!body.trim()) {
      setBodyError("Email body cannot be empty");
      isValid = false;
    }

    return isValid;
  };

  const handleScore = async () => {
    try {
      const res = await API.post("/email/score", { subject, body });
      setSpamScore(res.data.spam_score);
    } catch (e: any) {
      setError(e.response?.data?.message || "Failed to score draft");
    }
  };

  const handleRefine = async () => {
    try {
      const res = await API.post("/email/refine", { subject, body });
      setSubject(res.data.subject);
      setBody(res.data.body);
      setSpamScore(res.data.spam_score);
    } catch (e: any) {
      setError(e.response?.data?.message || "Failed to refine draft");
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await onSend(recipient, subject, body);
      setSuccess("Email sent successfully!");
      setSpamScore(null);
      
      // Clear form after successful send
      setTimeout(() => {
        setRecipient("");
        setSubject("");
        setBody("");
        setSuccess("");
        if (onClose) onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRecipient("");
    setSubject("");
    setBody("");
    setError("");
    setSuccess("");
    setSpamScore(null);
    setRecipientError("");
    setSubjectError("");
    setBodyError("");
    if (onClose) onClose();
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid rgba(148, 163, 184, 0.2)",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmailIcon sx={{ color: "#4f46e5" }} />
          <Typography variant="h6" fontWeight={700}>
            Compose Email
          </Typography>
          {spamScore !== null && (
            <Chip label={`Spam Score: ${spamScore}`} size="small" sx={{ ml: 2 }} />
          )}
        </Box>
        
        {onClose && (
          <IconButton size="small" onClick={handleClose}>
            <Close />
          </IconButton>
        )}
      </Box>

      <CardContent sx={{ p: 3 }}>
        {error && (
          <Fade in={!!error}>
            <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>
              {error}
            </Alert>
          </Fade>
        )}
        
        {success && (
          <Fade in={!!success}>
            <Alert severity="success" sx={{ mb: 2, borderRadius: 3 }}>
              {success}
            </Alert>
          </Fade>
        )}

        <Box component="form" onSubmit={handleSend}>
          <TextField
            label="To"
            placeholder="Enter recipient email"
            fullWidth
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
              if (recipientError) setRecipientError("");
            }}
            error={!!recipientError}
            helperText={recipientError}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonAdd sx={{ color: "#4f46e5" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Subject"
            placeholder="Enter email subject"
            fullWidth
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              if (subjectError) setSubjectError("");
            }}
            error={!!subjectError}
            helperText={subjectError}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SubjectIcon sx={{ color: "#4f46e5" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Message"
            placeholder="Compose your email..."
            fullWidth
            multiline
            rows={8}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              if (bodyError) setBodyError("");
            }}
            error={!!bodyError}
            helperText={bodyError}
            sx={{ 
              mb: 3,
              "& .MuiInputBase-root": {
                lineHeight: 1.6,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 2 }}>
                  <MessageIcon sx={{ color: "#4f46e5" }} />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Button variant="outlined" onClick={handleScore}>Check Spam Score</Button>
            <Button variant="outlined" onClick={handleRefine}>Refine</Button>
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {body.length} characters
            </Typography>
            
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={handleClose}
                disabled={loading}
                sx={{ borderRadius: 3 }}
              >
                Discard
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !recipient || !subject || !body}
                startIcon={loading ? <CircularProgress size={16} /> : <Send />}
                sx={{
                  px: 3,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
                  },
                }}
              >
                {loading ? "Sending..." : "Send Email"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
