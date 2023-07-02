import AddProductDialog from '@/components/product/add-product-dialog';
import PageHeader from '@/components/utils/page-header';
import http from '@/core/http/axios';
import { formatDatetime } from '@/core/util/date-format';
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

export default function Products() {
    const [addProductDialog, setAddProductDialog] = useState<Boolean>(false)
    const [products, setProducts] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const getProducts = () => {
        setLoading(true)
        http.get('/api/v1/product/search')
            .then(async (response: any) => {
                await setProducts(response)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getProducts()
    }, [])

    const deleteProduct = (prod) => {
        setLoading(true)
        http.delete(`/api/v1/product/${prod.id}`)
            .then(() => {
                getProducts()
            })
            .finally(() => setLoading(false))
    }


    return (
        <Container maxWidth={false}>
            <Box className="w-full lg:w-10/12 mx-auto text-center" sx={{ bgcolor: 'white', borderRadius: '1rem', padding: '2rem' }}>
                <PageHeader title="لیست محصولات" />
                <div className='text-right'>
                    <Button variant="contained" className="bg-green-200 mt-2" size="small" onClick={() => setAddProductDialog(true)}>
                        افزودن محصول جدید
                    </Button>
                </div>
                {products && products.length > 0 &&
                    <TableContainer component={Box}>
                        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>نام محصول</TableCell>
                                    <TableCell align="right">قیمت واحد</TableCell>
                                    <TableCell align="right">قیمت با احتساب تخفیف</TableCell>
                                    <TableCell align="right">قیمت بارگیری</TableCell>
                                    <TableCell align="center">درصد تخفیف</TableCell>
                                    <TableCell align="left">تاریخ ثبت</TableCell>
                                    <TableCell align="right" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product, index) => (
                                    <StyledTableRow
                                        key={index}
                                    >
                                        <TableCell component="th" scope="row">
                                            {product.title}
                                        </TableCell>
                                        <TableCell align="right">{product.price}</TableCell>
                                        <TableCell align="right">{product.finalPrice}</TableCell>
                                        <TableCell align="right">{product.loadPrice}</TableCell>
                                        <TableCell align="center">-</TableCell>
                                        <TableCell align="left">{formatDatetime(product.createdAt)}</TableCell>
                                        <TableCell align="left">
                                            <div className='flex justify-end items-center'>
                                                <IconButton aria-label="حدف محصول" disabled={loading} onClick={() => deleteProduct(product)}>
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
                {!loading && products && !products.length &&
                    <Alert className='w-full mt-3' severity="warning">محصولی یافت نشد</Alert>
                }
                {loading &&
                    <Box className="mt-5" >
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
                }
            </Box>
            {addProductDialog && <AddProductDialog show={addProductDialog} onClose={() => setAddProductDialog(false)} onUpdate={() => getProducts()} />}
        </Container>

    );
}