'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, List, ListItem, Box } from '@mui/material';
import Link from 'next/link';

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks/view');
        const data = await res.json();
        console.log('data after fetch', data)
      setTasks(data);
    };

    fetchTasks();
    
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/tasks/delete/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      // Remove the deleted task from the local state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Tasks
      </Typography>
      {tasks.length === 0 ? (
        <Typography variant="body1">No tasks available.</Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem key={task._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2">{task.description}</Typography>
              </Box>
              <Box>
                <Link href={`/tasks/update/${task._id}`}>
                  <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                    Update
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}
