// src/pages/Blog.tsx
import { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
import { fetchBlogPosts } from '../services/strapi';
import { BlogPost as BlogPostType } from '../services/types';
import BlogPost from '../components/BlogPost';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch blog posts.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
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

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <Container>
        <Typography>No blog posts available.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h3" component="div" sx={{ textAlign: 'center', mb: 6 }}>
        Blog
      </Typography>
      {posts.map((post) => (
        <BlogPost
          key={post.id}
          title={post.title}
          content={post.body}
          author={post.author}
          date={post.publishedAt}
        />
      ))}
    </Container>
  );
};

export default Blog;