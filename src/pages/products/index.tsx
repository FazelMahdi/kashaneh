import AddProductDialog from '@/components/product/add-product-dialog';
import PageHeader from '@/components/utils/page-header';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Box, Button, Container, IconButton, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const rows = [];

export default function InprogressSalesList() {
    const [addProductDialog, setAddProductDialog] = useState<Boolean>(false)


    return (
        <Container maxWidth={false}>
            <Box className="w-full lg:w-9/12 mx-auto text-center" sx={{ bgcolor: 'white', borderRadius: '1rem', padding: '2rem' }}>
                <PageHeader title="لیست محصولات" />
                <div className='text-right'>
                    <Button variant="contained" className="bg-green-200 mt-2" size="small" onClick={() => setAddProductDialog(true)}>
                        افزودن محصول جدید
                    </Button>
                </div>
                {rows && rows.length ? (
                    <TableContainer component={Box}>
                        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>نام محصول</TableCell>
                                    <TableCell align="right">قیمت واحد</TableCell>
                                    <TableCell align="right">قیمت با احتساب تخفیف</TableCell>
                                    <TableCell align="right">قیمت بارگیری</TableCell>
                                    <TableCell align="right">درصد تخفیف</TableCell>
                                    <TableCell align="right">تاریخ ثبت</TableCell>
                                    <TableCell align="right" />
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
                                        <TableCell align="right">{row.orderWeight}</TableCell>
                                        <TableCell align="left">
                                            <div className='flex justify-end items-center'>
                                                <IconButton aria-label="delete">
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
                )
                    :
                    (
                        <Alert className='w-full mt-3' severity="warning">محصولی یافت نشد</Alert>
                    )
                }
            </Box>
            {addProductDialog && <AddProductDialog show={addProductDialog} onClose={() => setAddProductDialog(false)} />}
        </Container>

    );
}