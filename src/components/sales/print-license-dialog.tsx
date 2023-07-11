import { numeral } from "@/core/util/number";
import { Button, Dialog, Divider } from "@mui/material";
import domtoimage from "dom-to-image";
import { useEffect, useRef, useState } from "react";

const PrintLicenseDialog = ({ show, order }) => {
  const [open, setOpen] = useState(false);
  const designRef = useRef(null); // Ref to the design container element

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
        // router.push("/sales/inprogress-sales-list");
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
      <div ref={designRef} id="design" className="p-8">
        <div className="mx-auto">
          <p className="text-center">مجوز بارگیری</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-full">
            <img src="/logo.png" alt="کاشانه" width={80} height={80} />
            <small>شرکت تعاونی آجر ماشینی کاشانه کوهدشت</small>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <p className="ml-1">شماره مجوز:</p>
              <p className="ml-1 font-bold text-lg">
                {new Date(order.createdAt).getTime()}
              </p>
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
          <div className="mx-auto">
            <p className="text-center">مخصوص گروه بارگیری </p>
          </div>
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
                <p className="ml-1 w-3/12"> راننده:</p>
                <p className="ml-1 font-bold text-[1rem] w-9/12 text-left">
                  <span className="ml-1 inline-block">
                    {order.driver.firstName}
                  </span>
                  <span className="inline-block">{order.driver.lastName}</span>
                </p>
              </div>
            </div>
            <div className="w-6/12 ">
              <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
                <p className="ml-1 w-3/12">شماره همراه</p>
                <p className="ml-1 font-bold text-lg w-9/12 text-left">
                  {order.driver.mobile.slice(-4)} ****
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
                <p>گروه بارگیری :</p>
                <span className="font-bold text-lg flex-1 mr-2">
                  {order.workerGroup.title}
                </span>
              </div>
            </div>
            <div className="w-6/12 ">
              <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
                <p> مقدار درخواستی :</p>
                <span className="font-bold text-lg flex-1 mr-2">
                  {numeral(order.needsOfAmount)}
                  <small className="text-xs mr-2">کیلوگرم</small>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Divider className="bg-gray-800 my-4" />
        <div className="mx-auto">
          <p className="text-center">مخصوص راننده</p>
        </div>
        <div className="flex justify-between flex-row flex-wrap mt-3">
          <div className="w-6/12 ">
            <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
              <p className="ml-1 w-4/12">شماره پلاک:</p>
              <p className="ml-1 font-bold text-lg w-8/12 text-left">
                {order.driver.fullPelak}
              </p>
            </div>
          </div>
          <div className="w-6/12 ">
            <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
              <p className="ml-1 w-3/12"> راننده:</p>
              <p className="ml-1 font-bold text-[1rem] w-9/12 text-left">
                <span className="ml-1 inline-block">
                  {order.driver.firstName}
                </span>
                <span className="inline-block">{order.driver.lastName}</span>
              </p>
            </div>
          </div>
          <div className="w-6/12 ">
            <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
              <p className="ml-1 w-3/12">شماره همراه</p>
              <p className="ml-1 font-bold text-lg w-9/12 text-left">
                {order.driver.mobile.slice(-4)} ****
              </p>
            </div>
          </div>
          <div className="w-6/12 پف-۱">
            <div className="flex justify-between items-center m-1 border-1 border-solid border p-2 border-gray-500 rounded-lg">
              <p className="ml-1">شماره مجوز:</p>
              <p className="ml-1 font-bold text-lg">
                {new Date(order.createdAt).getTime()}
              </p>
            </div>
          </div>
        </div>
        <Divider className="bg-gray-800 my-3" />
        <div>
          <p className="font-bold">
            توجه: برگه مجوز را نزد خود نگه دارید و در پایان بارگیری آن را تحویل
            مسئول باسکول دهید.
          </p>
          <p></p>
        </div>
      </div>
      <div className="flex justify-end p-5">
        <Button
          onClick={() => handlePrint()}
          variant="contained"
          className="bg-orange-400  text-white"
        >
          چاپ مجدد
        </Button>
      </div>
    </Dialog>
  );
};

export default PrintLicenseDialog;
