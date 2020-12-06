import { pick } from 'lodash';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import FormItemsContext from '../../context/FormItems.context';
// eslint-disable-next-line import/no-cycle
import { FormItem, FormItemConfig } from '../../interfaces/FormItem';
import { defaultConfig } from '../../utils/constants';

const useFormLayout = (item: FormItem) => {
  const [data, setData] = useState<FormItem>(item);
  const [fields, setFields] = useState(data);
  const [fieldsNames, setFieldsNames] = useState(Object.keys(defaultConfig));
  const { updateItem } = FormItemsContext.useContainer();

  useEffect(() => {
    setData({ ...item, config: data.config });
  }, [item]);

  const init = (fieldsArr: Array<keyof FormItemConfig>) => {
    setFieldsNames(fieldsArr);
  };

  const updateFields = (values: FormItemConfig) => {
    const dataItem = { ...data, config: values };
    setData(dataItem);
    updateItem(dataItem);
  };

  const validate = (value: any) => {
    if (!value && fields.config.required) {
      setData({ ...data, isValid: false });
      updateItem({ ...data, isValid: false });
    } else {
      setData({ ...data, isValid: true });
      updateItem({ ...data, isValid: true });
    }
  };

  useEffect(() => {
    setFields({
      ...item,
      config: pick(data.config, fieldsNames) as FormItemConfig,
    });
  }, [data, fieldsNames]);

  return { fields: fields.config, init, updateFields, data, validate };
};

// @ts-ignore
export default createContainer(useFormLayout);
