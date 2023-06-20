import { ChevronLeft } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { useRouter } from "next/router";

const PageHeader = (props: {
    title: string
}) => {
    const router = useRouter()

    return <>
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold mb-5"> {props.title}</h3>
            <Button className="text-gray-700" size="medium" variant="text" endIcon={<ChevronLeft />} onClick={() => router.back()}>
                بازگشت
            </Button>
        </div>
        <Divider light />
    </>
}

export default PageHeader;