// src/pages/Portfolio.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, CircularProgress } from '@mui/material';
import PortfolioItem from '../components/PortfolioItem';
import { fetchPortfolioItems } from '../services/strapi';
import { PortfolioItem as PortfolioItemType } from '../services/types';

const Portfolio = () => {
  const [items, setItems] = useState<PortfolioItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchPortfolioItems();
        setItems(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch portfolio items.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

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
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <Container>
        <Typography>No portfolio items available.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Portfolio Page
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Explore the projects and items in our portfolio.
      </Typography>
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <PortfolioItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Portfolio;