import { Divider } from '@material-ui/core';
import React, { useEffect } from 'react';
import FormLayoutContext from '../FormLayout.context';

const FormItemDivider = () => {
  const { init } = FormLayoutContext.useContainer();

  useEffect(() => {
    init([]);
  }, []);

  return <Divider />;
};

export default FormItemDivider;
