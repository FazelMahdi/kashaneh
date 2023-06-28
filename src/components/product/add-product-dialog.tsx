import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface INewProduct {
    title: string;
    unit: number;
    price: number | undefined;
    finalPrice: number | undefined;
    loadPrice: number | undefined;
    baskulPrice: number | undefined;
}

export default function AddProductDialog({ show, onClose }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<INewProduct>({
        title: '',
        unit: 1, // kilogram
        price: undefined,
        finalPrice: undefined,
        loadPrice: undefined,
        baskulPrice: 0,
    });
    const [loading, setLoading] = useState<boolean>(false)
    const addDriver = () => {
        setForm((prevState) => ({ ...prevState, fullPelak: `${prevState.pelak.p1}${prevState.pelak.p2}${prevState.pelak.p3}` }))
        setLoading(true)
        axios.post('/api/v1/driver/create', form)
            .then(() => {
                setOpen(false);
                onClose(false)
            }).catch(() => alert('مشکل در ارتباط با سرور'))
            .finally(() => setLoading(false))
    }

    const handleClose = (e) => {
        e.stopPropagation();
        setOpen(false);
        onClose(false)
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
            onClose={(e) => handleClose(e)}
            disableEscapeKeyDown
        >
            <DialogTitle >
                <div className='flex justify-between'>
                    افزودن محصول جدید
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ marginY: '2rem', marginX: 'auto' }} component="form" autoComplete="off">
                    <TextField
                        label="نام محصول"
                        placeholder=""
                        name="title"
                        className="w-full mb-5"
                        onChange={(e) => handleChange(e)}
                        value={form.title}
                    />
                    <TextField
                        label="قیمت واحد"
                        name="price"
                        placeholder='قیمت به ریال وارد شود'
                        onChange={(e) => handleChange(e)}
                        value={form.price}
                        className="w-full ltr mb-5"
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                    <TextField
                        label="قیمت با احتساب تخفیف"
                        name="finalPrice"
                        placeholder='قیمت به ریال وارد شود'
                        onChange={(e) => handleChange(e)}
                        value={form.finalPrice}
                        className="w-full ltr mb-5"
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                    <TextField
                        label="هزینه بارگیری"
                        name="loadPrice"
                        placeholder='قیمت به ریال وارد شود'
                        onChange={(e) => handleChange(e)}
                        value={form.loadPrice}
                        className="w-full ltr mb-5"
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />

                </Box>
            </DialogContent>
            <div className='flex justify-between p-5'>
                <Button onClick={(e) => handleClose(e)}>
                    انصراف
                </Button>
                <Button disabled={loading ?? null} onClick={() => addDriver()} variant='contained' className='bg-orange-400 rounded-lg p-3 px-4'>
                    {
                        loading ? 'در حال ذخیره' : ' ذخیره کاربر'
                    }
                </Button>
            </div>
        </Dialog>
    );
}