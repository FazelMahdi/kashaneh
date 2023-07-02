"use client";

import AddDriverDialog from "@/components/driver/add-driver-dialog";
import PageHeader from "@/components/utils/page-header";
import http from '@/core/http/axios';
import { AccountCircleOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Toastify from "toastify-js";

export default function NewSale() {
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      driverId: "",
      destinationId: "",
      address: "",
      productId: "",
      product: {},
      driver: {},
      workerGroup: {},
      destination: {},
      workerGroupId: "",
      emptyWeight: undefined,
      needsOfAmount: undefined,
      amount: 0,
      preOrder: 0,
    },
  });

  // const [calcWeightDialog, setCalcWeightDialog] = useState<Boolean>(false)
  const [showAddDriverDialog, setShowAddDriverDialog] =
    useState<Boolean>(false);
  const [driver, setDriver] = useState<any>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [prms, setPrms] = useState<any>({
    destinations: null,
    products: null,
    workerGroup: null,
  });
  const [loading, setLoading] = useState<any>({
    driver: false,
    order: false,
    prms: false,
    save: false,
  });

  const checkDriver = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      setLoading((prevState) => ({ ...prevState, driver: true }));
      http
        .get("/api/v1/driver/searchDriver", {
          params: {
            keyword,
          },
        })
        .then((response) => {
          response ? setDriver(response)
            : setShowAddDriverDialog(true);
        })
        .finally(() =>
          setLoading((prevState) => ({ ...prevState, driver: false }))
        );
    }
  };

  const getPrms = () => {
    setLoading((prevState) => ({ ...prevState, order: true }));
    Promise.all([
      http.get("/api/v1/destination/search"),
      http.get("/api/v1/product/search"),
      http.get("/api/v1/workerGroup/search"),
    ])
      .then((result) => {
        setPrms({
          destinations: result[0],
          products: result[1],
          workerGroup: result[2],
        });
      })
      .finally(() =>
        setLoading((prevState) => ({ ...prevState, order: false }))
      );
  };

  const onSubmit = (data) => {
    setLoading((prevState) => ({ ...prevState, save: true }));

    const {
      productId,
      emptyWeight,
      needsOfAmount,
      workerGroupId,
      destinationId,
      driverId,
      ...rest
    } = data;

    const payload = {
      ...rest,
      product: prms.products.find((x) => x.id == productId),
      workerGroup: prms.workerGroup.find((x) => x.id == workerGroupId),
      destination: prms.destinations.find((x) => x.id == destinationId),
      driver,
      emptyWeight: +emptyWeight,
      needsOfAmount: +needsOfAmount,
    };
    http
      .post("/api/v1/order/create", payload)
      .then(() => {
        Toastify({
          text: "مجوز با موفقیت صادر شد.",
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
      .catch(() => alert("مشکل در ارتباط با سرور"))
      .finally(() =>
        setLoading((prevState) => ({ ...prevState, driver: false }))
      );
  };

  useEffect(() => {
    getPrms();
  }, []);

  return (
    <>
      <Container>
        <Box
          className="w-full xl:w-7/12 mx-auto text-center"
          sx={{ bgcolor: "white", borderRadius: "1rem", padding: "2rem" }}
          component="div"
        >
          <PageHeader title="ثبت فروش جدید (صدور مجوز)" />

          <Divider className="mt-5 mb-5">
            <Chip
              color="primary"
              label="اطلاعات خریدار"
              className="font-bold"
            />
          </Divider>
          <form className="flex justify-start items-center">
            <TextField
              label="شماره همراه / شماره پلاک"
              name="keyword"
              className="w-full ltr ml-2"
              onChange={(e) => setKeyword(() => e.target.value)}
              value={keyword}
              onKeyDown={(e) => checkDriver(e)}
            />
            <Button
              variant="outlined"
              className="bg-green-50"
              size="small"
              onClick={() => setShowAddDriverDialog(true)}
            >
              افزودن راننده جدید
            </Button>
          </form>
          {driver && !loading.driver && !loading.order && (
            <form>
              <div className="my-2 mx-auto">
                <Paper className=" rounded-lg md:p-3 p-3" elevation={3}>
                  <div className="flex justify-between flex-wrap">
                    <div className="flex justify-start items-center">
                      <Avatar className="bg-green-500">
                        <AccountCircleOutlined />
                      </Avatar>
                      <p className="mr-2 font-bold !text-sm">
                        {driver.firstName} {driver.lastName}
                      </p>
                      {driver.mobile && (
                        <p className="mr-2 font-bold !text-sm !block">
                          {driver.mobile}
                        </p>
                      )}
                    </div>
                    <div className="flex w-21 justify-between border border-solid border-gray-800 rounded-sm overflow-hidden bg-yellow-500">
                      <div className="w-10 border-0 border-l border-solid border-gray-800 text-center my-auto text-lg">
                        <p>{driver.pelak.p4 || "-"}</p>
                      </div>
                      <div className="w-30 flex justify-around items-center text-center text-lg">
                        <p className="mx-2"> {driver.pelak.p3 || "-"}</p>

                        <p className="mx-2"> {driver.pelak.p2 || "-"}</p>

                        <p className="mx-2"> {driver.pelak.p1 || "-"}</p>
                      </div>
                      <div className="w-2 bg-blue-800 ml-0">
                        <div className="mx-auto">
                          <div className="h-1 w-full bg-green-500" />
                          <div className="h-1 bg-white" />
                          <div className="h-1 bg-red-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
              <Divider className="mt-5 mb-5">
                <Chip
                  color="primary"
                  label="سفارش گیری"
                  className="font-bold"
                />
              </Divider>
              <div className="flex flex-col justify-center items-center">
                <Controller
                  name="emptyWeight"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.emptyWeight}
                      label="وزن ماشین (بدون بار)"
                      className="w-full mb-5"
                      placeholder="کیلوگرم"
                    />
                  )}
                />

                <Controller
                  name="productId"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl
                      className=" mb-5 text-gray-700"
                      fullWidth
                      error={!!errors.productId}
                    >
                      <InputLabel id="productId">نوع محصول</InputLabel>
                      <Select
                        {...field}
                        labelId="productId"
                        error={!!errors.productId}
                        className="text-right"
                        label="نوع محصول"
                      >
                        {prms &&
                          prms.products &&
                          prms.products.map((item, index) => (
                            <MenuItem key={index + "breakkey"} value={item.id}>
                              {item.title}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller
                  name="needsOfAmount"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="مقدار سفارش"
                      error={!!errors.needsOfAmount}
                      placeholder="کیلوگرم"
                      className="mb-5 w-full"
                    />
                  )}
                />
                <Controller
                  name="workerGroupId"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl
                      className="mb-5 text-gray-700"
                      fullWidth
                      error={!!errors.workerGroupId}
                    >
                      <InputLabel id="workerGroupId">گروه بارگیری</InputLabel>
                      <Select
                        {...field}
                        error={!!errors.workerGroupId}
                        labelId="workerGroupId"
                        className="text-right"
                        label="گروه بارگیری"
                      >
                        {prms &&
                          prms.workerGroup.map((item, index) => (
                            <MenuItem key={index + "breakkey"} value={item.id}>
                              {item.title}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
              <Divider className="mt-5 mb-5">
                <Chip color="primary" label="مقصد بار" className="font-bold" />
              </Divider>
              <div className="flex flex-col justify-center items-center">
                <Autocomplete
                  options={prms && prms.destinations}
                  autoHighlight
                  className="w-full"
                  getOptionLabel={(option: any) => option.title}
                  onChange={(_e, value: any) =>
                    setValue("destinationId", value.id)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="مقصد بار"
                      className="mb-5"
                      error={!!errors.destinations}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="آدرس"
                      placeholder="آدرس تحویل سفارش"
                      className="mb-5 w-full"
                    />
                  )}
                />

                <Button
                  className="mb-5 w-full bg-green-600 font-extrabold rounded-lg py-5 text-white"
                  variant="contained"
                  size="large"
                  onClick={handleSubmit(onSubmit)}
                >
                  صدور مجوز بارگیری
                </Button>
              </div>
              {/* {calcWeightDialog && <CalcWeightDialog show={calcWeightDialog} onClose={() => setCalcWeightDialog(false)} onSome={(val) => setForm((prev) => ({ ...prev, carWeightEmpty: val }))} />} */}
            </form>
          )}
          {loading.driver && (
            <div className="mt-5">
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </div>
          )}
        </Box>
        {showAddDriverDialog && (
          <AddDriverDialog
            show={showAddDriverDialog}
            onClose={() => setShowAddDriverDialog(false)}
          />
        )}
      </Container>
    </>
  );
}
