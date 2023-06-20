"use client"

import CalcWeightDialog from '@/components/sales/calc-weight-dialog';
import PageHeader from "@/components/utils/page-header";
import { Autocomplete, Box, Button, Chip, Container, Divider, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

interface INewSale {
    phoneNumber: string;
    name: string;
    family: string;
    carNO: string;
    carWeightEmpty: number | null;
    orderWeight: number | null;
    productType: number | null;

}

export default function NewSale() {

    const [form, setForm] = useState<INewSale>({
        phoneNumber: '09122132389',
        name: '',
        family: '',
        carNO: '',
        carWeightEmpty: null,
        orderWeight: null,
        productType: 1
    })

    const [calcWeightDialog, setCalcWeightDialog] = useState<Boolean>(false)

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
                <Box sx={{ bgcolor: 'white', borderRadius: '1rem', padding: '2rem' }}>
                    <PageHeader title="ثبت فروش جدید" />

                    <Divider className="mt-5 mb-5">
                        <Chip color="primary" label="اطلاعات خریدار" className="font-bold" />
                    </Divider>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginX: 'auto' }} component="form" autoComplete="off">
                        <TextField
                            label="شماره همراه راننده"
                            placeholder="09..."
                            name="phoneNumber"
                            className="w-full md:w-6/12 mb-2 ltr"
                            onChange={(e) => handleChange(e)}
                            value={form.phoneNumber}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                    </Box>
                    {
                        form.phoneNumber && form.phoneNumber.length === 11 &&
                        (

                            <>
                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ marginY: '2rem', marginX: 'auto' }} component="form" autoComplete="off">
                                    <TextField
                                        label="شماره پلاک ماشین"
                                        placeholder="09..."
                                        name="carNO"
                                        className="w-full md:w-6/12 ltr mb-8"
                                        onChange={(e) => handleChange(e)}
                                        value={form.carNO}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                    <Autocomplete
                                        id="vehicle-select"
                                        className="w-full md:w-6/12"
                                        options={vehiclesList}
                                        autoHighlight
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
                                                label="نوع ماشین"
                                                inputProps={{
                                                    ...params.inputProps,
                                                }}
                                            />
                                        )}
                                    />

                                </Box>
                                <Divider className="mt-5 mb-5">
                                    <Chip color="primary" label="سفارش گیری" className="font-bold" />
                                </Divider>
                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ marginY: '2rem', marginX: 'auto' }} component="form" autoComplete="off">

                                    <div className="flex justify-start items-center  w-full md:w-6/12 mb-8">
                                        <TextField
                                            label="وزن ماشین (بدون بار)"
                                            name="carWeightEmpty"
                                            className="w-full ml-2"
                                            onChange={(e) => handleChange(e)}
                                            value={form.carWeightEmpty}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">کیلوگرم <small className="mr-1">(تُن * 1000) </small></InputAdornment>,
                                            }}
                                        />
                                        <Button variant="outlined" size="large" onClick={() => setCalcWeightDialog(true)}>
                                            محاسبه
                                        </Button>
                                    </div>
                                    <Select
                                        name="productType"
                                        onChange={(e) => handleChange(e)}
                                        label="نوع محصول"
                                        value={form.productType}
                                        className="w-full md:w-6/12 mb-8 text-gray-700"
                                    >
                                        {breakTypeList.map((item, index) => (
                                            <MenuItem key={index + 'breakkey'} value={item.id}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                    <TextField
                                        label="مقدار سفارش"
                                        placeholder=""
                                        name="orderWeight"
                                        className="w-full md:w-6/12 mb-8"
                                        onChange={(e) => handleChange(e)}
                                        value={form.orderWeight}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">کیلوگرم <small className="mr-1">(تُن * 1000) </small></InputAdornment>,
                                        }}
                                    />
                                    <Button className="w-full md:w-6/12 mb-8 bg-green-600 font-extrabold rounded-lg py-5" variant="contained" size="large">
                                        صدور مجوز بارگیری
                                    </Button>
                                </Box>
                                {calcWeightDialog && <CalcWeightDialog show={calcWeightDialog} onClose={() => setCalcWeightDialog(false)} onSome={(val) => setForm((prev) => ({ ...prev, carWeightEmpty: val }))} />}
                            </>
                        )
                    }
                </Box>
            </Container>

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