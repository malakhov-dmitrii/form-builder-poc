import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import FormLayoutContext from '../FormLayout.context';

const FormItemCheckbox: FC<{ mode: 'builder' | 'preview' }> = () => {
  const { fields, init } = FormLayoutContext.useContainer();

  useEffect(() => {
    init(['name', 'label', 'disabled', 'required']);
  }, []);

  return (
    <FormControlLabel
      control={<Checkbox name={fields.name} />}
      label={fields.label}
      disabled={fields.disabled}
    />
  );
};

export default FormItemCheckbox;
