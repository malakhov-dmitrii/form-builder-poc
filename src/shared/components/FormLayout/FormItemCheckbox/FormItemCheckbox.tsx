import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './FormItemCheckbox.module.scss';

const FormItemCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={() => setChecked(!checked)}
          name="checkedA"
        />
      }
      label="Checkbox"
    />
  );
};

export default FormItemCheckbox;
