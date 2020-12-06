import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import FormLayoutContext from '../FormLayout.context';

const FormItemText = () => {
  const { fields, init } = FormLayoutContext.useContainer();

  useEffect(() => {
    init(['name']);
  }, []);

  return (
    <div>
      <Typography variant="h5">{fields.name}</Typography>
    </div>
  );
};

export default FormItemText;
