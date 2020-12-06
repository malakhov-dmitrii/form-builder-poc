/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */

import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FormItem } from '../../../../shared/interfaces/FormItem';
import { getListStyle } from '../../../../shared/utils/getStyles';
import BuilderPaperItem from './components/BuilderPaperItem';

interface Props {
  items: FormItem[];
}

const BuilderPaper: FC<Props> = ({ items }) => {
  return (
    <Droppable droppableId="droppable-form">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {items.map((item: FormItem, index: number) => (
            <BuilderPaperItem key={item.id} item={item} index={index} />
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
