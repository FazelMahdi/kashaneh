import { getItem, removeItem } from "@/core/util/storage";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import "toastify-js/src/toastify.css";

export default function DefaultLayout({ children }) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<any>([
    {
      title: "فروش",
      path: "/sales/new-sale",
      admin: false,
    },
    {
      title: "سفارش جاری",
      path: "/sales/inprogress-sales-list",
      admin: false,
    },
    {
      title: "گروه بارگیری",
      path: "/worker-groups",
      admin: false,
    },
    {
      title: "محصولات",
      path: "/products",
      admin: false,
    },
    {
      title: "مقصد ها",
      path: "/destinations",
      admin: false,
    },
    {
      title: "رانندگان",
      path: "/drivers",
      admin: false,
    },
    {
      title: "گزارشات فروش",
      path: "/reports/sales-report",
      admin: true,
    },
    {
      title: "درخواست ها",
      path: "/reports/requests",
      admin: true,
    },
    {
      title: "مشتریان",
      path: "",
      admin: true,
    },
  ]);
  const [userInfo, setUserInfo] = useState<any>({
    name: null,
    isAdmin: false,
  });

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    removeItem("userInfo");
    router.push("/login");
  };

  useEffect(() => {
    getItem("userInfo").then((response) => {
      if (response === process.env.NEXT_PUBLIC_ADMIN_USERNAME) {
        setUserInfo({
          name: process.env.NEXT_PUBLIC_ADMIN_NAME,
          isAdmin: true,
        });
      } else if (response === process.env.NEXT_PUBLIC_SELLER_USERNAME) {
        setUserInfo({
          name: process.env.NEXT_PUBLIC_SELLER_USERNAME,
          isAdmin: false,
        });
        setMenuItems((prevState) => prevState.filter((x) => !x.admin));
      }
    });
  }, []);

  return (
    <>
      <AppBar color="secondary" position="static" dir="rtl">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              className="md:flex mr-1"
            >
              <Image
                src="/logo.png"
                alt="کاشانه"
                width={40}
                height={40}
                priority
              />
            </Typography>

            <Box className="flex grow md:hidden ">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {menuItems.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Link
                      href={page.path}
                      shallow={true}
                      className="text-gray-700 font-bold text-center"
                    >
                      {page.title}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box className="grow hidden md:flex">
              {menuItems.map((page, i) => (
                <Link
                  href={page.path}
                  shallow={true}
                  key={i + "mo"}
                  className="text-gray-700 font-bold text-center mx-3"
                >
                  {page.title}
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="اطلاعت کاربر">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="مدیر فروش" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    className="text-gray-700 font-bold"
                    textAlign="center"
                  >
                    {userInfo.name}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                  <Typography
                    className="text-red-700 font-bold"
                    textAlign="center"
                  >
                    خروج
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth={false} className="my-5">
        {children}
      </Container>
    </>
  );
}
