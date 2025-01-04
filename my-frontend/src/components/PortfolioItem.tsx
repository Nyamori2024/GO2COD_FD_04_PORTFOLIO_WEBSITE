// src/components/PortfolioItem.tsx
import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface PortfolioItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
  };
}

const PortfolioItem = ({ item }: PortfolioItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          height="140"
          image={item.image}
          alt={item.title}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            {item.tags.map((tag, index) => (
              <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PortfolioItem;