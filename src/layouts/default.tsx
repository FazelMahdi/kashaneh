import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';

const pages = [
  {
    title: 'فروش',
    path: '/sales/new-sale'
  },
  {
    title: 'سفارش جاری',
    path: '/sales/inprogress-sales-list'
  },
  {
    title: 'گروه بارگیری',
    path: ''
  },
  {
    title: 'محصولات',
    path: ''
  },
  {
    title: 'مقصد ها',
    path: ''
  },
  {
    title: 'رانندگان',
    path: ''
  },
  {
    title: 'حسابداری',
    path: ''
  },
  {
    title: 'مشتریان',
    path: ''
  },
];
const settings = ['مهدی فاضلی', 'تنظیمات', 'خروج'];

export default function DefaultLayout({ children }) {

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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
    setAnchorElUser(null)
  };

  return (
    < >
      <AppBar color='secondary' position="static" dir='rtl'>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              className='md:flex mr-1'
            >
              <Image src="/logo.png" alt="کاشانه"
                width={40}
                height={40}
                priority />
            </Typography>

            <Box className='flex grow md:hidden '>
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
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Link href={page.path} shallow={true} className='text-gray-700 font-bold text-center'>
                      {page.title}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box className='grow hidden md:flex'>
              {pages.map((page, i) => (
                <Link href={page.path} shallow={true} key={i + 'mo'} className='text-gray-700 font-bold text-center mx-3'>
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
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography className='text-gray-700 font-bold' textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth={false} className='my-5'>
        {children}
      </Container>
    </>
  );
}