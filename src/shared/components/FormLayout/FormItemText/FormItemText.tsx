import {
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import styles from './FormItemText.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },

    input: {
      width: 300,
    },
  }),
);

const FormItemText = () => {
  const classes = useStyles();
  const [text, setText] = useState('Default text');

  return (
    <div>
      <Typography variant="h5">{text}</Typography>
      <div className={classes.root}>
        <TextField
          className={classes.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing to change the text"
        />
      </div>
    </div>
  );
};

export default FormItemText;
