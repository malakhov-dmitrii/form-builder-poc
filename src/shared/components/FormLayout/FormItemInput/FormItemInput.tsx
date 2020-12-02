import { Input, TextField } from '@material-ui/core';
import React from 'react';
import styles from './FormItemInput.module.scss';

const FormItemInput = () => {
  return (
    <div>
      <TextField placeholder="Default placeholder" variant="outlined" />
    </div>
  );
};

export default FormItemInput;
