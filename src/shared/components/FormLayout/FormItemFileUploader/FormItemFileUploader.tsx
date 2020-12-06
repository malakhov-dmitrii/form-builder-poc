import { Input } from '@material-ui/core';
import React, { useEffect } from 'react';
import FormLayoutContext from '../FormLayout.context';

const FormItemFileUploader = () => {
  const { fields, init } = FormLayoutContext.useContainer();

  useEffect(() => {
    init(['name', 'disabled', 'required']);
  }, []);

  return (
    <Input
      type="file"
      name={fields.name}
      required={fields.required}
      disabled={fields.disabled}
    />
  );
};

export default FormItemFileUploader;
