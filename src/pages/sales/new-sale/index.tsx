"use client";

import AddDriverDialog from "@/components/driver/add-driver-dialog";
import PageHeader from "@/components/utils/page-header";
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
import axios from "axios";
import { useEffect, useState } from "react";

interface INewSale {
  driverId: string;
  driver: object;
  destinationId: string;
  address: string;
  productId: string;
  product: object;
  workerGroupId: string;
  workerGroup: object;
  destination: object;
  emptyWeight: number | undefined;
  needsOfAmount: number | undefined;
  amount: number | undefined;
  preOrder: number | undefined;
}

export default function NewSale() {
  const [form, setForm] = useState<INewSale>({
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
      axios
        .get("/api/v1/driver/searchDriver", {
          params: {
            keyword,
          },
        })
        .then((response) => {
          setDriver(response.data);
          !response.data && setShowAddDriverDialog(true);
        })
        .catch(() => alert("مشکل در ارتباط با سرور"))
        .finally(() =>
          setLoading((prevState) => ({ ...prevState, driver: false }))
        );
    }
  };

  const getPrms = () => {
    Promise.all([
      axios.get("/api/v1/destination/search"),
      axios.get("/api/v1/product/search"),
      axios.get("/api/v1/workerGroup/search"),
    ]).then((result) => {
      setPrms({
        destinations: result[0].data.destinations,
        products: result[1].data.products,
        workerGroup: result[2].data.groups,
      });
    });
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };

  const onSaveOrder = () => {
    setLoading((prevState) => ({ ...prevState, save: true }));

    const { productId, workerGroupId, destinationId, driverId, ...rest } = form;

    const payload = {
      ...rest,
      product: prms.products.find((x) => x.id == productId),
      workerGroup: prms.workerGroup.find((x) => x.id == workerGroupId),
      destination: prms.destinations.find((x) => x.id == destinationId),
      driver,
      emptyWeight: +form.emptyWeight,
      needsOfAmount: +form.needsOfAmount,
    };
    axios
      .post("/api/v1/order/create", payload)
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
      <Container maxWidth={false}>
        <Box
          className="w-full lg:w-6/12 mx-auto text-center"
          sx={{ bgcolor: "white", borderRadius: "1rem", padding: "2rem" }}
          component="form"
          autoComplete="off"
        >
          <PageHeader title="ثبت فروش جدید (صدور مجوز)" />

          <Divider className="mt-5 mb-5">
            <Chip
              color="primary"
              label="اطلاعات خریدار"
              className="font-bold"
            />
          </Divider>
          <div className="flex justify-start items-center">
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
          </div>
          {driver && !loading.driver && (
            <>
              <Box
                sx={{ marginY: "2rem", marginX: "auto" }}
                component="form"
                autoComplete="off"
              >
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
              </Box>
              <Divider className="mt-5 mb-5">
                <Chip
                  color="primary"
                  label="سفارش گیری"
                  className="font-bold"
                />
              </Divider>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{ marginY: "2rem", marginX: "auto" }}
                component="form"
                autoComplete="off"
              >
                <TextField
                  label="وزن ماشین (بدون بار)"
                  name="emptyWeight"
                  className="w-full mb-5"
                  placeholder="کیلوگرم"
                  onChange={(e) => handleChange(e)}
                  value={form.emptyWeight}
                />
                <FormControl className=" mb-5 text-gray-700" fullWidth>
                  <InputLabel id="productId">نوع محصول</InputLabel>
                  <Select
                    labelId="productId"
                    name="productId"
                    className="text-right"
                    onChange={(e) => handleChange(e)}
                    label="نوع محصول"
                    value={form.productId}
                  >
                    {prms &&
                      prms.products.map((item, index) => (
                        <MenuItem key={index + "breakkey"} value={item.id}>
                          {item.title}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  label="مقدار سفارش"
                  placeholder="کیلوگرم"
                  name="needsOfAmount"
                  className="mb-5 w-full"
                  onChange={(e) => handleChange(e)}
                  value={form.needsOfAmount}
                />
                <FormControl className="mb-5 text-gray-700" fullWidth>
                  <InputLabel id="workerGroupId">گروه بارگیری</InputLabel>
                  <Select
                    labelId="workerGroupId"
                    name="workerGroupId"
                    className="text-right"
                    onChange={(e) => handleChange(e)}
                    label="گروه بارگیری"
                    value={form.workerGroupId}
                  >
                    {prms &&
                      prms.workerGroup.map((item, index) => (
                        <MenuItem key={index + "breakkey"} value={item.id}>
                          {item.title}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Divider className="mt-5 mb-5">
                <Chip color="primary" label="مقصد بار" className="font-bold" />
              </Divider>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{ marginY: "2rem", marginX: "auto" }}
                component="form"
                autoComplete="off"
              >
                <Autocomplete
                  options={prms && prms.destinations}
                  autoHighlight
                  className="w-full"
                  getOptionLabel={(option: any) => option.title}
                  onChange={(_e, value: any) =>
                    setForm({
                      ...form,
                      destinationId: value.id,
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="مقصد بار"
                      className="mb-5"
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
                <TextField
                  label="آدرس"
                  placeholder="آدرس تحویل سفارش"
                  name="address"
                  className="mb-5 w-full"
                  onChange={(e) => handleChange(e)}
                  value={form.address}
                />

                <Button
                  className="mb-5 w-full bg-green-600 font-extrabold rounded-lg py-5"
                  variant="contained"
                  size="large"
                  onClick={() => onSaveOrder()}
                >
                  صدور مجوز بارگیری
                </Button>
              </Box>
              {/* {calcWeightDialog && <CalcWeightDialog show={calcWeightDialog} onClose={() => setCalcWeightDialog(false)} onSome={(val) => setForm((prev) => ({ ...prev, carWeightEmpty: val }))} />} */}
            </>
          )}
          {loading.driver && (
            <Box className="mt-5">
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
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
