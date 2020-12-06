/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import {
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Tooltip,
} from '@material-ui/core';
import { random } from 'lodash';
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { FormItem } from '../../../interfaces/FormItem';
import { defaultConfig } from '../../../utils/constants';
import FormItemLayout from '../../FormItemLayout';

const getNewItem = () => {
  const res: FormItem = {
    id: `item-input_${random(0, 100000)}`,
    content: `draggable item-input #${random(0, 100000)}`,
    type: 'input',
    config: {
      ...defaultConfig,
      label: `label ${random(0, 100)}`,
      disabled: false,
    },
    isValid: true,
  };

  return res;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
      padding: theme.spacing(1, 1),
      position: 'relative',
      // pointerEvents: 'none',
    },
    grid: {},
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    rowControls: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: '0',
      background: '#f6f6f6',
      borderRadius: '50%',
      border: '1px solid black',
    },
  }),
);

const createCells = (num: number) => {
  const cells = [];
  for (let i = 0; i < num; i += 1) {
    cells.push(`droppable-cell-${random(0, 100000)}`);
  }
  return cells;
};

const initCols = 3;
const initRows = 2;

const FormLayoutTable = () => {
  const classes = useStyles();
  const [cols, setCols] = useState(initCols);
  const [rows, setRows] = useState(initRows);
  const [cells, setCells] = useState(createCells(cols * rows));

  useEffect(() => {
    const diff = cols * rows - cells.length;
    if (diff < 0) {
      setCells(cells.slice(0, cells.length - 1 - Math.abs(diff)));
    }
    if (diff > 0) {
      setCells([...cells, ...createCells(diff)]);
    }
  }, [cells, rows]);

  const rowControls = (
    <div className={classes.rowControls}>
      <Tooltip title="Add row">
        <IconButton size="small">
          <AddCircleIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );

  return (
    <Paper className={classes.root}>
      {rowControls}
      <Grid container spacing={2}>
        {cells.map((i) => (
          <Grid key={i} item xs={4}>
            <Paper className={classes.paper} elevation={0}>
              <FormItemLayout item={getNewItem()} type="builder" />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default FormLayoutTable;
