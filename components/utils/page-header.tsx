import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

const PageHeader = (props: {
    title: string
}) => {
    const router = useRouter()

    return <>
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold mb-5"> {props.title}</h3>
            <Button className="text-gray-700" onPress={() => router.back()}>
                بازگشت
            </Button>
        </div>
    </>
}

export default PageHeader;