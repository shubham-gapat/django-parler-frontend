import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, Card, CardContent } from '@material-ui/core';

function App() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState('en');
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChangeLanguage = (event) => {
    const lang = event.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products?language='+language);
      setPosts(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, [language]);

  const handleSubmit = async() => {
    try {
      setLoading(true)
      const response = await axios.post('http://127.0.0.1:8000/api/product/create',{
        "name":title,
        "description":content,
        "price":parseInt(price)
    });
      fetchPosts()
      setTitle('');
      setContent('');
      setPrice('')
      setOpen(false);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {t('Products')}
          </Typography>
          <FormControl>
            <InputLabel>{t('Language')}</InputLabel>
            <Select value={language} onChange={handleChangeLanguage}>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Español</MenuItem>
            </Select>
          </FormControl>
          <Button color="inherit" onClick={handleClickOpen}>
            {t('Create product')}
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('Create product')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('Name')}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={t('Name')}
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogContentText>
            {t('Description')}
          </DialogContentText>
          <TextField
            margin="dense"
            label={t('Description')}
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <DialogContentText>
            {t('Price')}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={t('Price')}
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {t('Submit')}
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ padding: 20 }}>
        {posts.map((post, index) => (
          <Card key={index} style={{ marginBottom: 20 }}>
            <CardContent>
              <Typography variant="h5">{post.name}</Typography>
              <Typography>{post.description}</Typography>
              <Typography>{post.price}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;