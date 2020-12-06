/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */

import {
  Box,
  Button,
  createStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import { getListStyle, getItemStyle } from '../../utils/getStyles';
import FormItemsContext from '../../context/FormItems.context';

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

const Sidebar: FC = () => {
  const classes = useStyles();
  const { onAddTable } = FormItemsContext.useContainer();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem>
            <Typography variant="h6">Cell layout</Typography>
            {/* <ListItemText primary="Cell layouts" /> */}
          </ListItem>
          <Box m={2}>
            <Button onClick={onAddTable} color="primary" variant="contained">
              Add table layout
            </Button>
          </Box>
        </List>

        <Box my={2}>
          <Divider />
        </Box>

        <ListItem>
          <Typography variant="h6">Form components</Typography>
          {/* <ListItemText primary="Cell layouts" /> */}
        </ListItem>
        <List>
          <Droppable droppableId="droppable-components">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {[
                  { text: 'Input', id: 'item-input' },
                  { text: 'Text', id: 'item-text' },
                  { text: 'Checkbox', id: 'item-checkbox' },
                  { text: 'File uploader', id: 'item-file_uploader' },
                  { text: 'Divider', id: 'item-divider' },
                ].map((item, index) => (
                  <Draggable
                    // @ts-ignore
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // @ts-ignore
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        <Box className={classes.draggableItem}>
                          <OpenWithIcon />
                          <div>
                            <b>{item.text}</b>
                          </div>
                        </Box>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
