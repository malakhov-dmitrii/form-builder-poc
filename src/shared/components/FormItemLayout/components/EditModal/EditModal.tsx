import {
  Box,
  Button,
  Card,
  Checkbox,
  createStyles,
  Divider,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Modal,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { FormItem } from '../../../../interfaces/FormItem';
import FormLayoutContext from '../../../FormLayout/FormLayoutContext';

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
  }),
);

const EditModal: FC<{ open: boolean; onClose: any; item: FormItem }> = ({
  open,
  onClose,
  item,
}) => {
  const classes = useStyles();
  const form = FormLayoutContext.useContainer();
  const { name, checked, label, placeholder, options } = form.config;

  return (
    <Modal className={classes.modal} open={open} onClose={onClose}>
      <Card className={classes.modalRoot}>
        <Typography variant="h5">
          <b>Tool edit - {item.type}</b>
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e.target);
          }}
          action="#"
        >
          <Box className={classes.modalBox}>
            <Typography variant="h6">
              <b>Name</b>
            </Typography>
            <TextField name="name" variant="outlined" size="small" />
          </Box>

          <Box className={classes.modalBox}>
            <Typography variant="h6">
              <b>Options</b>
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  // onChange={() => setChecked(!checked)}
                  name="disabled"
                />
              }
              label="Disabled"
            />
          </Box>
          <Box my={2}>
            <Divider />
          </Box>
          <Button color="primary" startIcon={<SaveIcon />} type="submit">
            Save
          </Button>

          <Button startIcon={<CloseIcon />}>Cancel</Button>
        </form>
      </Card>
    </Modal>
  );
};

export default EditModal;
