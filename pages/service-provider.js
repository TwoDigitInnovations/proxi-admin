import React, { useEffect, useMemo, useState } from 'react'
import Table, { index } from '@/components/table'
import { Api } from '@/services/service';
import { useRouter } from "next/router";
import moment from 'moment';
import Dialog from "@mui/material/Dialog";
import { IoCloseCircleOutline } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Navigation } from 'swiper/modules';
import isAuth from '@/components/isAuth';

function ServiceProvider(props) {
    const router = useRouter();
    const [serviceProviderData, setServiceProviderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewPopup, setviewPopup] = useState(false)
    const [popupData, setPopupData] = useState({});
    const [driverdata, setdriverdata] = useState([]);
    const [currentIndex, setCuurentIndex] = useState(0)
    const [pagination, setPagination] = useState({
        totalPages: 1,
        currentPage: 1,
        itemsPerPage: 10,
    });

    useEffect(() => {
        getProvider();
    }, []);

    const getProvider = async () => {
        props.loader(true);
        Api("get", "auth/getProvider", "", router).then(
            (res) => {
                props.loader(false);
                console.log("res================> form data :: ", res);
                setServiceProviderData(res.data);
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    const handleClose = () => {
        setviewPopup(false);
        setPopupData({})
        setdriverdata([])
    };

    const updateVerifyandSuspendStatus = async (id, status) => {
        // return
        props.loader(true);
        Api("post", 'auth/updateVerifyandSuspendStatus', { id, status }, router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                setviewPopup(false);
                getProvider();
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }

    // function indexID({ value }) {
    //     return (
    //         <div>
    //             <p className="text-[var(--custom-black)] text-base font-normal text-center">
    //                 {value}
    //             </p>
    //         </div>
    //     );
    // }

    function name({ value }) {
        return (
            < div>
                <p className='text-[var(--custom-black)] text-base font-normal text-center'>{value}</p>
            </div>
        )
    }

    function email({ value }) {
        return (
            < div>
                <p className='text-[var(--custom-black)] text-base font-normal text-center'>{value}</p>
            </div>
        )
    }

    function date({ value }) {
        return (
            <div>
                <p className='text-[var(--custom-black)] text-base font-normal text-center'>{moment(value).format('DD MMM YYYY')}</p>
            </div>
        )
    }

    function mobile({ value }) {
        return (
            < div>
                <p className='text-[var(--custom-black)] text-base font-normal text-center'>{value}</p>
            </div>
        )
    }

    function status({ value }) {
        return (
            < div>
                <p className='text-[var(--custom-black)] text-base font-normal text-center'>{value}</p>
            </div>
        )
    }

    const info = ({ value, row }) => {
        console.log(row.original)
        return (
            <div className=" p-4  flex items-center  justify-center">
                <button className="h-[38px] w-[93px] bg-[#2048BD20]  text-[var(--custom-newBlue)] text-base	font-normal rounded-[8px]"
                    onClick={() => {
                        setviewPopup(true);
                        setPopupData(row.original)
                        setdriverdata(row.original?.document)
                    }}
                >See</button>
            </div>
        );
    };

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                // accessor: "indexNo",
                Cell: index,
            },
            {
                Header: "NAME",
                accessor: 'name',
                Cell: name
            },
            {
                Header: "E-mail",
                accessor: 'email',
                Cell: email
            },
            {
                Header: "DATE",
                accessor: 'createdAt',
                Cell: date
            },
            {
                Header: "Mobile",
                accessor: 'phone',
                Cell: mobile
            },
            {
                Header: "Status",
                accessor: 'status',
                Cell: status
            },
            {
                Header: "Info",
                // accessor: "view",
                Cell: info,
            },
        ],
        [pagination]
    );



    return (
        <section className=" w-full h-full bg-transparent md:pt-5 pt-5 pb-5 pl-5 pr-5">
            <p className="font-bold  text-black md:text-[32px] text-2xl">Service Provider</p>

            <div className='bg-white border mt-5 border-[var(--custom-offWhite)] w-full md:h-[70px] rounded-[10px] md:py-0 py-5 md:px-0 px-5'>
                <div className='md:grid md:grid-cols-10 grid-cols-1 w-full h-full '>
                    <div className='flex md:justify-center justify-start items-center md:border-r md:border-r-[var(--custom-offWhite)]'>
                        <img className='w-[20px] h-[23px]' src='/filterImg.png' />
                    </div>
                    <div className='flex md:justify-center justify-start items-center md:border-r md:border-r-[var(--custom-offWhite)] md:pt-0 pt-5 md:pb-0 pb-3'>
                        <p className='text-[var(--custom-black)] text-sm	font-bold'>Filter By</p>
                    </div>
                    <div className='col-span-8 flex md:flex-row flex-col md:justify-between justify-start md:items-center items-start'>
                        <div className='flex items-center'>
                            <lable className="text-[var(--custom-black)] md:pl-3 font-semibold text-sm">Date</lable>
                            <input className='text-[var(--custom-black)] pl-3' type='date' placeholder='Date'
                            // value={selctDate}
                            // onChange={(e) => {
                            //     setSelctDate(e.target.value);
                            //     getInTouch(e.target.value)
                            // }}
                            />
                        </div>
                        {/* <button className="h-[38px] w-[93px] bg-[#00000020] text-black text-base	font-normal rounded-[8px] md:mr-5 md:mt-0 mt-5" onClick={() => { getInTouch(); setSelctDate('') }}>Reset</button> */}
                    </div>
                </div>
            </div>

            <section className='px-5 pt-5 md:pb-32 pb-28 bg-white h-full rounded-[12px] overflow-scroll no-scrollbar md:mt-5 mt-5'>

                {viewPopup && (
                    <Dialog open={viewPopup} onClose={handleClose} maxWidth='md'>
                        <div className="p-5  bg-white relative overflow-hidden">
                            <IoCloseCircleOutline
                                className="text-black h-8 w-8 absolute right-2 top-2"
                                onClick={handleClose}
                            />
                            <div className="md:flex justify-between border-b-2 border-b-gray-300 py-2">
                                <div className="">

                                    <div className="md:flex flex-row justify-start items-start">
                                        {/* <Avatar
                                            // alt={singleData.username}
                                            // src={singleData.profile}
                                            sx={{ width: 60, height: 60 }}
                                        /> */}

                                        <img className='w-[76px] h-[76px] rounded-full' src={popupData?.profile} />

                                        <div className="flex flex-col justify-start items-start md:pl-5">
                                            <p className="text-base font-bold text-[var(--custom-black)] md:pt-0 pt-2">{popupData?.name}</p>
                                            <p className="text-base font-semibold text-[var(--custom-newBlack)] pt-2">{popupData?.email}</p>
                                            <p className="text-sm font-semibold text-[var(--custom-black)] pt-2">{popupData?.phone}</p>
                                        </div>
                                    </div>

                                </div>

                                {<div className="flex md:justify-center justify-start items-center min-w-[400px] md:border-l-2 md:border-l-gray-300 ">
                                    <div className="flex flex-col justify-start items-start md:pl-5 w-[50%]">
                                        <div className="flex justify-between items-center w-full md:pt-0 pt-2">
                                            <p className="text-sm font-normal text-[var(--custom-black)]">Total Rides</p>
                                            <p className="text-sm font-normal text-[var(--custom-black)]">80</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full pt-2">
                                            <p className="text-sm font-normal text-[var(--custom-black)]">Total earning</p>
                                            <p className="text-sm font-normal text-[var(--custom-black)]">150</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full pt-2">
                                            <p className="text-sm font-normal text-[var(--custom-black)]">Truck Type</p>
                                            <p className="text-sm font-normal text-[var(--custom-black)]">8 tyre</p>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <p className="text-[var(--custom-black)] text-base font-bold pt-2">
                                Uploaded Document
                            </p>


                            <Swiper navigation={true} modules={[Navigation]} className="mySwiper mt-5 md:w-[880px] w-68" onRealIndexChange={(newindex) => setCuurentIndex(newindex.activeIndex)} onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}>
                                {driverdata?.map((item, i) => (<SwiperSlide onKeyUpCapture={i}>
                                    <div className="w-full flex justify-center">
                                        <div className="md:w-80 md:h-64 w-60 h-48 relative rounded-lg">
                                            <img
                                                src={item}
                                                alt="icon"
                                                layout="responsive"
                                                className="rounded-sm md:w-80 md:h-64 w-60 h-48"
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>))}

                            </Swiper>

                            <div className="md:h-12">
                                <div className="flex  mt-5  justify-center  gap-5">
                                    {popupData?.status != 'Verified' &&
                                        <button className='text-white text-lg font-bold w-[274px] h-[50px] rounded-[12px] bg-[var(--custom-darkGreen)]'
                                            onClick={() => {
                                                updateVerifyandSuspendStatus(popupData?._id, "Verified");
                                            }}
                                        >Verify</button>}
                                    {popupData?.status != 'Suspended' &&
                                        <button className='text-white text-lg font-bold w-[274px] h-[50px] rounded-[12px] bg-[var(--custom-orange)]'
                                            onClick={() => {
                                                updateVerifyandSuspendStatus(popupData?._id, "Suspended");
                                            }}
                                        >Suspend</button>}
                                </div>

                            </div>

                        </div>
                    </Dialog>
                )}

                <div className=''>
                    <Table columns={columns}
                        data={serviceProviderData}
                        pagination={pagination}
                        onPageChange={(page) => setCurrentPage(page)}
                        currentPage={currentPage}
                        itemsPerPage={pagination.itemsPerPage} />
                </div>
            </section>
        </section>
    )
}

export default isAuth(ServiceProvider);
