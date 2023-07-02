import PageHeader from '@/components/utils/page-header';
import AddWorkerDialog from '@/components/workerGroups/add-workergroup-dialog';
import http from '@/core/http/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Box, Button, Container, IconButton, Skeleton, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function WorkerGroups() {
    const [addWorkerDialog, setAddWorkertDialog] = useState<Boolean>(false)
    const [workers, setWorkers] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const getWorkers = () => {
        setLoading(true)
        http.get('/api/v1/workerGroup/search')
            .then(async (response: any) => {
                await setWorkers(response)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getWorkers()
    }, [])

    const deleteWorker = (group) => {
        setLoading(true)
        http.delete(`/api/v1/workerGroup/${group.id}`)
            .then(() => {
                getWorkers()
            })
            .finally(() => setLoading(false))
    }


    return (
        <Container maxWidth={false}>
            <Box className="w-full lg:w-10/12 mx-auto text-center" sx={{ bgcolor: 'white', borderRadius: '1rem', padding: '2rem' }}>
                <PageHeader title="لیست گروه های بارگیری" />
                <div className='text-right'>
                    <Button variant="contained" className="bg-green-200 mt-2" size="small" onClick={() => setAddWorkertDialog(true)}>
                        افزودن گروه جدید
                    </Button>
                </div>
                {workers && workers.length > 0 &&
                    <TableContainer component={Box}>
                        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>نام گروه</TableCell>
                                    <TableCell align="right" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {workers.map((worker, index) => (
                                    <StyledTableRow
                                        key={index}
                                    >
                                        <TableCell component="th" scope="row">
                                            {worker.title}
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className='flex justify-end items-center'>
                                                <IconButton aria-label="حدف کروه" disabled={loading} onClick={() => deleteWorker(worker)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </StyledTableRow>
                                ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
                {!loading && workers && !workers.length &&
                    <Alert className='w-full mt-3' severity="warning">گروهی یافت نشد</Alert>
                }
                {loading &&
                    <Box className="mt-5" >
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
                }
            </Box>
            {addWorkerDialog && <AddWorkerDialog show={addWorkerDialog} onClose={() => setAddWorkertDialog(false)} />}
        </Container>

    );
}