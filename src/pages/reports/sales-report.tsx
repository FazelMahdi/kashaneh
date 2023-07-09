'use client'

import SaleCheckoutDialog from "@/components/sales/sale-checkout";
import PageHeader from "@/components/utils/page-header";
import http from '@/core/http/axios';
import { numeral } from "@/core/util/number";
import {
    Alert,
    Box,
    Chip,
    Container,
    Skeleton,
    styled
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function SalesReport() {
    const [orders, setOrders] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [saleCheckouttDialog, setSaleCheckouttDialog] =
        useState<Boolean>(false);


    // const {
    //     control,
    //     formState: { errors },
    //     handleSubmit,
    //     setValue,
    // } = useForm({
    //     defaultValues: {
    //         fromDate: pastDays(31, 'minus'),
    //         toDate: new Date()
    //     },
    // });

    const getOrders = () => {
        setLoading(true);
        http
            .get("/api/v1/order/search", { params: { state: 10 } })
            .then((response: any) => {
                setOrders(response);
            })
            .finally(() => setLoading(false));
    };

    const totalLoadPrice = (order: any) => {
        return (order.amount * order.product.loadPrice || 0)
    }

    const totalFinalPrice = (order) => {
        return (order.amount * order.product.finalPrice) + totalLoadPrice(order)
    }

    const totalPrice = (order) => {
        return order.amount * order.product.price
    }

    const totalDiscount = (order) => {
        return totalPrice(order) - (order.amount * order.product.finalPrice)
    }


    // const onSubmit = (data) => {
    //     setLoading(true);

    //     // const {
    //     //     fromDate,
    //     //     toDate,
    //     // } = data;
    //     http
    //         .post("/api/v1/order/reports/filter", data)
    //         .then((response) => {
    //             setOrders(response);
    //         })
    //         .finally(() => setLoading(false));
    // };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <Container maxWidth={false}>
            <Box sx={{ bgcolor: "white", borderRadius: "1rem", padding: "2rem" }}>
                <PageHeader title="لیست کل سفارشات" />

                {/* 
                <form className="flex justify-start items-center">

                    <Button
                        variant="outlined"
                        className="bg-green-50"
                        size="small"
                        onClick={handleSubmit(onSubmit)}
                    >
                        جستجو
                    </Button>
                </form> */}


                {orders && orders.length > 0 && (
                    <TableContainer component={Box}>
                        <Table
                            stickyHeader
                            sx={{ minWidth: 650 }}
                            aria-label="a dense table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>نام خریدار</TableCell>
                                    <TableCell align="right">شماره همراه</TableCell>
                                    <TableCell align="right">شماره پلاک</TableCell>
                                    <TableCell align="right">وزن خالی ماشین</TableCell>
                                    <TableCell align="right">مقدار بار درخواستی</TableCell>
                                    <TableCell align="right">تخفیف</TableCell>
                                    <TableCell align="right">مبلغ پرداختی</TableCell>
                                    <TableCell align="right">وضعیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order, index) => (
                                    <StyledTableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {order.driver.firstName} {order.driver.lastName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {order.driver.mobile}
                                        </TableCell>
                                        <TableCell align="right">
                                            {order.driver.fullPelak}
                                        </TableCell>
                                        <TableCell align="right">
                                            {numeral(order.emptyWeight)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {numeral(order.needsOfAmount)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {numeral(totalDiscount(order))}
                                            <small> ریال</small>
                                        </TableCell>
                                        <TableCell align="right">
                                            {numeral(totalFinalPrice(order))}
                                            <small> ریال</small>
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                order.isRemove &&
                                                <Chip className="ml-2" label="حذف شد" color="error" size="small" />
                                            }
                                            {
                                                order.state === 1 &&
                                                <Chip label="در حال بارگیری" color="info" size="small" />
                                            }
                                            {
                                                order.state === 10 &&
                                                <Chip label="پرداخت موفق" color="success" size="small" />
                                            }
                                            {
                                                order.state === 0 &&
                                                <Chip label="پیش سفارش" color="warning" size="small" />
                                            }
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {!loading && orders && !orders.length && (
                    <Alert className="w-full mt-3" severity="warning">
                        سفارش جاری وجود ندارد
                    </Alert>
                )}
                {loading && (
                    <Box className="mt-5">
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
                )}
            </Box>
            {saleCheckouttDialog && (
                <SaleCheckoutDialog
                    show={saleCheckouttDialog}
                    onClose={() => setSaleCheckouttDialog(false)}
                />
            )}
        </Container>
    );
}
