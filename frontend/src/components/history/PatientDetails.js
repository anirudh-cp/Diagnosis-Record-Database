import React from 'react'
import Loading from '../common/Loading';

const PatientDetails = ({ rows, rowCountState, loading }) => {

    const [loadingMessage, setLoadingMessage] = React.useState("Loading...")


    const useStyles = makeStyles({
        customStyles: {
            '& .MuiDataGrid-columnHeaders': {
                display: 'none',
            },
            '& .MuiDataGrid-viewport': {
                top: '0 !important',
            },
            '& .MuiDataGrid-row:first-of-type': {
                fontSize: '1.25rem', // Adjust the font size as needed
            },
            '& .MuiDataGrid-cell:first-of-type': {
                fontWeight: 'bold',
            },
        },
    });

    const classes = useStyles();

    const columns = [
        {
            field: 'field',
            headerName: 'Field',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            disableColumnMenu: true,
        },
        {
            field: 'value',
            headerName: 'Value',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            disableColumnMenu: true,
        },
    ]

    const getRowId = (row) => row.field;

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            getRowId={getRowId}
            slots={{
                loadingOverlay: Loading,
            }}
            slotProps={{
                loadingOverlay: { loadingMessage },
            }}

            rowCount={rowCountState}
            loading={loading}

            className={classes.customStyles}
        />
    )
}

export default PatientDetails