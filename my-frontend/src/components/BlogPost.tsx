// src/components/BlogPost.tsx
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface BlogPostProps {
  title: string;
  content: string;
  author: string;
  date: string;
}

const BlogPost = ({ title, content, author, date }: BlogPostProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            By {author} on {new Date(date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogPost;