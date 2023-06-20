"use client"

import CalcWeightDialog from '@/components/sales/calc-weight-dialog';
import PageHeader from "@/components/utils/page-header";
import { Input } from "@nextui-org/react";
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
            <div className='w-11/12 lg:w-6/12 mx-auto py-5'>

                <div className='flex flex-col justify-center items-center'>
                    <Input
                    className='rtl text-right'
                        bordered 
                        contentRight
                        contentRightStyling

                        labelPlaceholder="شماره همراه" 
                        color="primary" />

                </div>
            </div>
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