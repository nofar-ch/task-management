import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import CheckIcon from '@material-ui/icons/Check'
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import HeightIcon from '@material-ui/icons/Height';

const style = require('./styles')

var sort = 'down';

const CustomerList = ({customers, agreements, customersSortByNameFn, customersSortByDateFn}) => {

  const rows = customers;

  const sorting = (by, id) => {
    sort = by;
    if(id === 'user')
    customersSortByNameFn(by);
    else if(id === 'date')
    customersSortByDateFn(by);
}

 const headCells = [
        { id: 'user', numeric: false, disablePadding: true, label: 'שם משתמש' },
        { id: 'phone', numeric: true, disablePadding: false, label: 'טלפון' },
        { id: 'email', numeric: false, disablePadding: false, label: 'מייל' },
        { id: 'date', numeric: false, disablePadding: false, label: 'חתימת הסכם' },
        { id: 'operation', numeric: false, disablePadding: false, label: 'פעולות' },
      ];

  
  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead >
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell dir="ltr"
              key={headCell.id}
              align="right"
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
               {
            headCell.id === "user" ?
             <HeightIcon 
                onClick={sort === 'down' ? () => sorting('up', 'user') :  () => sorting('down', 'user') }
                />
             :
            headCell.id === "date" ?
            <HeightIcon
                onClick={sort === 'down' ? () => sorting('up', 'date') :  () => sorting('down', 'date') }
                /> : null
            }
            {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const EnhancedTableToolbar = (props) => {
    const classes = style.useToolbarStyles();
    const { numSelected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            רשימת הלוקוחות שלך
         ({rows.length})
          </Typography>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  


  const EnhancedTable = () => {
    const classes = style.useStyles();
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead dir="ltr"
                classes={classes}
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={rows.length}
              />
              <TableBody>
              {rows.map((row, index) => {
                         const isItemSelected = isSelected(row.name);
                         const labelId = `enhanced-table-checkbox-${index}`;
      
                         return (
                           <TableRow dir="ltr" align="right"
                             hover
                             onClick={(event) => handleClick(event, row.name)}
                             role="checkbox"
                             aria-checked={isItemSelected}
                             tabIndex={-1}
                             key={index}
                             selected={isItemSelected}
                           >
                             <TableCell padding="checkbox">
                               <Checkbox
                                 checked={isItemSelected}
                                 inputProps={{ 'aria-labelledby': labelId }}
                               />
                             </TableCell>
                             <TableCell component="th" id={labelId} scope="row" padding="none" align="right" dir="ltr">
                               {row.name}
                             </TableCell>
                             <TableCell align="right" dir="ltr">{row.phone}</TableCell>
                             <TableCell align="right" dir="ltr">{row.email}</TableCell>
                             {
                                agreements.filter((item) => item.idCustomer === row.idCustomer).length > 0 ?
                                <TableCell align="right" dir="ltr">{row.agreementDate.substring(0,10)}<CheckIcon/></TableCell>
                                :
                                <TableCell align="right" dir="ltr" style={{paddingRight:"40px"}}>{row.agreementDate.substring(0,10)}</TableCell>
                             }
                             <TableCell align="right" dir="ltr">
                             <DeleteOutlineIcon style={{padding: '10px'}}/>
                             <EditIcon style={{padding: '10px'}}/>
                             <VisibilityIcon style={{padding: '10px'}}/>
                             </TableCell>
                           </TableRow>
                         );
                       })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </div>
    );
  }

  return EnhancedTable();

}

export default CustomerList;


