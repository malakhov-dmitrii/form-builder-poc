import {
  Box,
  Button,
  Card,
  Checkbox,
  createStyles,
  Divider,
  FormControlLabel,
  makeStyles,
  Modal,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FormItem, FormItemConfig } from '../../../../interfaces/FormItem';
import FormLayoutContext from '../../../FormLayout/FormLayout.context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalRoot: {
      width: '700px',
      padding: theme.spacing(3),
    },
    modalBox: {
      margin: theme.spacing(2, 0),
    },
    nameLabelContainer: {
      display: 'flex',
    },
    nameLabel: {
      flex: '2 1 auto',
    },
  }),
);

const validationSchema = yup.object({
  name: yup.string().min(3, 'Name should be more than 3 symbols'),
  label: yup.string().min(3, 'Name should be more than 3 symbols'),
});

const EditModal: FC<{ open: boolean; onClose: any; item: FormItem }> = ({
  open,
  onClose,
  item,
}) => {
  const classes = useStyles();
  const { fields, updateFields } = FormLayoutContext.useContainer();

  const handleSubmit = (values: typeof fields) => {
    updateFields(values as FormItemConfig);
    onClose();
  };

  const formik = useFormik({
    initialValues: fields,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal className={classes.modal} open={open} onClose={onClose}>
      <Card className={classes.modalRoot}>
        <Typography variant="h5">
          <b>Tool edit - {item.type}</b>
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box className={classes.nameLabelContainer}>
            {fields.name && (
              <TextField
                className={classes.nameLabel}
                // fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            )}
            <Box m={2} />
            {fields.label && (
              <TextField
                className={classes.nameLabel}
                // fullWidth
                id="label"
                name="label"
                label="Label"
                type="text"
                value={formik.values.label}
                onChange={formik.handleChange}
                error={formik.touched.label && Boolean(formik.errors.label)}
                helperText={formik.touched.label && formik.errors.label}
              />
            )}
            <Box m={2} />
            {fields.placeholder && (
              <TextField
                // fullWidth
                className={classes.nameLabel}
                id="placeholder"
                name="placeholder"
                label="Placeholder"
                type="text"
                value={formik.values.placeholder}
                onChange={formik.handleChange}
                error={
                  formik.touched.placeholder &&
                  Boolean(formik.errors.placeholder)
                }
                helperText={
                  formik.touched.placeholder && formik.errors.placeholder
                }
              />
            )}
          </Box>

          {fields.disabled !== undefined && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.disabled}
                  onChange={formik.handleChange}
                  name="disabled"
                />
              }
              label="Disabled"
            />
          )}

          {fields.required !== undefined && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.required}
                  onChange={formik.handleChange}
                  name="required"
                />
              }
              label="Required"
            />
          )}

          <Box my={2}>
            <Divider />
          </Box>
          <Button color="primary" startIcon={<SaveIcon />} type="submit">
            Save
          </Button>

          <Button onClick={onClose} startIcon={<CloseIcon />}>
            Cancel
          </Button>
        </form>
      </Card>
    </Modal>
  );
};

export default EditModal;
