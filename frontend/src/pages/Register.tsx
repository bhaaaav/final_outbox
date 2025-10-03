import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  Container,
  IconButton,
  InputAdornment,
  Alert,
  Fade,
  Avatar,
  Stack
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  Email as EmailIcon, 
  Lock,
  PersonAdd,
  ArrowForward
} from "@mui/icons-material";
import API from "../api/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) return;
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await API.post("/auth/register", { email, password });
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #a8edea 50%, #fed6e3 75%, #ffecd2 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        "@keyframes gradientShift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <Container maxWidth="sm">
        <Fade in={true} timeout={1000}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 6,
              overflow: "hidden",
              backdropFilter: "blur(40px)",
              background: "rgba(255, 255, 255, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <Box textAlign="center" mb={4}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 3,
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    boxShadow: "0 8px 32px rgba(79, 172, 254, 0.4)",
                  }}
                >
                  <PersonAdd sx={{ fontSize: 40 }} />
                </Avatar>
                
                <Typography 
                  variant="h3" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    mb: 1,
                  }}
                >
                  Join EmailHub
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: "rgba(15, 23, 42, 0.8)",
                    fontWeight: 500,
                  }}
                >
                  Create your account to get started
                </Typography>
              </Box>

              {error && (
                <Fade in={!!error}>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3, 
                      borderRadius: 3,
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                    }}
                  >
                    {error}
                  </Alert>
                </Fade>
              )}

              {success && (
                <Fade in={!!success}>
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mb: 3, 
                      borderRadius: 3,
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                    }}
                  >
                    {success}
                  </Alert>
                </Fade>
              )}

              <Box component="form" onSubmit={handleRegister}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ 
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#4facfe" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ 
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "#4facfe" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "#4facfe" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  sx={{ 
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "#4facfe" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          sx={{ color: "#4facfe" }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || !email || !password || !confirmPassword}
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 2,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    boxShadow: "0 8px 32px rgba(79, 172, 254, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #3b9ae1 0%, #00d9fe 100%)",
                      boxShadow: "0 12px 40px rgba(79, 172, 254, 0.6)",
                      transform: "translateY(-2px)",
                    },
                    "&:disabled": {
                      background: "rgba(148, 163, 184, 0.5)",
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>

                <Box textAlign="center" mt={4}>
                  <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                    <Typography 
                      variant="body2" 
                      sx={{ color: "rgba(15, 23, 42, 0.7)" }}
                    >
                      Already have an account?
                    </Typography>
                    <Link 
                      to="/login" 
                      style={{ 
                        color: "#4facfe", 
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      Sign in
                    </Link>
                  </Stack>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
}
