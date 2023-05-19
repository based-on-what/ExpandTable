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

function createData(dictionary) {
  const matchX = dictionary.match.X;
  const matchY = dictionary.match.Y;

  const firstRowX = matchX[0] || '';
  const firstRowY = matchY[0] || '';

  const getVariable = () =>
    `${dictionary.match.XColumn}: ${firstRowX.substring(0, 5)}...\t${dictionary.match.YColumn}: ${firstRowY.substring(
      0,
      5
    )}...`; // no funciona el \t

  return {
    matchX,
    matchY,
    getVariable,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [variable, setVariable] = React.useState(row.getVariable());

  const handleExpandClick = () => {
    setOpen(!open);
    if (open) {
      setTimeout(() => {
        setVariable(row.getVariable());
      }, 0);
    } else {
      setVariable('');
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleExpandClick}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {variable}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                align="center"
              >
                Matches
              </Typography>
              <Table size="small" aria-label="matches">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">X</TableCell>
                    <TableCell align="center">Y</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.matchX.map((value, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{value}</TableCell>
                      <TableCell align="center">{row.matchY[index]}</TableCell>
                    </TableRow>
                  ))}
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
    matchX: PropTypes.arrayOf(PropTypes.string).isRequired,
    matchY: PropTypes.arrayOf(PropTypes.string).isRequired,
    getVariable: PropTypes.func.isRequired,
  }).isRequired,
};

const columns = {
  match: {
    X: ['Domagoj', 'Cristian', 'Oscar', 'Marjorie', 'Vicente', 'Nicolas'],
    Y: ['Vrgoc', 'Riveros', 'Carcamo', 'Bascunan', 'Calisto', 'Van Sint Jan'],
    XColumn: "X",
    YColumn: "Y"
  },
  submatches: {
    X: [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]],
    Y: [[13, 14], [15, 16], [17, 18], [19, 20], [21, 22], [23, 24]],
    XColumn: "X",
    YColumn: "Y"
  },
};

const data = createData(columns);

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <Row row={data} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
