"use client";

import http from "@/core/http/axios";
import { numeral } from "@/core/util/number";
import { Box, Container, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [loading, setLoading] = useState<any>(true);
    const [prms, setPrms] = useState<any>({
        todaySales: null,
        monthSales: null,
    });
    const getPrms = () => {
        setLoading(true);
        Promise.all([
            http.get("/api/v1/order/reports/todaySales"),
            http.get("/api/v1/order/reports/monthSales"),
        ])
            .then((result: any) => {
                setPrms({
                    todaySales: {
                        count: result[0].map(x => x.amount).reduce((sum, current) => sum + current, 0),
                        totalSale: result[0].map(x => x.amount * x.product.finalPrice).reduce((sum, current) => sum + current, 0),
                    },
                    monthSales: {
                        count: result[1].map(x => x.amount).reduce((sum, current) => sum + current, 0),
                        totalSale: result[1].map(x => x.amount * x.product.finalPrice).reduce((sum, current) => sum + current, 0),

                    },
                });
            })
            .finally(() =>
                setLoading(false)
            );
    };

    useEffect(() => {
        getPrms()
    }, [])

    return (
        <Container maxWidth={false} >
            {!loading ?
                (
                    <div className="flex flex-row flex-wrap">
                        <Box className="w-full xl:w-3/12 text-center">
                            <div className="bg-white rounded-lg overflow-hidden m-2">
                                <div className="bg-orange-200 p-4">
                                    <h1> فروش ۲۴ ساعت گذشته</h1>
                                </div>
                                <p className="p-8 text-xl font-extrabold"> {
                                    numeral(prms.todaySales.totalSale)
                                }
                                    <span className="font-light"> ریال</span>
                                </p>
                            </div>
                        </Box>
                        <Box className="w-full xl:w-3/12 text-center">
                            <div className="bg-white rounded-lg overflow-hidden m-2">
                                <div className="bg-orange-200 p-4">
                                    <h1>مقدار وزن فروش رفته 24 ساعت</h1>
                                </div>
                                <p className="p-8 text-lg font-extrabold"> {
                                    numeral(prms.todaySales.count)
                                }
                                    <span className="font-light"> کیلوگرم</span>
                                </p>
                            </div>
                        </Box>
                        <Box className="w-full xl:w-3/12 text-center">
                            <div className="bg-white rounded-lg overflow-hidden m-2">
                                <div className="bg-blue-200 p-4">
                                    <h1> فروش در یک ماه اخیر</h1>
                                </div>
                                <p className="p-8 text-xl font-extrabold"> {
                                    numeral(prms.monthSales.totalSale)
                                }
                                    <span className="font-light"> ریال</span>
                                </p>
                            </div>
                        </Box>
                        <Box className="w-full xl:w-3/12 text-center">
                            <div className="bg-white rounded-lg overflow-hidden m-2">
                                <div className="bg-blue-200 p-4">
                                    <h1>مقدار وزن فروش رفته در یک ماه </h1>
                                </div>
                                <p className="p-8 text-lg font-extrabold"> {
                                    numeral(prms.monthSales.count)
                                }
                                    <span className="font-light"> کیلوگرم</span>
                                </p>
                            </div>
                        </Box>
                    </div>

                ) :
                (
                    <div className="mt-5">
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </div>
                )
            }
        </Container >
    );
}


export default Dashboard