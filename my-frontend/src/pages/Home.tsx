// src/pages/Home.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { fetchPortfolioItems } from '../services/strapi';
import { setPortfolioItems, setLoading, setError } from '../features/portfolioSlice';
import { RootState } from '../store';
import PortfolioItem from '../components/PortfolioItem';

const Home = () => {
  const dispatch = useDispatch();
  const portfolioItems = useSelector((state: RootState) => state.portfolio.items);
  const isLoading = useSelector((state: RootState) => state.portfolio.isLoading);
  const error = useSelector((state: RootState) => state.portfolio.error);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const items = await fetchPortfolioItems();
        dispatch(setPortfolioItems(items));
      } catch (err) {
        dispatch(setError('Failed to fetch portfolio items'));
        console.error('Failed to fetch portfolio items', err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  if (!Array.isArray(portfolioItems)) {
    return (
      <Container>
        <Typography color="error">Error: Invalid data format</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h3" component="div" sx={{ textAlign: 'center', mb: 6 }}>
        Portfolio
      </Typography>
      <Grid container spacing={3}>
        {portfolioItems.map((item) => (
          <Grid item xs={12} sm={6} lg={4} key={item.id}>
            <PortfolioItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;