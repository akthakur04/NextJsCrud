'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Next.js CRUD App
      </Typography>

      {user ? (
        <Box mt={3}>
          <Typography variant="h6" component="p">
            Welcome, {user.email}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            style={{ margin: '20px 0' }}
          >
            Logout
          </Button>
          <Box>
            <Link href="/tasks/create" passHref>
              <Button variant="contained" color="primary" fullWidth>
                Create a Task
              </Button>
            </Link>
            <Box mt={2}>
              <Link href="/tasks" passHref>
                <Button variant="outlined" color="primary" fullWidth>
                  View Tasks
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box mt={3}>
          <Typography variant="body1">
            You are not logged in. Please log in to access the app.
          </Typography>
          <Box mt={2}>
            <Link href="/login" passHref>
              <Button variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Link>
          </Box>
          <Box mt={2}>
            <Link href="/register" passHref>
              <Button variant="outlined" color="secondary" fullWidth>
                Register
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Container>
  );
}
