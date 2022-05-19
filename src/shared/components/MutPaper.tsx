import { Paper } from '@mui/material';
import React from 'react';

const MutPaper = props => {
  const [isOver, setIsOver] = React.useState(false);
  const { vocabulary } = props;

  const onMouseOver = () => setIsOver(true);

  const onMouseOut = () => setIsOver(false);

  return (
    <Paper
      {...props}
      style={{
        backgroundColor: isOver ? '#00b0ff' : 'white',
        color: isOver ? 'white' : 'black',
        fontSize: '1.2rem',
      }}
      onMouseOver={() => onMouseOver()}
      onMouseOut={() => onMouseOut()}
    >
      {isOver ? vocabulary.meaning : vocabulary.word}
    </Paper>
  );
};
export default MutPaper;
