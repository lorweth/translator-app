import { Box, Divider, LinearProgress, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAllCategories, findCategoryByName } from './category.reducer';
import { Outlet, useNavigate } from 'react-router-dom';

const Training = () => {
  return <Outlet />;
};
export default Training;
