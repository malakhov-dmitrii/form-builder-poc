import {
  createStyles,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Sidebar from '../../shared/components/Sidebar';
import BuilderPaper from './components/BuilderPaper';
import FormItemsContext from '../../shared/context/FormItems.context';
import Preview from './components/Preview';

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
  const { items, onDragEnd } = FormItemsContext.useContainer();
  const [panelIdx, setPanelIdx] = useState(0);
  const onModeChange = (e: any, value: number) => {
    setPanelIdx(value);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.root}>
        <Sidebar />
        <Paper className={classes.content}>
          <Tabs
            value={panelIdx}
            onChange={onModeChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Builder" />
            <Tab disabled={items.length === 0} label="Preview" />
          </Tabs>

          {panelIdx === 0 && (
            <div className={classes.droppable}>
              <BuilderPaper items={items} />
            </div>
          )}
          {panelIdx === 1 && <Preview items={items} />}
        </Paper>
      </div>
    </DragDropContext>
  );
};

export default Home;
