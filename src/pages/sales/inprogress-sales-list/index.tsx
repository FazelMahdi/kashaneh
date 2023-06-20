'use client'

import SaleCheckoutDialog from '@/components/sales/sale-checkout';
import PageHeader from '@/components/utils/page-header';
import { FireTruckOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Container, IconButton, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';

function createData(
    name: string,
    phoneNumber: string,
    carNO: string,
    carWeightEmpty: number | null,
    orderWeight: number | null
) {
    return { name, phoneNumber, carNO, carWeightEmpty, orderWeight };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const rows = [
    createData('مهدی فاضلی', '09031003088', '25 ع 158', 2400, 10000),
    createData('محمد فاضلی', '09031003088', '25 ع 158', 2400, 10000),
    createData('مهدی حسنی', '09031003088', '25 ع 158', 2400, 10000),

];

export default function InprogressSalesList() {
    const [saleCheckouttDialog, setSaleCheckouttDialog] = useState<Boolean>(false)
    
    return (
        <Container maxWidth={false}>
            <Box sx={{ bgcolor: 'white', borderRadius: '1rem', padding: '2rem' }}>
                <PageHeader title="لیست سفارشات جاری" />
                <TableContainer component={Box}>
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>نام خریدار</TableCell>
                                <TableCell align="right">شماره همراه</TableCell>
                                <TableCell align="right">شماره پلاک</TableCell>
                                <TableCell align="right">وزن خالی ماشین</TableCell>
                                <TableCell align="right">مقدار بار درخواستی</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow
                                    key={index}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.phoneNumber}</TableCell>
                                    <TableCell align="right">{row.carNO}</TableCell>
                                    <TableCell align="right">{row.carWeightEmpty}</TableCell>
                                    <TableCell align="right">{row.orderWeight}</TableCell>
                                    <TableCell align="left">
                                        <div className='flex justify-end items-center'>
                                            <Button className='rounded-full bg-green-600 font-extrabold text-white' variant="contained" onClick={() => setSaleCheckouttDialog(true)} endIcon={<FireTruckOutlined />}>
                                                بارگیری
                                            </Button>
                                            <IconButton aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>

                                        </div>
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {saleCheckouttDialog && <SaleCheckoutDialog show={saleCheckouttDialog} onClose={() => setSaleCheckouttDialog(false)} />}
        </Container>

    );
}