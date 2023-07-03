import React, { useEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image";
import { Dialog } from "@mui/material";

const PrintOrderDialog = ({ show }) => {
  const [open, setOpen] = useState(false);
  const designRef = useRef(null); // Ref to the design container element

  const handlePrint = () => {
    const element = designRef.current; // HTML element to be printed

    // Convert the HTML element to an image using dom-to-image
    domtoimage
      .toPng(element)
      .then((dataUrl) => {
        // Create a new popup window for printing
        const printWindow:any = window.open("", "_blank", "width=600,height=800");

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
                  padding: 0;
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

//   useEffect(() => {
//     setOpen(show);
//     setTimeout(() => {
//       handlePrint();
//     }, 1000);
//   }, [show]);

  return (
    <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
      <h1>Print Component</h1>
      <div ref={designRef} id="design">
        {/* Your designed HTML goes here */}
      </div>
    </Dialog>
  );
};

export default PrintOrderDialog;
