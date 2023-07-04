import { numeral } from "@/core/util/number";
import { Dialog, Divider } from "@mui/material";
import domtoimage from "dom-to-image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const PrintOrderDialog = ({
  show,
  order,
  totalAmount,
  totalPrice,
  totalDiscount,
  totalLoadPrice,
  totalFinalPrice,
}) => {
  const [open, setOpen] = useState(false);
  const designRef = useRef(null); // Ref to the design container element
  const router = useRouter();

  const handlePrint = () => {
    const element = designRef.current; // HTML element to be printed

    // Convert the HTML element to an image using dom-to-image
    domtoimage
      .toPng(element)
      .then((dataUrl) => {
        // Create a new popup window for printing
        const printWindow: any = window.open(
          "",
          "_blank",
          "width=600,height=800"
        );

        // Set the content of the new window
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>Print</title>
              <style>
                @page {
                  size: A5;
                  margin: 0;
                }
                body {
                  padding: 30px;
                  margin: 0;
                }
                img {
                  width: 100%;
                  height: auto;
                }
              </style>
            </head>
            <body>
              <img src="${dataUrl}">
              <script>
                // Close the print window after printing is done
                window.onload = function() {
                  window.print();
                  window.onafterprint = function () {
                    window.close();
                  };
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
        router.push('/sales/inprogress-sales-list')
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(show);
    setTimeout(() => {
      handlePrint();
    }, 2000);
  }, [show]);

  return (
    <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
      <div ref={designRef} id="design" className="p-10">
        <div className="mx-auto">
          <p className="text-center">صورت حساب فروش</p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.png" alt="کاشانه" width={80} height={80} />
            <small>شرکت تعاونی آجر ماشینی کاشانه کوهدشت</small>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <p className="ml-1">شماره فروش:</p>
              <p className="ml-1 font-bold text-lg">{new Date(order.createdAt).getTime()}</p>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <p className="ml-1">تاریخ:</p>
              <p className="ml-1 font-bold text-lg">
                {new Date(order.createdAt).toLocaleString("fa-IR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
        <Divider className="bg-gray-800 my-3" />
        <div className="mt-3">
          <p className="font-bold text-[0.95rem]">مشخصات خریدار و وسیله:</p>
          <div className="flex justify-between flex-row flex-wrap mt-3">
            <div className="w-6/12 ">
              <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
                <p className="ml-1">شماره پلاک:</p>
                <p className="ml-1 font-bold text-lg">
                  {order.driver.fullPelak}
                </p>
              </div>
            </div>
            <div className="w-6/12 ">
              <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
                <p className="ml-1"> راننده/خریدار:</p>
                <p className="ml-1 font-bold text-[1rem]">
                  <span className="ml-1 inline-block">{order.driver.firstName}</span>
                  <span className="inline-block">{order.driver.lastName}</span>
                </p>
              </div>
            </div>

            <div className="w-6/12 ">
              <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
                <p className="ml-1">شماره همراه</p>
                <p className="ml-1 font-bold text-lg">{order.driver.mobile}</p>
              </div>
            </div>
            <div className="w-6/12 ">
              <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
                <p className="ml-1">آدرس</p>
                <p className="ml-1 text-[1rem]">
                  {order.destination.title} - {order.address}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <p className="font-bold text-[0.95rem]">مشخصات کالا:</p>
          <div className="flex justify-between flex-row flex-wrap mt-3">
            <div className="w-6/12 ">
              <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
                <p>نام کالا:</p>
                <span className="font-bold text-lg flex-1 mr-2">
                  {order.product.title}
                </span>
              </div>
            </div>
            <div className="w-6/12 ">
              <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
                <p className="ml-1">قیمت هر واحد:</p>
                <p className="ml-1 font-bold text-lg">
                  {numeral(order.product.price)}
                  <small className="text-xs"> ریال</small>
                </p>
              </div>
            </div>

            <div className="w-6/12 ">
              <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
                <p className="ml-1">هزینه بارگیری:</p>
                <p className="ml-1 font-bold text-lg">
                  {numeral(order.product.loadPrice)}
                  <small className="text-xs"> ریال</small>
                </p>
              </div>
            </div>
            <div className="w-6/12 ">
              <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
                <p className="ml-1">هزینه باسکول:</p>
                <p className="ml-1 font-bold text-lg">
                  {numeral(order.product.baskulPrice)}
                  <small className="text-xs"> ریال</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <p className="font-bold text-[0.95rem]">محاسبات:</p>
          <div className="flex justify-between flex-row flex-wrap mt-3">
            <div className="w-full mb-2 border-1 border-solid border p-2 border-gray-500 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="ml-1">وزن بارگیری شده:</p>
                <p className="ml-1 font-bold text-lg">
                  {numeral(totalAmount)}
                  <small className="text-xs"> کیلوگرم</small>
                </p>
              </div>
            </div>
            <div className="w-full mb-2 border-1 border-solid border p-2 border-gray-500 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="ml-1">جمع مبلغ:</p>
                <p className="ml-1 font-bold text-lg">
                  {numeral(totalPrice)}
                  <small className="text-xs"> ریال</small>
                </p>
              </div>
            </div>

            <div className="w-full mb-2 border-1 border-solid border p-2 border-gray-500 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="ml-1">هزینه بارگیری:</p>
                <p className="ml-1 font-bold text-lg">
                  {numeral(totalLoadPrice)}
                  <small className="text-xs"> ریال</small>
                </p>
              </div>
            </div>
            <div className="w-full mb-2 border-1 border-solid border p-2 border-gray-500 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="ml-1">تخفیف:</p>
                <p className="ml-1 font-bold text-lg">
                  {numeral(totalDiscount)}
                  <small className="text-xs"> ریال</small>
                </p>
              </div>
            </div>
            <div className="w-full border-1 border-solid border p-2 border-gray-500 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="ml-1 text-lg">جمع کل:</p>
                <p className="ml-1 font-bold text-xl">
                  {numeral(totalFinalPrice)}
                  <small className="text-xs"> ریال</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Divider className="bg-gray-800 my-3" />
        <div>
          <p className="font-bold">شرایط:</p>
          <p>
            تحویل کالا از طرف شرکت به موسسات حمل و نقل به منزله‌ی کالا به خریدار
            است. و بارنامه ‌ی رسید کالا از طرف مشتری تلقی می‌گردد و شرکت نسبت به
            خسارات و ضایعات بین راهی هیچ گونه مسئولیتی ندارد.
          </p>
        </div>
      </div>
    </Dialog>
  );
};

export default PrintOrderDialog;
