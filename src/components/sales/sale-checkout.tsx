import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';

export default function SaleCheckoutDialog({ show, onClose }) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        onClose(false)
    };

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
                    بارگیری و ثبت فروش
                </div>
            </DialogTitle>
            <DialogContent dividers>

            </DialogContent>
            <div className='flex justify-between p-5'>
                <Button autoFocus onClick={handleClose}>
                    انصراف
                </Button>
                <Button onClick={() => { handleClose() }} variant='contained' className='bg-orange-400'>
                 ثبت نهایی فروش
                </Button>
            </div>
        </Dialog>
    );
}