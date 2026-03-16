"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Window";
import "./landingpage.css";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router=useRouter();
  return (
    <Box className="page-root">
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          spacing={6}
          className="hero-root"
        >
          <Grid item xs={12} md={6}>
            <Box className="hero-left">
              <Typography
                variant="h3"
                className="hero-title"
                gutterBottom
              >
                Welcome to your professional community
              </Typography>

              <Stack spacing={2}>
                <Button
                  fullWidth
                  startIcon={<GoogleIcon />}
                  variant="contained"
                  className="btn-primary"
                  size="large"
                  onClick={()=>router.push('/login')}
                >
                  Continue with Google
                </Button>


                <Button
                  fullWidth
                  variant="outlined"
                  className="btn-outline"
                  size="large"
                  onClick={()=>router.push('/login')}
                >
                  Sign in with email
                </Button>

                <Typography className="terms-text" variant="body2">
                  By clicking Continue to join or sign in, you agree to{" "}
                  <a href="#" className="link">
                    LinkedIn&apos;s User Agreement
                  </a>
                  ,{" "}
                  <a href="#" className="link">
                    Privacy Policy
                  </a>
                  , and{" "}
                  <a href="#" className="link">
                    Cookie Policy
                  </a>
                  .
                </Typography>

                <Typography className="join-text" variant="body2" >
                  New to LinkedIn?{" "}
                  <span className="join-link" tabIndex={0} onClick={()=>router.push('/register')}>
                    Join now
                  </span>
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box className="hero-image-wrap">
              <Box
                component="img"
                src='https://static.licdn.com/aero-v1/sc/h/50lcg4sbzl0pgwnaqf9a8uuwj'
                alt="Professional Community"
                className="hero-image"
              />
            </Box>
          </Grid>
        </Grid>

        <Box className="feature-section" mt={10}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" className="feature-title" gutterBottom>
                Let the right people know you are open to work
              </Typography>
              <Typography className="feature-desc" variant="body1">
                With the Open To Work feature, you can privately tell recruiters
                or publicly share with the LinkedIn community that you are
                looking for new job opportunities.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} textAlign="center">
              <Box className="feature-image-circle">
                <Box
                  component="img"
                  src="https://static.licdn.com/aero-v1/sc/h/dbvmk0tsk0o0hd59fi64z3own"
                  alt="Open To Work"
                  className="feature-circle-img"
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={6} justifyContent="center" mt={6}>
            <Grid item xs={12} sm={6} textAlign="center">
              <Box className="feature-illustration">
                <Box
                  component="img"
                  src="https://static.licdn.com/aero-v1/sc/h/43h6n82li4xu0q23s8jqizk6j"
                  alt="Find People"
                  className="feature-img"
                />
              </Box>
              <Typography className="feature-card-title" gutterBottom>
                Connect with people who can help
              </Typography>
              <Button variant="outlined" className="feature-btn">
                Find people you know
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} textAlign="center">
              <Box className="feature-illustration">
                <Box
                  component="img"
                  src="https://static.licdn.com/aero-v1/sc/h/1dhh8rr3wohexkaya6jhn2y8j"
                  alt="Learn Skills"
                  className="feature-img"
                />
              </Box>
              <Typography className="feature-card-title" gutterBottom>
                Learn the skills you need to succeed
              </Typography>
              <Button variant="outlined" className="feature-btn">
                Choose a topic to learn about
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box className="join-banner" mt={10} py={10}>
          <Typography variant="h4" className="join-banner-title" gutterBottom>
            Join your colleagues, classmates, and friends on LinkedIn
          </Typography>
          <Button variant="contained" className="join-banner-btn" size="large">
            Get started
          </Button>

          <Box className="city-image-placeholder" mt={6}>
            <Box
              component="img"
              src="https://static.licdn.com/aero-v1/sc/h/4ezbw852t2wrgf27zl1o1qtu7"
              alt="City Banner"
              className="city-banner-img"
            />
          </Box>
        </Box>

        <Box className="footer-nav" mt={12} py={8}>
          <Grid container spacing={6} justifyContent="center">
            {[
              {
                title: "General",
                links: ["Sign Up", "Help Center", "About", "Careers"],
              },
              {
                title: "Browse LinkedIn",
                links: ["Learning", "Jobs", "Games"],
              },
              {
                title: "Business Solutions",
                links: ["Talent", "Marketing", "Sales"],
              },
              {
                title: "Directories",
                links: ["Members", "Jobs", "Companies"],
              },
            ].map(({ title, links }) => (
              <Grid item xs={6} sm={3} key={title}>
                <Typography className="footer-title" variant="subtitle1" gutterBottom>
                  {title}
                </Typography>
                {links.map((link) => (
                  <Typography
                    key={link}
                    className="footer-link"
                    variant="body2"
                    tabIndex={0}
                  >
                    {link}
                  </Typography>
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer Bottom */}
        <Box className="footer-bottom" py={3}>
          LinkedIn © 2026 · About · Accessibility · User Agreement · Privacy
          Policy · Cookie Policy
        </Box>
      </Container>
    </Box>
  );
}