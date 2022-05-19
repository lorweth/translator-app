import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Copyright from './copyright';

interface FooterProps {
  description: string;
  title: string;
}

export default function Footer(props: FooterProps) {
  const { description, title } = props;

  return (
    <Container maxWidth="lg">
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
        {description}
      </Typography>
      <Copyright />
    </Container>
  );
}
