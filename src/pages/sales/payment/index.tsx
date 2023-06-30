"use client";

import PageHeader from "@/components/utils/page-header";
import { formatDatetime } from "@/core/util/date-format";
import { PermIdentity } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  TextField,
} from "@mui/material";
import axios from "axios";
import { spawn } from "child_process";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const route = useRouter();

  const getOrderDetail = (orderId) => {
    setLoading((prevState) => ({ ...prevState, detail: true }));
    axios
      .get("/api/v1/order/searchOrder", {
        params: {
          id: orderId,
        },
      })
      .then((response) => {
        setOrderDetail(response.data);
      })
      .catch(() => alert("مشکل در ارتباط با سرور"))
      .finally(() =>
        setLoading((prevState) => ({ ...prevState, detail: false }))
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
    getOrderDetail(route.query.orderId);
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        {!loading.detail && orderDetail && (
          <Box
            className="w-full xl:w-7/12 mx-auto text-center"
            sx={{ bgcolor: "white", borderRadius: "1rem", padding: "2rem" }}
          >
            <PageHeader title="ثبت فروش" />

            <Divider className="mt-5 mb-5">
              <Chip color="primary" label="مشخصات مجوز" className="font-bold" />
            </Divider>

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
                    {orderDetail.driver.firstName} {orderDetail.driver.lastName}
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
                        {orderDetail.driver.pelak.p1 || "-"}
                      </p>

                      <p className="mx-2">
                        {orderDetail.driver.pelak.p2 || "-"}
                      </p>

                      <p className="mx-2">
                        {orderDetail.driver.pelak.p3 || "-"}
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
                  <p className="text-md font-bold">
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
                  <p className="text-md font-bold">
                    {orderDetail.product.price} ریال
                  </p>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon className="flex justify-center mx-auto">
                    <PermIdentity />
                  </ListItemIcon>
                  <ListItemText>
                    <small>هزینه بارگیری</small>
                  </ListItemText>
                  <p className="text-md font-bold">
                    {orderDetail.product.loadPrice} ریال
                  </p>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon className="flex justify-center mx-auto">
                    <PermIdentity />
                  </ListItemIcon>
                  <ListItemText>
                    <small>وزن خالی ماشین</small>
                  </ListItemText>
                  <p className="text-md">{orderDetail.emptyWeight}کیلوگرم</p>
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
                <div className="my-2">
                  <div className="flex justify-between items-center mb-3">
                    <small className="ml-2">مقدار سفارش</small>
                    {form.cardLoadedWeight &&
                      form.cardLoadedWeight > orderDetail.emptyWeight ? (
                        <p className="text-lg font-extrabold">
                          {Math.floor(
                            +form.cardLoadedWeight - orderDetail.emptyWeight
                          )}
                        </p>
                      ) :
                      <span className="text-red-800">وزن پر ماشین وارد شود</span>}
                  </div>
                  <div className="flex justify-between items-center">
                    <small className="ml-2">قیمت کالا</small>
                    <p className="text-lg font-bold">50,750,820 ریال</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <small className="ml-2">هزینه بارگیری</small>
                    <p className="text-lg font-bold text-blue-700">
                      12,750,820 ریال
                    </p>
                  </div>
                  <Divider className="my-1" />
                  <div className="flex justify-between items-center">
                    <small className="ml-2">قیمت کل</small>
                    <p className="text-lg font-extrabold text-green-700">
                      52,750,820 ریال
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full mb-8 bg-green-600 font-extrabold rounded-lg py-5"
                  variant="contained"
                  size="large"
                >
                  ثبت فروش
                </Button>
              </div>
            </Box>
          </Box>
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
        {!loading.detail && orderDetail && !orderDetail.id && (
          <Alert className="w-full mt-3" severity="warning">
            سفارش مورد نظر یافت نشد. از لیست سفارشات جاری دوباره اقدام کنید
          </Alert>
        )}
      </Container>
    </>
  );
}

interface IVehicleType {
  id: number;
  label: string;
  capacity: string;
}

interface IBreakType {
  id: number;
  label: string;
}

const vehiclesList: readonly IVehicleType[] = [
  { id: 1, label: "تک", capacity: "تا ۱۰ تن" },
  { id: 2, label: "جفت", capacity: "تا ۱۵ تن" },
  { id: 3, label: "تریلی کفی", capacity: "۲۴ تن" },
  { id: 4, label: "تریلی بغدار", capacity: "۲۴ تن" },
  { id: 5, label: "تریلی ترانزیت", capacity: "۲۴ تن" },
  { id: 6, label: "خاور چوبی (۶۰۸)", capacity: "۳و نیم تن" },
  { id: 7, label: "خاور چوبی (۸۰۸)", capacity: "تا ۵ تن" },
  { id: 8, label: "خاور مسقف", capacity: "تا ۳ تن" },
  { id: 9, label: "خاور بغل بازشو", capacity: "تا ۳ و نیم تن" },
  { id: 10, label: "خاور ۹۱۱", capacity: "تا ۵ و نیم تن" },
  { id: 11, label: "وانت پراید", capacity: "زیر ۷۰۰ کیلو" },
  { id: 12, label: "وانت پیکان", capacity: "۴۰۰ تا ۷۰۰ کیلو" },
  { id: 13, label: "وانت مزدا", capacity: "۷۵۰ کیلو" },
  { id: 14, label: "وانت نیسان", capacity: "۱۵۰۰ تا ۲۰۰۰ کیلو" },
];
const breakTypeList: readonly IBreakType[] = [
  { id: 1, label: "آجر فشاری" },
  { id: 2, label: "آجر سفال" },
  { id: 4, label: "آجر ضایعات" },
  { id: 3, label: "ماسه" },
];
