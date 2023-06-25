'use client'

import AddDriverDialog from "@/components/driver/add-driver-dialog";
import PageHeader from "@/components/utils/page-header";
import { AccountCircleOutlined } from "@mui/icons-material";
import { Autocomplete, Avatar, Box, Button, Chip, Container, Divider, FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useState } from "react";

interface INewSale {
    phoneNumber: string;
    name: string;
    family: string;
    carNO: string;
    carWeightEmpty: number | undefined;
    orderWeight: number | undefined;
    productType: number | null;

}

export default function NewSale() {

    const [form, setForm] = useState<INewSale>({
        phoneNumber: '',
        name: '',
        family: '',
        carNO: '',
        carWeightEmpty: undefined,
        orderWeight: undefined,
        productType: 1
    })

    // const [calcWeightDialog, setCalcWeightDialog] = useState<Boolean>(false)
    const [showAddDriverDialog, setShowAddDriverDialog] = useState<Boolean>(false)

    const handleChange = (evt) => {
        const value = evt.target.value;
        setForm(
            {
                ...form,
                [evt.target.name]: value
            }
        )
    }

    return (
        <>
            <Container maxWidth={false}>
                <Box className="w-full lg:w-6/12 mx-auto text-center" sx={{ bgcolor: 'white', borderRadius: '1rem', padding: '2rem' }}>
                    <PageHeader title="ثبت فروش جدید (صدور مجوز)" />

                    <Divider className="mt-5 mb-5">
                        <Chip color="primary" label="اطلاعات خریدار" className="font-bold" />
                    </Divider>
                        <div className="flex justify-start items-center">
                            <TextField
                                label="شماره همراه / شماره پلاک"
                                name="phoneNumber"
                                className="w-full ltr ml-2"
                                onChange={(e) => handleChange(e)}
                                value={form.phoneNumber}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                            <Button variant="outlined" className="bg-green-50" size="small" onClick={() => setShowAddDriverDialog(true)}>
                                افزودن راننده جدید
                            </Button>
                        </div>
                    {
                        form.phoneNumber && form.phoneNumber.length === 11 &&
                        (

                            <>
                                <Box sx={{ marginY: '2rem', marginX: 'auto' }} component="form" autoComplete="off">
                                    <Paper className=" rounded-lg md:p-3 p-3" elevation={3}>
                                        <div className="flex justify-between flex-wrap">
                                            <div className="flex justify-start items-center">

                                                <Avatar className="bg-green-500">
                                                    <AccountCircleOutlined />
                                                </Avatar>
                                                <p className="mr-2 font-bold !text-sm"> مهدی فاضلی</p>
                                                <p className="mr-2 font-bold !text-sm !block">09031003088</p>

                                            </div>
                                            <div
                                                className="flex w-21 justify-between border border-solid border-gray-800 rounded-sm overflow-hidden bg-yellow-500"
                                            >
                                                <div className="w-10 border-0 border-l border-solid border-gray-800 text-center my-auto text-lg">
                                                    <p>
                                                        22
                                                    </p>
                                                </div>
                                                <div className="w-30 flex justify-around items-center text-center text-lg">
                                                    <p className="mx-2">12</p>

                                                    <p className="mx-2">ع</p>

                                                    <p className="mx-2">345</p>
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
                                    <Chip color="primary" label="سفارش گیری" className="font-bold" />
                                </Divider>
                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ marginY: '2rem', marginX: 'auto' }} component="form" autoComplete="off">

                                    <TextField
                                        label="وزن ماشین (بدون بار)"
                                        name="carWeightEmpty"
                                        className="w-full mb-5"
                                        onChange={(e) => handleChange(e)}
                                        value={form.carWeightEmpty}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">کیلوگرم <small className="mr-1">(تُن * 1000) </small></InputAdornment>,
                                        }}
                                    />
                                    <FormControl className=" mb-5 text-gray-700" fullWidth>
                                        <InputLabel id="productgroup">نوع محصول</InputLabel>
                                        <Select
                                            labelId="productgroup"
                                            name="productType"
                                            className="text-right"
                                            onChange={(e) => handleChange(e)}
                                            label="نوع محصول"
                                            value={form.productType}

                                        >
                                            {breakTypeList.map((item, index) => (
                                                <MenuItem key={index + 'breakkey'} value={item.id}>{item.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="مقدار سفارش"
                                        placeholder=""
                                        name="orderWeight"
                                        className="mb-5 w-full"
                                        onChange={(e) => handleChange(e)}
                                        value={form.orderWeight}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">کیلوگرم <small className="mr-1">(تُن * 1000) </small></InputAdornment>,
                                        }}
                                    />
                                    <FormControl className="mb-5 text-gray-700" fullWidth>
                                        <InputLabel id="labGroup">گروه بارگیری</InputLabel>
                                        <Select
                                            labelId="labGroup"
                                            name="productType"
                                            className="text-right"
                                            onChange={(e) => handleChange(e)}
                                            label="گروه بارگیری"
                                            value={form.productType}
                                        >
                                            {breakTypeList.map((item, index) => (
                                                <MenuItem key={index + 'breakkey'} value={item.id}>{item.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </Box>
                                <Divider className="mt-5 mb-5">
                                    <Chip color="primary" label="مقصد بار" className="font-bold" />
                                </Divider>
                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ marginY: '2rem', marginX: 'auto' }} component="form" autoComplete="off">
                                    <TextField
                                        label="آدرس"
                                        placeholder=""
                                        name="carNO"
                                        className=" mb-5 w-full"
                                        onChange={(e) => handleChange(e)}
                                        value={form.carNO}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                    <Autocomplete
                                        id="vehicle-select"
                                        options={vehiclesList}
                                        autoHighlight
                                        className="w-full"
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                <div className="flex flex-col">
                                                    <p className="font-bold">{option.label}</p>
                                                    <small>{option.capacity}</small>
                                                </div>
                                                <Divider />
                                            </Box>
                                        )}
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

                                    <Button className="mb-5 w-full bg-green-600 font-extrabold rounded-lg py-5" variant="contained" size="large">
                                        صدور مجوز بارگیری
                                    </Button>
                                </Box>
                                {/* {calcWeightDialog && <CalcWeightDialog show={calcWeightDialog} onClose={() => setCalcWeightDialog(false)} onSome={(val) => setForm((prev) => ({ ...prev, carWeightEmpty: val }))} />} */}
                                {showAddDriverDialog && <AddDriverDialog show={showAddDriverDialog} onClose={() => setShowAddDriverDialog(false)} onSome={(val) => setForm((prev) => ({ ...prev, carWeightEmpty: val }))} />}
                            </>
                        )
                    }
                </Box>
            </Container >

        </>
    )

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
    { id: 1, label: 'تک', capacity: 'تا ۱۰ تن' },
    { id: 2, label: 'جفت', capacity: 'تا ۱۵ تن' },
    { id: 3, label: 'تریلی کفی', capacity: '۲۴ تن' },
    { id: 4, label: 'تریلی بغدار', capacity: '۲۴ تن' },
    { id: 5, label: 'تریلی ترانزیت', capacity: '۲۴ تن' },
    { id: 6, label: 'خاور چوبی (۶۰۸)', capacity: '۳و نیم تن' },
    { id: 7, label: 'خاور چوبی (۸۰۸)', capacity: 'تا ۵ تن' },
    { id: 8, label: 'خاور مسقف', capacity: 'تا ۳ تن' },
    { id: 9, label: 'خاور بغل بازشو', capacity: 'تا ۳ و نیم تن' },
    { id: 10, label: 'خاور ۹۱۱', capacity: 'تا ۵ و نیم تن' },
    { id: 11, label: 'وانت پراید', capacity: 'زیر ۷۰۰ کیلو' },
    { id: 12, label: 'وانت پیکان', capacity: '۴۰۰ تا ۷۰۰ کیلو' },
    { id: 13, label: 'وانت مزدا', capacity: '۷۵۰ کیلو' },
    { id: 14, label: 'وانت نیسان', capacity: '۱۵۰۰ تا ۲۰۰۰ کیلو' },
];
const breakTypeList: readonly IBreakType[] = [
    { id: 1, label: 'آجر فشاری' },
    { id: 2, label: 'آجر سفال' },
    { id: 4, label: 'آجر ضایعات' },
    { id: 3, label: 'ماسه' },
];