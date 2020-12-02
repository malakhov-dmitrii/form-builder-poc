import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

const grid = 8;

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
) => ({
  userSelect: 'none',
  padding: '6px',
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'transparent',
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#bcefff94' : 'transparent',
  padding: grid,
  width: 'calc(100% - 30px)',
  margin: 'auto',
});
