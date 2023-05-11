import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(variable) {
    return {
      variable,
      columns: {
        'X': [
          {
            firstTuple: ["1", ", ", "2"], // coma entre los submatches para que se visualicen de forma separada
            secondTuple: ["3", ", ", "4"],
          }
        ],
        'Y': [
          {
            firstTuple: ["5", ", ", "6"],
            secondTuple: ["7", ", ", "8"],
          }
        ],
        'Z': [
            {
                firstTuple: ["9", ", ", "10"],
                secondTuple: ["11", ", ", "12"],      
            }
        ],
        'A': [
            {
                firstTuple: ["13", ", ", "14"],
                secondTuple: ["15", ", ", "16"],
            }
        ],
        'B': [
            {
                firstTuple: ["17", ", ", "18"],
                secondTuple: ["19", ", ", "20"],
            }
        ],
        },
        
    };
  }
  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    const columnsRows = Object.entries(row.columns).map(([columnVariable, { firstTuple, secondTuple }]) => ({
      columnVariable,
      firstTuple,
      secondTuple,
    }));
    const columnVariable = Object.keys(row.columns).find(key => key === row.variable);
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.variable}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Submatches
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell >Submatch #1</TableCell>
                      <TableCell >Submatch #2</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.columns[row.variable].map((columnsRow, index) => (
                        <TableRow key={columnVariable + index}>
                            <TableCell >{columnsRow.firstTuple}</TableCell>
                            <TableCell >{columnsRow.secondTuple}</TableCell>
                        </TableRow>
                        ))
                    }
                </TableBody>

                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  

Row.propTypes = {
  row: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        secondTuple: PropTypes.number.isRequired,
        firstTuple: PropTypes.string.isRequired,
        columnVariable: PropTypes.string.isRequired,
      }),
    ).isRequired,
    variable: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('X'),
  createData('Y'),
  createData('Z'),
  createData('A'),
  createData('B'),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Matches</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.variable} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
