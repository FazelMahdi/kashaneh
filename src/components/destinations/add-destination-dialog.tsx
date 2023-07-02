import http from '@/core/http/axios';
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

interface INewDestination {
  title: string;
}

export default function AddDestionationDialog({ show, onClose }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<INewDestination>({
    title: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const addDestination = () => {
    setLoading(true);
    http
      .post("/api/v1/destination/create", {
        title: form.title,
      })
      .then(() => {
        setOpen(false);
        onClose(false);
      })
      .finally(() => setLoading(false));
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    onClose(false);
  };
  const handleChange = (evt) => {
    const value = evt.target.value;
    setForm((prevState) => ({
      ...prevState,
      [evt.target.name]: value,
    }));
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={(e) => handleClose(e)}
      disableEscapeKeyDown
    >
      <DialogTitle>
        <div className="flex justify-between">افزودن مقصد جدید</div>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ marginY: "2rem", marginX: "auto" }}
          component="form"
          autoComplete="off"
        >
          <TextField
            label="نام مقصد"
            placeholder=""
            name="title"
            className="w-full mb-5"
            onChange={(e) => handleChange(e)}
            value={form.title}
          />
        </Box>
      </DialogContent>
      <div className="flex justify-between p-5">
        <Button onClick={(e) => handleClose(e)}>انصراف</Button>
        <Button
          disabled={loading ?? null}
          onClick={() => addDestination()}
          variant="contained"
          className="bg-orange-400 rounded-lg p-3 px-4"
        >
          {loading ? "در حال ذخیره" : " ذخیره مقصد"}
        </Button>
      </div>
    </Dialog>
  );
}
