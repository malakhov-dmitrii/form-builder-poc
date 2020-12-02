import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { random } from 'lodash';
import Sidebar from '../../shared/components/Sidebar';
import { FormItem } from '../../shared/interfaces/FormItem';
import BuilderPaper from '../../shared/components/BuilderPaper';

// a little function to help us with reordering the result
const reorder = (list: any[], oldIndex: number, newIndex: number) => {
  const temp = list[newIndex];
  // eslint-disable-next-line no-param-reassign
  list[newIndex] = list[oldIndex];
  // eslint-disable-next-line no-param-reassign
  list[oldIndex] = temp;

  console.log('reorder: ', list);

  return list;
};

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    button: {
      marginLeft: theme.spacing(2),
      cursor: 'move',
      userSelect: 'none',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: theme.spacing(3),
    },
    draggableItem: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: '50px',
      border: '1px dashed black',
      padding: theme.spacing(1, 2),
    },
    droppable: {
      border: '1px solid black',
      padding: theme.spacing(2),
      margin: theme.spacing(2),
    },
  }),
);

const Home = () => {
  const classes = useStyles();
  const [items, setItems] = useState<FormItem[]>([]);

  const handleDelete = (id: string): void => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleAddNewItem = (result: DropResult) => {
    // @ts-ignore
    setItems([
      ...items,
      {
        id: `${result.draggableId}_${random(0, 100000)}`,
        content: `draggable ${result.draggableId} #${items.length}`,
        type: result.draggableId.split('-')[1],
      },
    ]);
  };

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    console.log(result);
    if (
      result.destination.droppableId === 'droppable-form' &&
      (result.source.droppableId === 'droppable-layouts' ||
        result.source.droppableId === 'droppable-components')
    )
      handleAddNewItem(result);

    if (
      result.destination.droppableId === 'droppable-form' &&
      result.source.droppableId === 'droppable-form'
    ) {
      // @ts-ignore
      setItems(reorder(items, result.source.index, result.destination.index));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.root}>
        <Sidebar />
        <Paper className={classes.content}>
          <div className={classes.droppable}>
            <BuilderPaper items={items} onDelete={handleDelete} />
          </div>
        </Paper>
      </div>
    </DragDropContext>
  );
};

export default Home;
