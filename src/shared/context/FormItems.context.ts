import { random } from 'lodash';
import { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { createContainer } from 'unstated-next';
import { FormItem } from '../interfaces/FormItem';
import { defaultConfig } from '../utils/constants';

// Inplace change wont trigger changes
const reorder = (list: any[], oldIndex: number, newIndex: number) => {
  const newList = [...list];
  const temp = newList[newIndex];
  // eslint-disable-next-line no-param-reassign
  newList[newIndex] = newList[oldIndex];
  // eslint-disable-next-line no-param-reassign
  newList[oldIndex] = temp;

  return newList;
};

const getNewItem = (items: FormItem[], result: Partial<DropResult>) => {
  const res: FormItem[] = [
    ...items,
    {
      id: `${result.draggableId}_${random(0, 100000)}`,
      content: `draggable ${result.draggableId} #${items.length}`,
      type: (result.draggableId || '').split('-')[1],
      config: defaultConfig,
      isValid: true,
    },
  ];

  return res;
};

const useFormItems = () => {
  const [items, setItems] = useState<FormItem[]>([]);

  const handleDelete = (id: string): void => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleDuplicate = (item: FormItem): void => {
    setItems([
      ...items,
      {
        id: `${item.id.split('_')[0]}_${random(0, 100000)}`,
        content: `${item.content} - copy`,
        type: item.type,
        config: item.config,
        isValid: true,
      },
    ]);
  };

  const onAddTable = () => {
    setItems(
      getNewItem(items, { draggableId: `item-table-${random(0, 1000)}` }),
    );
  };

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    console.log(result);
    console.log(result.destination.droppableId.includes('droppable-cell'));

    if (
      (result.destination.droppableId === 'droppable-form' &&
        (result.source.droppableId === 'droppable-layouts' ||
          result.source.droppableId === 'droppable-components')) ||
      (result.source.droppableId === 'droppable-components' &&
        result.destination.droppableId.includes('droppable-cell'))
    )
      setItems(getNewItem(items, result));

    if (
      result.destination.droppableId === 'droppable-form' &&
      result.source.droppableId === 'droppable-form'
    ) {
      setItems(reorder(items, result.source.index, result.destination.index));
    }
  };

  const updateItem = (item: FormItem) => {
    const oldItems = [...items];
    const changedItemIdx = oldItems.findIndex((i) => i.id === item.id);
    oldItems[changedItemIdx] = item;
    setItems(oldItems);
  };

  return {
    onDragEnd,
    items,
    handleDelete,
    handleDuplicate,
    updateItem,
    onAddTable,
  };
};

export default createContainer(useFormItems);
