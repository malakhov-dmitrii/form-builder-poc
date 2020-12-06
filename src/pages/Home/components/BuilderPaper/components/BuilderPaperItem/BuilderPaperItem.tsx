/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import FormItemLayout from '../../../../../../shared/components/FormItemLayout';
import { FormItem } from '../../../../../../shared/interfaces/FormItem';
import { getItemStyle } from '../../../../../../shared/utils/getStyles';

interface Props {
  item: FormItem;
  index: number;
}

const BuilderPaperItem: FC<Props> = ({ item, index }) => {
  const layout = <FormItemLayout key={item.id} item={item} type="builder" />;

  return (
    <Draggable draggableId={item.id} index={index}>
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
          {layout}
        </div>
      )}
    </Draggable>
  );
};

export default BuilderPaperItem;
