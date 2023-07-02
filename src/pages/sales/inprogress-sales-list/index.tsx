import SaleCheckoutDialog from "@/components/sales/sale-checkout";
import PageHeader from "@/components/utils/page-header";
import http from '@/core/http/axios';
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
  Container,
  IconButton,
  Skeleton,
  styled,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
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

export default function InprogressSalesList() {
  const [orders, setOrders] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [saleCheckouttDialog, setSaleCheckouttDialog] =
    useState<Boolean>(false);

  const getOrders = () => {
    setLoading(true);
    http
      .get("/api/v1/order/search", { params: { state: 1 } })
      .then(async (response: any) => {
        await setOrders(response);
      })
      .catch(() => alert("مشکل در ارتباط با سرور"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container maxWidth={false}>
      <Box sx={{ bgcolor: "white", borderRadius: "1rem", padding: "2rem" }}>
        <PageHeader title="لیست سفارشات جاری" />
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
                      {order.emptyWeight}
                    </TableCell>
                    <TableCell align="right">
                      {order.needsOfAmount}
                    </TableCell>
                    <TableCell align="left">
                      <div className="flex justify-end items-center">
                        <Link
                          href={{
                            pathname: "/sales/payment",
                            query: { orderId: order.id },
                          }}
                          shallow={true}
                          className="rounded-full px-3 py-1 bg-green-600 font-extrabold text-white"
                        >
                          بارگیری
                        </Link>
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
