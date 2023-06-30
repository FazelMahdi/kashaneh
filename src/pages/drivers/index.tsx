import AddDriverDialog from '@/components/driver/add-driver-dialog';
import PageHeader from '@/components/utils/page-header';
import { formatDatetime } from '@/core/util/date-format';
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

export default function Drivers() {
    const [addDriverDialog, setAddDrivertDialog] = useState<Boolean>(false)
    const [drivers, setDrivers] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const getDrivers = () => {
        setLoading(true)
        axios.get('/api/v1/driver/search')
            .then(async (response: any) => {
                await setDrivers(response.data.drivers)
            }).catch(() => alert('مشکل در ارتباط با سرور'))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getDrivers()
    }, [])

    const deleteDriver = (driver) => {
        setLoading(true)
        axios.delete(`/api/v1/driver/${driver.id}`)
            .then(() => {
                getDrivers()
            }).catch(() => alert('مشکل در ارتباط با سرور'))
            .finally(() => setLoading(false))
    }


    return (
        <Container maxWidth={false}>
            <Box className="w-full lg:w-11/12 mx-auto text-center" sx={{ bgcolor: 'white', borderRadius: '1rem', padding: '2rem' }}>
                <PageHeader title="لیست رانندگان" />
                <div className='text-right'>
                    <Button variant="contained" className="bg-green-200 mt-2" size="small" onClick={() => setAddDrivertDialog(true)}>
                        افزودن راننده جدید
                    </Button>
                </div>
                {drivers && drivers.length > 0 &&
                    <TableContainer component={Box}>
                        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>نام</TableCell>
                                    <TableCell>نام خانوادگی</TableCell>
                                    <TableCell>شماره همراه</TableCell>
                                    <TableCell>شماره پلاک</TableCell>
                                    <TableCell>زمان ثبت نام</TableCell>
                                    <TableCell align="right" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {drivers.map((driver, index) => (
                                    <StyledTableRow
                                        key={index}
                                    >
                                        <TableCell component="th" scope="row">
                                            {driver.firstName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {driver.lastName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {driver.mobile}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {formatDatetime(driver.createdAt)}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {driver.fullPelak}
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className='flex justify-end items-center'>
                                                <IconButton aria-label="حدف راننده" disabled={loading} onClick={() => deleteDriver(driver)}>
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
                {!loading && drivers && !drivers.length &&
                    <Alert className='w-full mt-3' severity="warning">راننده‌ای یافت نشد</Alert>
                }
                {loading &&
                    <Box className="mt-5" >
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
                }
            </Box>
            {addDriverDialog && <AddDriverDialog show={addDriverDialog} onClose={() => setAddDrivertDialog(false)} />}
        </Container>

    );
}