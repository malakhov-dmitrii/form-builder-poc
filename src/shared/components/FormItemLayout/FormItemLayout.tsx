import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import React, { FC, useState } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import { FormItem } from '../../interfaces/FormItem';
import FormLayout from '../FormLayout';
import FormLayoutContext from '../FormLayout/FormLayoutContext';
import EditModal from './components/EditModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(1, 3),
      position: 'relative',
      borderLeft: '1px dashed grey',
    },
    controls: {
      position: 'absolute',
      right: 0,
      top: 0,
      border: '1px solid black',
      borderRadius: '50px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f6f6f6',
      padding: '2px 4px',
    },
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

interface FormItemProps {
  item: FormItem;
  onDelete: (id: string) => void;
  onDuplicate?: (type: string) => void;
}

const FormItemLayout: FC<FormItemProps> = ({ item, onDelete }) => {
  const classes = useStyles();
  const [editOpen, setEditOpen] = useState(false);

  let content;

  if (item.type === 'divider') {
    content = <FormLayout.FormItemDivider />;
  }

  if (item.type === 'input') {
    content = <FormLayout.FormItemInput />;
  }

  if (item.type === 'table') {
    content = <FormLayout.FormLayoutTable />;
  }

  if (item.type === 'text') {
    content = <FormLayout.FormItemText />;
  }

  if (item.type === 'checkbox') {
    content = <FormLayout.FormItemCheckbox />;
  }

  if (item.type === 'file_uploader') {
    content = <FormLayout.FormItemFileUploader />;
  }

  const conrols = (
    <div className={classes.controls}>
      <IconButton size="small">
        <AddCircleIcon fontSize="small" />
      </IconButton>
      <IconButton
        color="primary"
        size="small"
        onClick={() => setEditOpen(true)}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        color="secondary"
        size="small"
        onClick={() => onDelete(item.id)}
      >
        <DeleteForeverIcon fontSize="small" />
      </IconButton>
    </div>
  );

  return (
    <div className={classes.root}>
      <FormLayoutContext.Provider>
        {conrols}
        {content || item.content}

        <EditModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          item={item}
        />
      </FormLayoutContext.Provider>
    </div>
  );
};

export default FormItemLayout;
