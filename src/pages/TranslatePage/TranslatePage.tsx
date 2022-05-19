import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  TextField,
  Grid,
  Select,
  MenuItem,
  IconButton,
  Paper,
  LinearProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { translateS2T } from './translate.reducer';

const Translate = () => {
  const dispatch = useAppDispatch();

  const [tData, setTData] = useState({
    text: '',
    to: 'vi',
    from: 'en',
  });

  const loading = useAppSelector(state => state.translate.loading);
  const errorMessage = useAppSelector(state => state.translate.errorMessage);
  const translatedText = useAppSelector(state => state.translate.translated);

  useEffect(() => {
    if (!loading && errorMessage !== '') {
      toast.error(errorMessage);
    }
  }, [loading, errorMessage]);

  const onChange = e => {
    const { name, value } = e.target;
    setTData({ ...tData, [name]: value });
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      // Loại bỏ các ký tự đặc biệt
      const value = event.target.value.replace(/(\r\n|\n|\r)/gm, '');
      // eslint-disable-next-line no-console
      console.log(value);
      if (tData.text !== value) {
        // Ghi lại để tránh trường hợp người dùng nhấn Enter nhiều lần
        setTData({ ...tData, text: value });
        // Gọi API
        dispatch(translateS2T({ text: value, to: tData.to, from: tData.from }));
      }
    }
  };

  const onClickReverse = () => {
    const { to, from } = tData;
    setTData({ ...tData, to: from, from: to });
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 1 }}>
      <Paper elevation={3} sx={{ padding: 5 }}>
        <Grid container>
          <Grid item xs={5}>
            <Select fullWidth value={tData.from} size="small" onChange={onChange}>
              <MenuItem value={'en'}>English</MenuItem>
              <MenuItem value={'vi'}>Vietnamese</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <IconButton color="primary" size="medium" onClick={onClickReverse}>
              <FontAwesomeIcon icon="arrow-right-arrow-left" />
            </IconButton>
          </Grid>
          <Grid item xs={5}>
            <Select fullWidth value={tData.to} size="small" onChange={onChange}>
              <MenuItem value={'en'}>English</MenuItem>
              <MenuItem value={'vi'}>Vietnamese</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <TextField margin="normal" fullWidth multiline rows={5} onKeyDown={handleKeyDown} />
          </Grid>
          <Grid item sm={12} md={6}>
            {loading ? (
              <LinearProgress sx={{ marginTop: 5 }} />
            ) : (
              <TextField
                margin="normal"
                fullWidth
                multiline
                rows={5}
                value={translatedText}
                variant="filled"
                disabled
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export default Translate;
