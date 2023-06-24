'use client'

import PageHeader from "@/components/utils/page-header";
import { PermIdentity } from "@mui/icons-material";
import { Box, Button, Chip, Container, Divider, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
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
        phoneNumber: '09122132389',
        name: '',
        family: '',
        carNO: '',
        carWeightEmpty: undefined,
        orderWeight: undefined,
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
                <Box className="w-full lg:w-6/12 mx-auto text-center" sx={{ bgcolor: 'white', borderRadius: '1rem', padding: '2rem' }}>
                    <PageHeader title="ثبت فروش" />

                    <Divider className="mt-5 mb-5">
                        <Chip color="primary" label="مشخصات مجوز" className="font-bold" />
                    </Divider>

                    <Box sx={{ marginY: '2rem', marginX: 'auto' }} component="form" autoComplete="off">
                        <List
                            className="bg-gray-50 rounded-lg w-full"
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <ListItemButton>
                                <ListItemIcon className="flex justify-center mx-auto">
                                    <PermIdentity />
                                </ListItemIcon>
                                <ListItemText ><small>خریدار</small></ListItemText>
                                <p className="text-lg font-bold">مهدی فاضلی</p>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon className="flex justify-center mx-auto">
                                    <PermIdentity />
                                </ListItemIcon>
                                <ListItemText ><small>شماره پلاک</small></ListItemText>
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
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon className="flex justify-center mx-auto">
                                    <PermIdentity />
                                </ListItemIcon>
                                <ListItemText ><small>محصول</small></ListItemText>
                                <p className="text-md">آجر فشاری</p>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon className="flex justify-center mx-auto">
                                    <PermIdentity />
                                </ListItemIcon>
                                <ListItemText ><small>تاریخ مجوز</small></ListItemText>
                                <p className="text-md">25 اردیبهشت 1402 ساعت 12:45</p>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon className="flex justify-center mx-auto">
                                    <PermIdentity />
                                </ListItemIcon>
                                <ListItemText ><small>وزن خالی ماشین</small></ListItemText>
                                <p className="text-md">11,000 کیلوگرم</p>
                            </ListItemButton>
                        </List>
                    </Box>
                    <Box sx={{ marginY: '2rem', marginX: 'auto' }} component="form" autoComplete="off">
                        <List
                            className="bg-gray-50 rounded-lg w-full"
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <ListItemButton>
                                <ListItemIcon className="flex justify-center mx-auto">
                                    <PermIdentity />
                                </ListItemIcon>
                                <ListItemText ><small> گروه بارگیری</small></ListItemText>
                                <p className="text-md font-bold">گروه آزادبخت</p>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon className="flex justify-center mx-auto">
                                    <PermIdentity />
                                </ListItemIcon>
                                <ListItemText ><small>قیمت پایه</small></ListItemText>
                                <p className="text-md font-bold">3,820 ریال</p>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon className="flex justify-center mx-auto">
                                    <PermIdentity />
                                </ListItemIcon>
                                <ListItemText ><small>هزینه بارگیری</small></ListItemText>
                                <p className="text-md font-bold">1,000 ریال</p>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon className="flex justify-center mx-auto">
                                    <PermIdentity />
                                </ListItemIcon>
                                <ListItemText ><small>محصول</small></ListItemText>
                                <p className="text-md">آجر فشاری</p>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon className="flex justify-center mx-auto">
                                    <PermIdentity />
                                </ListItemIcon>
                                <ListItemText ><small>وزن خالی ماشین</small></ListItemText>
                                <p className="text-md">11,000 کیلوگرم</p>
                            </ListItemButton>
                        </List>

                        <div className="text-left mt-3 md:w-6/12 mr-auto">
                            <div className="mt-3">
                                <TextField
                                    label="مقدار سفارش"
                                    placeholder=""
                                    className="w-full my-2"
                                    name="orderWeight"
                                    onChange={(e) => handleChange(e)}
                                    value={form.orderWeight}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">کیلوگرم <small className="mr-1">(تُن * 1000) </small></InputAdornment>,
                                    }}
                                />
                            </div>
                            <div className="my-2">
                                <div className="flex justify-between items-center">
                                    <small className="ml-2">قیمت کالا</small>
                                    <p className="text-lg font-bold">50,750,820 ریال</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <small className="ml-2">هزینه بارگیری</small>
                                    <p className="text-lg font-bold text-blue-700">12,750,820 ریال</p>
                                </div>
                                <Divider className="my-1" />
                                <div className="flex justify-between items-center">
                                    <small className="ml-2">قیمت کل</small>
                                    <p className="text-lg font-extrabold text-green-700">52,750,820 ریال</p>
                                </div>
                            </div>
                            <Button className="w-full mb-8 bg-green-600 font-extrabold rounded-lg py-5" variant="contained" size="large">
                                ثبت فروش
                            </Button>
                        </div>
                    </Box>
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