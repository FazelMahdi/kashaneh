import PageHeader from '@/components/utils/page-header';
import { Box, Container, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(
    name: string,
    calories: string,
    fat: string,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const rows = [
    createData('مهدی فاضلی', '09031003088','25 ع 158', 2400, 10000),
    createData('محمد فاضلی', '09031003088','25 ع 158', 2400, 10000),
    createData('مهدی حسنی', '09031003088','25 ع 158', 2400, 10000),

];

export default function InprogressSalesList() {
    return (
        <Container maxWidth={false}>
            <Box sx={{ bgcolor: 'white', borderRadius: '1rem', padding: '2rem' }}>
                <PageHeader title="لیست سفارشات جاری" />
                <TableContainer component={Box}>
                    <Table stickyHeader sx={{ minWidth: 650}} aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>نام خریدار</TableCell>
                                <TableCell align="right">شماره همراه</TableCell>
                                <TableCell align="right">شماره پلاک</TableCell>
                                <TableCell align="right">وزن خالی ماشین</TableCell>
                                <TableCell align="right">مقدار بار درخواستی</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow
                                    key={row.name}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>

    );
}