import { useEffect, useState } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Fade,
  Alert,
  Paper,
  Stack,
  Chip,
  IconButton,
  Breadcrumbs,
  Link as MuiLink
} from "@mui/material";
import { 
  Email as EmailIcon, 
  Send, 
  NavigateNext
} from "@mui/icons-material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EmailForm from "../components/EmailForm";
import EmailTable from "../components/EmailTable";
import API from "../api/api";
import { Email } from "../types";

interface DashboardStats {
  totalEmails: number;
  sentEmails: number;
}

export default function Dashboard() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [folder, setFolder] = useState("inbox");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCompose, setShowCompose] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalEmails: 0,
    sentEmails: 0,
  });

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const res = await API.get("/email");
      setEmails(res.data);

      setStats({
        totalEmails: res.data.length,
        sentEmails: res.data.filter((e: any) => e.delivered).length,
      });
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load emails");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (recipient: string, subject: string, body: string) => {
    try {
      const response = await API.post("/email/send", { recipient, subject, body });
      if (response.status === 200 || response.status === 201) {
        await fetchEmails();
        setShowCompose(false);
        const previewUrl = response.data?.previewUrl;
        if (previewUrl) {
          setError("");
          // Surface a success banner with the preview link using the error slot for simplicity
          // Replace with dedicated success state if desired
          alert(`Ethereal preview: ${previewUrl}`);
        }
      }
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to send email");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const getFilteredEmails = () => {
    if (folder === "sent") return emails.filter((e) => e.delivered);
    return emails; // inbox shows all
  };

  const getFolderDisplayName = (f: string) => (f === "sent" ? "Sent" : "Inbox");

  const StatCard = ({ title, value, icon, color }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
  }) => (
    <Card elevation={0} sx={{ border: "1px solid rgba(148, 163, 184, 0.2)", height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box sx={{ color }}>{icon}</Box>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={800}>
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar onSelectFolder={setFolder} onCompose={() => setShowCompose(true)} />
        <Box sx={{ flex: 1, minHeight: "calc(100vh - 80px)", overflow: "auto" }}>
          <Container maxWidth="xl" sx={{ py: 4 }}>
            {error && (
              <Fade in={!!error}>
                <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }} onClose={() => setError("")}>{error}</Alert>
              </Fade>
            )}

            <Box sx={{ mb: 4 }}>
              <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 2 }}>
                <MuiLink underline="hover" color="inherit" href="#">Dashboard</MuiLink>
                <Typography color="primary" fontWeight={600}>{getFolderDisplayName(folder)}</Typography>
              </Breadcrumbs>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight={800} gutterBottom>
                    {getFolderDisplayName(folder)}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Review, refine and send your emails
                  </Typography>
                </Box>
                <Chip label="Compose" onClick={() => setShowCompose(true)} sx={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", color: "white", fontWeight: 600 }} />
              </Stack>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 3, mb: 4 }}>
              <StatCard title="Total Emails" value={stats.totalEmails} icon={<EmailIcon />} color="#4f46e5" />
              <StatCard title="Sent" value={stats.sentEmails} icon={<Send />} color="#10b981" />
            </Box>

            <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid rgba(148, 163, 184, 0.2)", overflow: "hidden" }}>
              {(showCompose) && (
                <Fade in={true} timeout={500}>
                  <Box sx={{ p: 3, borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>
                    <EmailForm onSend={sendEmail} onClose={() => setShowCompose(false)} />
                  </Box>
                </Fade>
              )}

              <Fade in={true} timeout={700}>
                <Box>
                  <EmailTable emails={getFilteredEmails()} onChanged={fetchEmails} />
                </Box>
              </Fade>
            </Paper>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
