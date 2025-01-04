// src/pages/ManageContent.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { fetchContent, addContent, updateContent, deleteContent } from '../services/contentService';
import { useNavigate } from 'react-router-dom';

interface ContentItem {
  id: string;
  title: string;
  body: string;
}

const ManageContent = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]); // Ensure initial state is an empty array
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [newContent, setNewContent] = useState({ title: '', body: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchContent();
        if (Array.isArray(data)) {
          setContentItems(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddContent = async () => {
    try {
      const addedContent = await addContent(newContent);
      setContentItems([...contentItems, addedContent]);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding content:', error);
    }
  };

  const handleUpdateContent = async () => {
    if (selectedContent) {
      try {
        const updatedContent = await updateContent(selectedContent.id, selectedContent);
        setContentItems(contentItems.map(content => (content.id === updatedContent.id ? updatedContent : content)));
        setIsDialogOpen(false);
      } catch (error) {
        console.error('Error updating content:', error);
      }
    }
  };

  const handleDeleteContent = async (id: string) => {
    try {
      await deleteContent(id);
      setContentItems(contentItems.filter(content => content.id !== id));
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleOpenDialog = (content: ContentItem | null) => {
    setSelectedContent(content);
    setNewContent({ title: '', body: '' });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedContent(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedContent) {
      setSelectedContent({ ...selectedContent, [name]: value });
    } else {
      setNewContent({ ...newContent, [name]: value });
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Content
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog(null)}>
          Add Content
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contentItems.map((content) => (
              <TableRow key={content.id}>
                <TableCell>{content.title}</TableCell>
                <TableCell>{content.body}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleOpenDialog(content)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteContent(content.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="contained" color="primary" onClick={() => navigate('/admin')}>
          Back to Admin Dashboard
        </Button>
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{selectedContent ? 'Edit Content' : 'Add Content'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={selectedContent?.title || newContent.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="body"
            label="Body"
            type="text"
            fullWidth
            value={selectedContent?.body || newContent.body}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={selectedContent ? handleUpdateContent : handleAddContent} color="primary">
            {selectedContent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageContent;