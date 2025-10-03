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
  LoginOutlined,
  ArrowForward
} from "@mui/icons-material";
import API from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    setError("");
    
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
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
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
                  }}
                >
                  <LoginOutlined sx={{ fontSize: 40 }} />
                </Avatar>
                
                <Typography 
                  variant="h3" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    mb: 1,
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: "rgba(15, 23, 42, 0.8)",
                    fontWeight: 500,
                  }}
                >
                  Sign in to your EmailHub account
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

              <Box component="form" onSubmit={handleLogin}>
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
                        <EmailIcon sx={{ color: "#667eea" }} />
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
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "#667eea" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "#667eea" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || !email || !password}
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 2,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                      boxShadow: "0 12px 40px rgba(102, 126, 234, 0.6)",
                      transform: "translateY(-2px)",
                    },
                    "&:disabled": {
                      background: "rgba(148, 163, 184, 0.5)",
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                <Box textAlign="center" mt={4}>
                  <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                    <Typography 
                      variant="body2" 
                      sx={{ color: "rgba(15, 23, 42, 0.7)" }}
                    >
                      Don't have an account?
                    </Typography>
                    <Link 
                      to="/register" 
                      style={{ 
                        color: "#667eea", 
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      Create one
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
