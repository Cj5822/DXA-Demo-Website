import { Stack, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container>
      <Stack spacing={4} alignItems="center" mt={5}>
        <Typography variant="h2" color="primary">
          Welcome to DXA Demo Website
        </Typography>

        <Typography variant="body1" color="text.secondary">
          This is your home page. Start adding sections, images, or cards here.
        </Typography>

        <Button variant="contained" component={Link} to="/products">
          Shop Now
        </Button>
      </Stack>
    </Container>
  );
}
