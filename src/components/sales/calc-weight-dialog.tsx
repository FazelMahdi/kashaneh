import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';

export default function CalcWeightDialog({ show, onClose, onSome }) {
    const [open, setOpen] = useState(false);
    const [weightList, setWeightList] = useState<string[]>([''])

    const handleClose = () => {
        setOpen(false);
        onClose(false)
    };

    const handleChange = (e, index) => {
        let result = [...weightList];
        result = result.map((x, i) => {
            if (i === index) x = e.target.value;
            return x;
        });
        setWeightList(result);
    };

    const removeItem = (i) => {
        setWeightList((prev) => prev.filter((_, index) => index !== i))
    }

    const calcSum = () => {
        return weightList.reduce((a, b) => { return +a + +b }, 0)
    }

    useEffect(() => {
        setOpen(show);
    }, show)

    return (
        <Dialog
            open={open}
            maxWidth="md"
            fullWidth
            onClose={handleClose}
        >
            <DialogTitle >
                <div className='flex justify-between'>
                    محاسبه جمع کل
                    <Button variant="outlined" size="small" onClick={() => setWeightList((prev) => [...prev, ''])}>
                        افزودن
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {
                    weightList.map((weight, i) => (
                        <div key={i + 'add'} className="flex justify-start items-center  w-full  mb-8">
                            <TextField
                                label={'وزن' + (i + 1)}
                                className="w-full ml-2"
                                onChange={(e) => handleChange(e, i)}
                                value={weight}
                                type='number'
                            />
                            {i > 0 && <Button variant="outlined" size="small" onClick={() => removeItem(i)}>
                                حذف
                            </Button>}
                        </div>
                    ))
                }
            </DialogContent>
            <div className='flex justify-between p-5'>
                <p>جمع کل: <span className='font-extrabold text-lg'>{calcSum() || 'مقدار نامعتبر'}</span></p>
                <div>
                    <Button autoFocus onClick={handleClose}>
                        انصراف
                    </Button>
                    <Button onClick={() => { onSome(calcSum()); handleClose() }} variant='contained' className='bg-orange-400'>
                        استفاده از جمع کل
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}