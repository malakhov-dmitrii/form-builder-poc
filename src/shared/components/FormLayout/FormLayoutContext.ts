import React, { useState } from 'react';
import { createContainer } from 'unstated-next';

interface FormItemConfig {
  name: string;
  options: {
    disabled: boolean;
  };
  placeholder: string;
  checked: boolean;
  label: string;
}

const defaultConfig = {
  name: 'Default name',
  options: {
    disabled: false,
  },
  placeholder: 'Default placeholder',
  checked: true,
  label: 'Default label',
};

const useFormLayout = () => {
  const [config, setConfig] = useState<FormItemConfig>(defaultConfig);
  return { config };
};

export default createContainer(useFormLayout);
