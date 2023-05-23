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

function joinAndTruncateValues(values) {
  const joinedString = values.join(',');
  if (joinedString.length > 10) {
    return joinedString.substring(0, 10) + '...';
  }
  return joinedString;
}

function createData(dictionary) {
  const keys = Object.keys(dictionary.match);
  const rows = keys.map((key) => {
    const values = dictionary.match[key];
    const preview = joinAndTruncateValues(values);

    return {
      key,
      values,
      preview,
    };
  });

  return rows;
}


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell component="th" scope="row" style={{ width: '50%' }}>
          {row.preview}
        </TableCell>
      </TableRow>
      {open && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Matches
              </Typography>
              <Table size="small" aria-label="matches">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '50%' }}></TableCell>
                    <TableCell style={{ width: '50%' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.values.map((value, index) => (
                    <TableRow key={index}>
                      <TableCell>{value}</TableCell>
                      <TableCell>
                        {index === 0 ? row.key : ''} {/* Display key in the first row, otherwise show blank */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}


Row.propTypes = {
  row: PropTypes.shape({
    preview: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const columns = {
  match: {
    "La casa de mi mamá": ["La", "casa", "de", "mi", "mamá"],
    "Tiene un techo": ["Tiene", "un", "techo"],
    "De color rojo anaranjado": ["De", "color", "rojo", "anaranjado"],
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
          {data.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
