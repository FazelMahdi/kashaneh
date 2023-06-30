import AddDestinationDialog from '@/components/destinations/add-destination-dialog';
import PageHeader from '@/components/utils/page-header';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Box, Button, Container, IconButton, Skeleton, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
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

export default function Destinations() {
    const [addDestinationDialog, setAddDestinationDialog] = useState<Boolean>(false)
    const [destinations, setDestinations] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const getDestinations = () => {
        setLoading(true)
        axios.get('/api/v1/destination/search')
            .then(async (response: any) => {
                await setDestinations(response.data.destinations)
            }).catch(() => alert('مشکل در ارتباط با سرور'))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getDestinations()
    }, [])

    const deleteDest = (group) => {
        setLoading(true)
        axios.delete(`/api/v1/destination/${group.id}`)
            .then(() => {
                getDestinations()
            }).catch(() => alert('مشکل در ارتباط با سرور'))
            .finally(() => setLoading(false))
    }
    return (
        <Container maxWidth={false}>
            <Box className="w-full lg:w-10/12 mx-auto text-center" sx={{ bgcolor: 'white', borderRadius: '1rem', padding: '2rem' }}>
                <PageHeader title="لیست مقصد ها" />
                <div className='text-right'>
                    <Button variant="contained" className="bg-green-200 mt-2" size="small" onClick={() => setAddDestinationDialog(true)}>
                        افزودن مقصد جدید
                    </Button>
                </div>
                {destinations && destinations.length > 0 &&
                    <TableContainer component={Box}>
                        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>نام مقصد</TableCell>
                                    <TableCell align="right" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {destinations.map((dest, index) => (
                                    <StyledTableRow
                                        key={index}
                                    >
                                        <TableCell component="th" scope="row">
                                            {dest.title}
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className='flex justify-end items-center'>
                                                <IconButton aria-label="حدف مقصد" disabled={loading} onClick={() => deleteDest(dest)}>
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
                {!loading && destinations && !destinations.length &&
                    <Alert className='w-full mt-3' severity="warning">مقصدی یافت نشد</Alert>
                }
                {loading &&
                    <Box className="mt-5" >
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
                }
            </Box>
            {addDestinationDialog && <AddDestinationDialog show={addDestinationDialog} onClose={() => setAddDestinationDialog(false)} />}
        </Container>

    );
}