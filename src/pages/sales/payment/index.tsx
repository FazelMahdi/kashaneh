"use client";

import PrintOrderDialog from "@/components/sales/print-order-dialog";
import PageHeader from "@/components/utils/page-header";
import http from "@/core/http/axios";
import { formatDatetime } from "@/core/util/date-format";
import { numeral } from "@/core/util/number";
import { PermIdentity } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";

interface INewSale {
  phoneNumber: string;
  name: string;
  family: string;
  carNO: string;
  carWeightEmpty: number | undefined;
  cardLoadedWeight: number | undefined;
  productType: number | null;
}

export default function NewSale() {
  const [form, setForm] = useState<INewSale>({
    phoneNumber: "09122132389",
    name: "",
    family: "",
    carNO: "",
    carWeightEmpty: undefined,
    cardLoadedWeight: undefined,
    productType: 1,
  });

  const [orderDetail, setOrderDetail] = useState<any>(null);

  const [loading, setLoading] = useState<any>({
    save: false,
    detail: false,
  });
  const router = useRouter();

  const getOrderDetail = (orderId) => {
    setLoading((prevState) => ({ ...prevState, detail: true }));
    http
      .get("/api/v1/order/searchOrder", {
        params: {
          id: orderId,
        },
      })
      .then((response) => {
        setOrderDetail(response);
      })
      .catch(() => alert("مشکل در ارتباط با سرور"))
      .finally(() =>
        setLoading((prevState) => ({ ...prevState, detail: false }))
      );
  };
  const onSaveOrder = () => {
    setLoading((prevState) => ({ ...prevState, save: true }));
    const orderAmount = Math.floor(
      +form.cardLoadedWeight - orderDetail.emptyWeight
    );
    const payload = {
      amount: orderAmount,
    };
    http
      .put(`/api/v1/order/${orderDetail.id}/update`, payload)
      .then(() => {
        Toastify({
          text: "فروش با موفقیت ثبت شد.",
          className: "font-extrabold text-lg",
          duration: 3000,
          newWindow: true,
          gravity: "bottom", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "green",
            borderRadius: "1rem",
            padding: "1rem",
          },
        }).showToast();
        router.push("/sales/inprogress-sales-list");
      })
      .finally(() =>
        setLoading((prevState) => ({ ...prevState, save: false }))
      );
  };

  const totalPrice = () => {
    const orderAmount = Math.floor(
      +form.cardLoadedWeight - orderDetail.emptyWeight
    );
    return orderAmount * orderDetail.product.price;
  };
  const totalDiscount = () => {
    const orderAmount = Math.floor(
      +form.cardLoadedWeight - orderDetail.emptyWeight
    );
    return totalPrice() - orderAmount * orderDetail.product.finalPrice;
  };
  const totalLoadPrice = () => {
    const orderAmount = Math.floor(
      +form.cardLoadedWeight - orderDetail.emptyWeight
    );
    return orderAmount * orderDetail.product.loadPrice || 0;
  };

  const totalFinalPrice = () => {
    const orderAmount = Math.floor(
      +form.cardLoadedWeight - orderDetail.emptyWeight
    );
    return orderAmount * orderDetail.product.finalPrice + totalLoadPrice();
  };

  const canSave = () => {
    return (
      form.cardLoadedWeight && form.cardLoadedWeight > orderDetail.emptyWeight
    );
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };

  useEffect(() => {
    getOrderDetail(router.query.orderId);
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Box
          className="w-full xl:w-7/12 mx-auto text-center"
          sx={{ bgcolor: "white", borderRadius: "1rem", padding: "2rem" }}
        >
          <PageHeader title="ثبت فروش" />

          <Divider className="mt-5 mb-5">
            <Chip color="primary" label="مشخصات مجوز" className="font-bold" />
          </Divider>
          {!loading.detail && orderDetail && (
            <div>
              <Box
                sx={{ marginY: "2rem", marginX: "auto" }}
                component="form"
                autoComplete="off"
              >
                <List
                  className="bg-gray-50 rounded-lg w-full"
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton>
                    <ListItemIcon className="flex justify-center mx-auto">
                      <PermIdentity />
                    </ListItemIcon>
                    <ListItemText>
                      <small>خریدار</small>
                    </ListItemText>
                    <p className="text-lg font-bold">
                      {orderDetail.driver.firstName}{" "}
                      {orderDetail.driver.lastName}
                    </p>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon className="flex justify-center mx-auto">
                      <PermIdentity />
                    </ListItemIcon>
                    <ListItemText>
                      <small>شماره پلاک</small>
                    </ListItemText>
                    <div className="flex w-21 justify-between border border-solid border-gray-800 rounded-sm overflow-hidden bg-yellow-500">
                      <div className="w-10 border-0 border-l border-solid border-gray-800 text-center my-auto text-lg">
                        <p>{orderDetail.driver.pelak.p4 || "-"}</p>
                      </div>
                      <div className="w-30 flex justify-around items-center text-center text-lg">
                        <p className="mx-2">
                          {orderDetail.driver.pelak.p3 || "-"}
                        </p>

                        <p className="mx-2">
                          {orderDetail.driver.pelak.p2 || "-"}
                        </p>

                        <p className="mx-2">
                          {orderDetail.driver.pelak.p1 || "-"}
                        </p>
                      </div>
                      <div className="w-2 bg-blue-800 ml-0">
                        <div className="mx-auto">
                          <div className="h-1 w-full bg-green-500" />
                          <div className="h-1 bg-white" />
                          <div className="h-1 bg-red-500" />
                        </div>
                      </div>
                    </div>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon className="flex justify-center mx-auto">
                      <PermIdentity />
                    </ListItemIcon>
                    <ListItemText>
                      <small>محصول</small>
                    </ListItemText>
                    <p className="text-md">{orderDetail.product.title}</p>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon className="flex justify-center mx-auto">
                      <PermIdentity />
                    </ListItemIcon>
                    <ListItemText>
                      <small>تاریخ مجوز</small>
                    </ListItemText>
                    <p className="text-md">
                      {formatDatetime(orderDetail.createdAt)}
                    </p>
                  </ListItemButton>
                </List>
              </Box>
              <Box
                sx={{ marginY: "2rem", marginX: "auto" }}
                component="form"
                autoComplete="off"
              >
                <List
                  className="bg-gray-50 rounded-lg w-full"
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton>
                    <ListItemIcon className="flex justify-center mx-auto">
                      <PermIdentity />
                    </ListItemIcon>
                    <ListItemText>
                      <small> گروه بارگیری</small>
                    </ListItemText>
                    <p className="text-lg font-bold">
                      {orderDetail.workerGroup.title}
                    </p>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon className="flex justify-center mx-auto">
                      <PermIdentity />
                    </ListItemIcon>
                    <ListItemText>
                      <small>قیمت پایه</small>
                    </ListItemText>
                    <p className="text-lg font-bold">
                      {numeral(orderDetail.product.price)} <small>ریال</small>
                    </p>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon className="flex justify-center mx-auto">
                      <PermIdentity />
                    </ListItemIcon>
                    <ListItemText>
                      <small>هزینه بارگیری</small>
                    </ListItemText>
                    <p className="text-lg font-bold">
                      {numeral(orderDetail.product.loadPrice)}{" "}
                      <small>ریال</small>
                    </p>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon className="flex justify-center mx-auto">
                      <PermIdentity />
                    </ListItemIcon>
                    <ListItemText>
                      <small>وزن خالی ماشین</small>
                    </ListItemText>
                    <p className="text-lg">
                      {numeral(orderDetail.emptyWeight)} <small>کیلوگرم</small>
                    </p>
                  </ListItemButton>
                </List>

                <div className="text-left mt-3 md:w-6/12 mr-auto">
                  <div className="mt-3">
                    <TextField
                      label="وزن ماشین در حالت بارگیری شده"
                      placeholder="به کیلوگرم وارد شود"
                      className="w-full my-2 ltr"
                      name="cardLoadedWeight"
                      onChange={(e) => handleChange(e)}
                      value={form.cardLoadedWeight}
                    />
                  </div>
                  {canSave() ? (
                    <div className="my-2">
                      <div className="flex flex-col justify-between items-center mb-4">
                        <div className="flex justify-between items-center w-full">
                          <small className="ml-2">مقدار سفارش</small>
                          <p>
                            <span className="text-lg font-extrabold ml-2">
                              {numeral(
                                Math.floor(
                                  +form.cardLoadedWeight -
                                    orderDetail.emptyWeight
                                )
                              )}
                            </span>
                            <small>کیلوگرم</small>
                          </p>
                        </div>

                        <div className="flex justify-between items-center w-full my-2">
                          <small className="ml-2">قیمت کالا</small>
                          <p>
                            <span className="text-lg font-bold">
                              {numeral(totalPrice())}
                            </span>{" "}
                            <small>ریال</small>
                          </p>
                        </div>

                        <div className="flex justify-between items-center w-full mb-2">
                          <small className="ml-2">تخفیف اعمال شده</small>
                          <p>
                            <span className="text-lg font-bold text-red-600">
                              {numeral(totalDiscount())}
                            </span>{" "}
                            <small>ریال</small>
                          </p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <small className="ml-2">هزینه بارگیری</small>
                          <p>
                            <span className="text-lg font-bold text-blue-700">
                              {numeral(totalLoadPrice())}
                            </span>{" "}
                            <small>ریال</small>
                          </p>
                        </div>
                        <Divider className="my-2 w-full" />
                        <div className="flex justify-between items-center w-full">
                          <small className="ml-2">قیمت کل</small>
                          <p>
                            <span className="text-2xl font-extrabold text-green-700">
                              {numeral(totalFinalPrice())}
                            </span>{" "}
                            <small>ریال</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-red-800">وزن پر ماشین وارد شود</span>
                  )}

                  <Button
                    className="w-full mb-8 bg-green-600 font-extrabold rounded-lg py-5 text-white"
                    variant="contained"
                    size="large"
                    disabled={!canSave() || loading.save}
                    onClick={() => onSaveOrder()}
                  >
                    ثبت فروش
                    {/* {
                      loading.save ?
                        (<span>
                          در حال ذخیره فروش
                        </span>)
                        :
                        (<span>

                          ثبت فروش
                        </span>)
                    } */}
                  </Button>
                </div>
              </Box>
            </div>
          )}
          {loading.detail && (
            <Box className="mt-10">
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          )}
          {!loading.detail && !orderDetail && (
            <Alert className="w-full mt-3" severity="warning">
              سفارش مورد نظر یافت نشد. از لیست سفارشات جاری دوباره اقدام کنید
            </Alert>
          )}
        </Box>
        {orderDetail && (
          <PrintOrderDialog
            show={true}
            order={orderDetail}
            totalPrice={totalPrice()}
            totalDiscount={totalDiscount()}
            totalLoadPrice={totalLoadPrice()}
            totalFinalPrice={totalFinalPrice()}
          />
        )}
      </Container>
    </>
  );
}
