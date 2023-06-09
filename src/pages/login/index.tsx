import { setItem } from "@/core/util/storage";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.userName === process.env.NEXT_PUBLIC_ADMIN_USERNAME) {
      setItem("userInfo", process.env.NEXT_PUBLIC_ADMIN_USERNAME);
      router.push("/dashboard");
    } else if (form.userName === process.env.NEXT_PUBLIC_SELLER_USERNAME) {
      setItem("userInfo", process.env.NEXT_PUBLIC_SELLER_USERNAME);
      router.push("/dashboard");
    } else {
      alert("nothing");
    }
  };

  const handleForm = (e) => {
    const value = e.target.value;
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  return (
    <div className="login-bg h-screen">
      <Container
        component="main"
        maxWidth="xs"
        className="!rounded-bl-[3rem] !rounded-br-[3rem] shadow-2xl  bg-gray-50"
      >
        <div className="flex flex-col items-center p-6 ">
          <Image src="/logo.png" alt="کاشانه" width={80} height={80} priority />
          <Typography component="h3" className="mt-5 font-light h4">
            ورود به پنل کاشانه
          </Typography>
          <form onSubmit={handleSubmit} className="mt-5">
            <TextField
              margin="normal"
              fullWidth
              name="userName"
              label="شماره همراه"
              autoFocus
              value={form.userName}
              onChange={(e) => handleForm(e)}
              autoComplete="off"
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="رمز عبور"
              type="password"
              value={form.password}
              onChange={(e) => handleForm(e)}
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="mt-5 rounded-full py-4"
              size="large"
            >
              ورود به پنل
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

Login.layout = "empty";
