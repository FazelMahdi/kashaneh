import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fixChars } from '@/core/util/number';

interface INewDriver {
    firstName: string;
    lastName: string;
    mobile: string;
    pelak: {
        p1: string;
        p2: string;
        p3: string;
        p4: string;
    };
    fullPelak: string;
}

export default function AddDriverDialog({ show, onClose }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<INewDriver>({
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
    });
    const [loading, setLoading] = useState<boolean>(false)
    const addDriver = () => {
        setForm((prevState) => ({ ...prevState, fullPelak: `${prevState.pelak.p1}${prevState.pelak.p2}${prevState.pelak.p3}${prevState.pelak.p4}` }))
        setLoading(true)
        axios.post('/api/v1/driver/create', form)
            .then(() => {
                setOpen(false);
                onClose(false)
            }).finally(() => setLoading(false))
    }

    const handleClose = (
        event: any,
        reason: "backdropClick" | "escapeKeyDown"
    ) => {
        event.stopPropagation();
        if (reason !== "backdropClick") {
            setOpen(false);
            onClose(false)
        }
    };
    const handleChange = (evt) => {
        const value = evt.target.value;
        setForm((prevState) =>
        ({
            ...prevState,
            [evt.target.name]: value
        })
        )
    }

    useEffect(() => {
        setOpen(show);
    }, [show])

    return (
        <Dialog
            open={open}
            maxWidth="sm"
            fullWidth
            onClose={handleClose}
            disableEscapeKeyDown
        >
            <DialogTitle >
                <div className='flex justify-between'>
                    افزودن راننده جدید
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ marginY: '2rem', marginX: 'auto' }} component="form" autoComplete="off">
                    <TextField
                        label="نام"
                        placeholder=""
                        name="firstName"
                        className="w-full mb-5"
                        onChange={(e) => handleChange(e)}
                        value={form.firstName}
                    />
                    <TextField
                        label="نام خانوادگی"
                        placeholder=""
                        name="lastName"
                        className="w-full mb-5"
                        onChange={(e) => handleChange(e)}
                        value={form.lastName}
                    />
                    <TextField
                        label="شماره همراه"
                        name="mobile"
                        onChange={(e) => handleChange(e)}
                        value={form.mobile}
                        className="w-full ltr"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                    <div className="flex justify-between flex-wrap mt-5">
                        <div
                            className="flex justify-between border border-solid border-gray-800 rounded-sm overflow-hidden bg-yellow-500"
                        >
                            <div className="w-20 border-0 border-l border-solid border-gray-800 text-center my-auto text-lg">
                                <div>
                                    <TextField
                                        className="w-full center"
                                        onChange={(e) => setForm((prevState) =>
                                        ({
                                            ...prevState,
                                            pelak: {
                                                ...prevState.pelak,
                                                p4: fixChars(e.target.value)
                                            }
                                        }))}
                                        value={form.pelak.p1}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                </div>
                            </div>
                            <div className="w-60 flex justify-around items-center text-center text-lg">
                                <div className="mx-2 w-20">
                                    <TextField
                                        onChange={(e) => setForm((prevState) =>
                                        ({
                                            ...prevState,
                                            pelak: {
                                                ...prevState.pelak,
                                                p1: fixChars(e.target.value)
                                            }
                                        }))}
                                        value={form.pelak.p2}
                                        className="w-full center"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                </div>

                                <div className="mx-2 w-20">
                                    <TextField
                                        onChange={(e) => setForm((prevState) =>
                                        ({
                                            ...prevState,
                                            pelak: {
                                                ...prevState.pelak,
                                                p2: fixChars(e.target.value)
                                            }
                                        }))}
                                        value={form.pelak.p3}
                                        className="w-full center"
                                    />
                                </div>

                                <div className="mx-2 w-20">
                                    <TextField
                                        onChange={(e) => setForm((prevState) =>
                                        ({
                                            ...prevState,
                                            pelak: {
                                                ...prevState.pelak,
                                                p3: fixChars(e.target.value)
                                            }
                                        }))}
                                        value={form.pelak.p4}
                                        className="w-full text-center"
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
                </Box>
            </DialogContent>
            <div className='flex justify-between p-5'>
                <Button onClick={handleClose}>
                    انصراف
                </Button>
                <Button disabled={loading ?? null} onClick={() => addDriver()} variant='contained' className='bg-orange-400 rounded-lg p-3 px-4'>
                    {
                        loading ? ' ذخیره کاربر' : 'در حال ذخیره'
                    }
                </Button>
            </div>
        </Dialog>
    );
}