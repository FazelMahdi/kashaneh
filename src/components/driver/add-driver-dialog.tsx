import http from '@/core/http/axios';
import { fixChars } from '@/core/util/number';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import Toastify from "toastify-js";

export default function AddDriverDialog({ show, onClose, onUpdate }) {
    const [open, setOpen] = useState(false);
    const {
        control,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            mobile: '',
            pelak: {
                p1: '',
                p2: '',
                p3: '',
                p4: '',
            },
            fullPelak: '',
        },
    });
    const pelak = watch('pelak');
    const [loading, setLoading] = useState<boolean>(false)
    const onSubmit = async (data) => {
        setLoading(true)
        http.post('/api/v1/driver/create', { ...data, fullPelak: data.pelak.p1 + data.pelak.p2 + data.pelak.p3 })
            .then(() => {
                setOpen(false);
                onClose(false);
                onUpdate(true);
                Toastify({
                    text: "راننده جدید با موفقیت اضافه شد",
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
            })
            .finally(() => setLoading(false))
    }

    const handleClose = (
        event: any,
    ) => {
        event.stopPropagation();
        setOpen(false);
        onClose(false)

    };

    useEffect(() => {
        setOpen(show);
    }, [show])

    return (
        <Dialog
            open={open}
            maxWidth="sm"
            fullWidth
            onClose={(e) => handleClose(e)}
            disableEscapeKeyDown
        >
            <DialogTitle >
                <div className='flex justify-between'>
                    افزودن راننده جدید
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <form className="flex flex-col justify-center items-center">
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.firstName}
                                label="نام"
                                placeholder="نام راننده را وارد کنید"
                                className="w-full mb-5"
                            />
                        )}
                    />

                    <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.lastName}
                                label="نام خانوادگی"
                                placeholder="نام خانوادگی راننده را وارد کنید"
                                className="w-full mb-5"
                            />
                        )}
                    />
                    <Controller
                        name="mobile"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.mobile}
                                label="شماره همراه"
                                placeholder="شماره همراه راننده را وارد کنید"
                                className="w-full ltr"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                        )}
                    />
                    <div className="flex justify-between flex-wrap mt-5">
                        <div
                            className="flex justify-between border border-solid border-gray-800 rounded-sm overflow-hidden bg-yellow-500"
                        >
                            <div className="w-20 border-0 border-l border-solid border-gray-800 text-center my-auto text-lg">
                                <div>
                                    <Controller
                                        name="pelak.p4"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="w-full !text-center"
                                                onChange={(e) => {
                                                    setValue("pelak.p4", fixChars(e.target.value))
                                                }}
                                                value={pelak.p4}
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="w-60 flex justify-around items-center text-center text-lg">
                                <div className="mx-2 w-20">
                                    <TextField
                                        className="w-full !text-center"
                                        onChange={(e) => {
                                            setValue("pelak.p1", fixChars(e.target.value))
                                        }}
                                        value={pelak.p1}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                </div>

                                <div className="mx-2 w-20">
                                    <TextField
                                        className="w-full !text-center"
                                        onChange={(e) => {
                                            setValue("pelak.p2", fixChars(e.target.value))
                                        }}
                                        value={pelak.p2}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                </div>

                                <div className="mx-2 w-20">
                                    <TextField
                                        className="w-full !text-center"
                                        onChange={(e) => {
                                            setValue("pelak.p3", fixChars(e.target.value))
                                        }}
                                        value={pelak.p3}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                </div>
                            </div>
                            <div className="w-5  bg-blue-800 ml-0">
                                <div className="mx-auto">
                                    <div className="h-1 w-full bg-green-500" />
                                    <div className="h-1 bg-white" />
                                    <div className="h-1 bg-red-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </DialogContent>
            <div className='flex justify-between p-5'>
                <Button onClick={(e) => handleClose(e)}>
                    انصراف
                </Button>
                <Button disabled={loading ?? null} onClick={handleSubmit(onSubmit)} variant='contained' className='bg-orange-400 rounded-lg p-3 px-4'>
                    {
                        loading ? 'در حال ذخیره' : ' ذخیره کاربر'
                    }
                </Button>
            </div>
        </Dialog>
    );
}