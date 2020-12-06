import { Box, Button, Divider, Typography } from '@material-ui/core';
import React, { FC, useState } from 'react';
import FormItemLayout from '../../../../shared/components/FormItemLayout';
import { FormItem } from '../../../../shared/interfaces/FormItem';

const Preview: FC<{ items: FormItem[] }> = ({ items }) => {
  const [message, setMessage] = useState('');

  const onEval = () => {
    console.log(items);

    if (items.some((i) => !i.isValid)) {
      setMessage('Form is invalid');
    } else {
      setMessage('');
    }
  };
  return (
    <div>
      {items.map((item) => (
        <FormItemLayout key={item.id} type="preview" item={item} />
      ))}

      <Box m={4}>
        <Divider />
      </Box>

      <Box m={4}>
        <Typography color="secondary">{message}</Typography>
      </Box>
      <Box m={4}>
        <Button color="primary" variant="contained" onClick={onEval}>
          Evaluate
        </Button>
      </Box>
    </div>
  );
};

export default Preview;
