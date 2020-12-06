import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import React, { FC, useMemo, useState } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import { FormItem } from '../../interfaces/FormItem';
import FormLayout from '../FormLayout';
import FormLayoutContext from '../FormLayout/FormLayout.context';
import EditModal from './components/EditModal';
import FormItemsContext from '../../context/FormItems.context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(1, 3),
      position: 'relative',
      borderLeft: '1px dashed grey',
    },
    rootPreview: {
      margin: theme.spacing(1),
      padding: theme.spacing(1, 3),
      position: 'relative',
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
      zIndex: 1,
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
  type: 'preview' | 'builder';
}

const FormItemLayout: FC<FormItemProps> = ({ item, type }) => {
  const classes = useStyles();
  const [editOpen, setEditOpen] = useState(false);
  const { handleDelete, handleDuplicate } = FormItemsContext.useContainer();

  const content = useMemo(() => {
    if (item.type === 'divider') return <FormLayout.FormItemDivider />;

    if (item.type === 'input') return <FormLayout.FormItemInput mode={type} />;

    if (item.type === 'table') return <FormLayout.FormLayoutTable />;

    if (item.type === 'text') return <FormLayout.FormItemText />;

    if (item.type === 'checkbox')
      return <FormLayout.FormItemCheckbox mode={type} />;

    if (item.type === 'file_uploader')
      return <FormLayout.FormItemFileUploader />;

    return item.content;
  }, [item.type]);

  const conrols = type === 'builder' && (
    <div className={classes.controls}>
      <IconButton onClick={() => handleDuplicate(item)} size="small">
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
        onClick={() => handleDelete(item.id)}
      >
        <DeleteForeverIcon fontSize="small" />
      </IconButton>
    </div>
  );

  return (
    <div className={type === 'builder' ? classes.root : classes.rootPreview}>
      <FormLayoutContext.Provider initialState={item}>
        {conrols}

        {content}

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
