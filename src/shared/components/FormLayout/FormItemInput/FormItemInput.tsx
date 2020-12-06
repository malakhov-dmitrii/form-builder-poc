import { TextField } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import FormLayoutContext from '../FormLayout.context';

const FormItemInput: FC<{ mode: 'builder' | 'preview' }> = ({ mode }) => {
  const [value, setValue] = useState('');
  const { fields, init, validate } = FormLayoutContext.useContainer();

  useEffect(() => {
    init(['name', 'label', 'placeholder', 'disabled', 'required']);
  }, []);

  useEffect(() => {
    if (mode === 'preview') {
      validate(value);
    }
  }, [value]);

  return (
    <div>
      <TextField
        size="small"
        label={fields.label}
        placeholder={fields.placeholder}
        disabled={fields.disabled}
        variant="outlined"
        name={fields.name}
        required={fields.required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default FormItemInput;
