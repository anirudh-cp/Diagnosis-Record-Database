import * as React from 'react';
import { Container, Tooltip, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import EditToolbar from '../components/dashboard/EditToolbar';
import Loading from '../components/common/Loading';

import usePatient from '../utils/Patient';
import useIdentStore from '../storages/IdentStore';

import { useNavigate } from 'react-router-dom';


export default function FullFeaturedCrudGrid() {

    const navigate = useNavigate();

    const [rows, setRows] = React.useState([]);

    const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 10 });
    const [rowCountState, setRowCountState] = React.useState(0);
    const [updateKey, setUpdateKey] = React.useState(null);
    const [loadingMessage, setLoadingMessage] = React.useState("Loading...")

    const { get, remove, loading } = usePatient();

    const { setHideUserOptions } = useIdentStore();

    React.useEffect(() => {
        const getData = async () => {
            setLoadingMessage("Retriving data...")
            const response = await get(paginationModel?.page ?? 0, paginationModel?.pageSize ?? 10);
            setRows(response?.data?.data ?? []);
            setRowCountState(response?.data?.meta?.count ?? 0);
        }
        getData();
    }, [paginationModel, updateKey])

    React.useEffect(() => {
        setHideUserOptions(false);
    }, [setHideUserOptions])

    const getRowId = (row) => row.uuid;

    const handleDeleteClick = (uuid) => async () => {
        // DELETE OPERATION

        const option = window.confirm("Are you sure you want to delete this record?")

        if (option === false)
            return false;

        setLoadingMessage("Deleting Record...")
        const response = await remove(uuid);
        alert(`DELETE ${uuid}. STATUS: ${response.code}`)

        setUpdateKey(new Date());
    };

    const handleReportClick = (uuid) => async () => { }

    const handleCopyClick = (uuid) => async () => {
        try {
            let row = rows.filter((row) => row.uuid === uuid)[0]
            await navigator.clipboard.writeText(`${row?.name} - ${uuid}`);
            console.log(rows)
            alert('Row ID copied')
        } catch (err) {
            alert('Error in copying row ID');
        }
    }

    const handleRowDoubleClick = (params) => {
        navigate('/history', { state: { rowID: params.row.uuid } });
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            disableColumnMenu: true,
        },
        {
            field: 'latest_visit',
            headerName: 'Latest Vist',
            width: 200,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            disableColumnMenu: true,
            valueFormatter: (params) => {
                const utcDate = new Date(params.value);
                return utcDate.toLocaleString();
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <Tooltip title={'Generate Report'}>
                        <GridActionsCellItem
                            icon={<AssessmentIcon />}
                            label="Generate Report"
                            className="textPrimary"
                            onClick={handleReportClick(id)}
                            color="inherit"
                        />
                    </Tooltip>,
                    <Tooltip title={'Delete record'}>
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />
                    </Tooltip>,
                    <Tooltip title={'Copy row ID'}>
                        <GridActionsCellItem
                            icon={<ContentCopyIcon />}
                            label="Copy row ID"
                            onClick={handleCopyClick(id)}
                            color="inherit"
                        />
                    </Tooltip>,
                ];
            },
        },
    ];

    return (
        <Container
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >

            <Typography variant='h4' sx={{ mt: 3, mb: 4 }}>
                Patients
            </Typography>

            <DataGrid
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 25, page: 0 },
                    },
                }}
                rows={rows}
                columns={columns}
                editMode="row"
                getRowId={getRowId}
                slots={{
                    toolbar: EditToolbar,
                    loadingOverlay: Loading,
                }}
                slotProps={{
                    toolbar: { },
                    loadingOverlay: { loadingMessage },
                }}
                onRowDoubleClick={handleRowDoubleClick}

                rowCount={rowCountState}
                loading={loading}
                pageSizeOptions={[5, 10, 20]}
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel}
            />
        </Container>
    );
}
