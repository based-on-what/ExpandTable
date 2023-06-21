import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
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
    const preview = joinAndTruncateValues(values[0]); // Use the first value for the preview

    return {
      key,
      values,
      preview,
    };
  });

  return rows;
}

const columns = {
  match: {
    "Nicolas Van Sint Jan": [
      ["Nicolas"],
      ["Nicolas"],
      ["icolas"],
      ["Van"],
      ["Van"],
      ["Sint"],
      ["Sint"],
      ["Jan"],
      ["Jan"],
    ],
  },
};

const ROW_WIDTH = 100 / columns.match["Nicolas Van Sint Jan"].length;

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const truncatedKey = row.key.length > 5 ? `${row.key.substring(0, 5)}...` : row.key;
  const truncatedValues = row.values.map((value) =>
    value.length > 5 ? `${value.substring(0, 5)}...` : value
  );

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{ width: `${ROW_WIDTH}%` }}>
          {truncatedKey}
        </TableCell>
        {truncatedValues.map((value, index) => (
          <TableCell key={index} style={{ width: `${ROW_WIDTH}%` }}>
            {value[0].length > 5 ? `${value[0].substring(0, 5)}...` : value}
          </TableCell>
        ))}
      </TableRow>
      {open && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={row.values.length + 1}>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Matches
              </Typography>
              <Table size="small" aria-label="matches">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Dictionary Key</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.values.map((value, index) => (
                    <TableRow key={index}>
                      <TableCell>{value}</TableCell>
                      <TableCell>{index === 0 ? row.key : ''}</TableCell>
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
    key: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
};

const data = createData(columns);

export default function CollapsibleTable() {
  const numValues = columns.match["Nicolas Van Sint Jan"].length;
  const TRUNCATE_LIMIT = 5;
  const truncatedValues = Array.from({ length: numValues }, (_, index) => {
    const value = String.fromCharCode(65 + index);
    return value.length > TRUNCATE_LIMIT ? `${value.substring(0, TRUNCATE_LIMIT)}...` : value;
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dictionary Key</TableCell>
            {truncatedValues.map((value, index) => (
              <TableCell key={index}>Value {value}</TableCell>
            ))}
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

