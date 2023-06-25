import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';

export default function AddDriverDialog({ show, onClose }) {
    const [open, setOpen] = useState(false);

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

    useEffect(() => {
        setOpen(show);
    }, show)

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
                        name="carNO"
                        className=" mb-5 w-full"
                    />
                    <TextField
                        label="نام خانوادگی"
                        placeholder=""
                        name="carNO"
                        className=" mb-5 w-full"
                    />
                    <TextField
                        label="شماره همراه"
                        name="phoneNumber"
                        className="w-full ltr"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                    <div className="flex justify-between flex-wrap mt-5">
                        <div
                            className="flex justify-between border border-solid border-gray-800 rounded-sm overflow-hidden bg-yellow-500"
                        >
                            <div className="w-20 border-0 border-l border-solid border-gray-800 text-center my-auto text-lg">
                                <p>
                                    <TextField
                                        name="phoneNumber"
                                        className="w-full center"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                </p>
                            </div>
                            <div className="w-60 flex justify-around items-center text-center text-lg">
                                <p className="mx-2 w-20">
                                <TextField
                                        name="phoneNumber"
                                        className="w-full center"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                </p>

                                <p className="mx-2 w-20">
                                <TextField
                                        name="phoneNumber"
                                        className="w-full center"
                                    />
                                </p>

                                <p className="mx-2 w-20">
                                <TextField
                                        name="phoneNumber"
                                        className="w-full text-center"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                </p>
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
                <Button onClick={handleClose} >
                    انصراف
                </Button>
                <Button onClick={handleClose} variant='contained' className='bg-orange-400'>
                    ذخیره کاربر
                </Button>
            </div>
        </Dialog>
    );
}