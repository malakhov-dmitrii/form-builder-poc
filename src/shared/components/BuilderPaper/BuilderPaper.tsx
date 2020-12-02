/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */

import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FormItem } from '../../interfaces/FormItem';
import { getListStyle, getItemStyle } from '../../utils/getStyles';
import FormItemLayout from '../FormItemLayout';

interface Props {
  items: FormItem[];
  onDelete: (id: string) => void;
}

const BuilderPaper: FC<Props> = ({ items, onDelete }) => {
  return (
    <Droppable droppableId="droppable-form">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {items.map((item: any, index: any) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
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
                  <FormItemLayout
                    key={item.id}
                    item={item}
                    onDelete={onDelete}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          {items.length === 0 && (
            <Typography variant="h4">Start dragging here</Typography>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default BuilderPaper;
