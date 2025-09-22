import isAuth from '@/components/isAuth';
import { Api } from '@/services/service';
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { IoCloseCircleOutline } from "react-icons/io5";

function GenerateToken(props) {
    const router = useRouter();
    const [serviceProviderData, setServiceProviderData] = useState([]);
    const [generateTokenData, setGenerateTokenData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        purpose_of_visit: "",
        service: "",
    })
    const [viewPopup, setviewPopup] = useState(false)

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

    const createGenerateToke = async (e) => {
        e.preventDefault();

        const data = {
            name: generateTokenData?.name,
            email: generateTokenData?.email,
            phone: generateTokenData?.phone,
            gender: generateTokenData?.gender,
            purpose_of_visit: generateTokenData?.purpose_of_visit,
            service: generateTokenData?.service,
        }
        console.log(data);
        console.log(generateTokenData);
        // return
        props.loader(true);
        Api("post", "appointment/createAppointment", data, router).then(
            (res) => {
                props.loader(false);
                console.log("res================> category ", res);
                if (res.status) {
                    setviewPopup(true);
                    setGenerateTokenData({
                        name: "",
                        email: "",
                        phone: "",
                        gender: "",
                        purpose_of_visit: "",
                        service: "",
                    });
                    // props.toaster({ type: "success", message: "Appointment added successfully" });
                }
                // else {
                //     props.toaster({ type: "error", message: res?.data?.message });
                // }
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
    };

    return (
        <section className=" w-full h-full bg-transparent md:pt-5 pt-5 pb-5 pl-5 pr-5">
            <p className="font-bold  text-black md:text-[32px] text-2xl">Generate Token</p>

            <div className='px-5 pt-5 pb-5 bg-white rounded-[10px] md:mt-5 mt-5 border border-[var(--custom-newGray)]'>
                <form className='grid md:grid-cols-2 grid-cols-1 w-full gap-5' onSubmit={createGenerateToke}>
                    <input className='bg-white w-full md:h-[45px] h-[40px] border border-[#85808033] rounded-[10px] outline-none px-5 text-[#797979D9] text-base font-normal' placeholder='Enter Name' type='text'
                        value={generateTokenData.name}
                        onChange={(e) => {
                            setGenerateTokenData({
                                ...generateTokenData,
                                name: e.target.value,
                            });
                        }}
                        required
                    />

                    <input className='bg-white w-full md:h-[45px] h-[40px] border border-[#85808033] rounded-[10px] outline-none px-5 text-[#797979D9] text-base font-normal' placeholder='Enter Email' type='email'
                        value={generateTokenData.email}
                        onChange={(e) => {
                            setGenerateTokenData({
                                ...generateTokenData,
                                email: e.target.value,
                            });
                        }}
                        required
                    />

                    <input className='bg-white w-full md:h-[45px] h-[40px] border border-[#85808033] rounded-[10px] outline-none px-5 text-[#797979D9] text-base font-normal' placeholder='Enter Mobile Number' type='number'
                        value={generateTokenData.phone}
                        onChange={(e) => {
                            setGenerateTokenData({
                                ...generateTokenData,
                                phone: e.target.value,
                            });
                        }}
                        required
                    />

                    <div className="px-3 w-full bg-white border border-[#85808033] rounded-[10px]">
                        <select
                            value={generateTokenData.gender}
                            onChange={(newValue) => {
                                console.log(newValue)
                                setGenerateTokenData({
                                    ...generateTokenData,
                                    gender: newValue.target.value,
                                });
                            }}
                            required
                            className="bg-white w-full md:h-[45px] h-[40px] pr-5  outline-none text-[#797979D9] text-base font-normal"
                            placeholder="Gender"
                        >
                            <option value="" className="p-5">
                                Gender
                            </option>
                            <option value="Male" className="p-5">
                                Male
                            </option>
                            <option value="Female" className="p-5">
                                Female
                            </option>
                        </select>
                    </div>

                    <div className="px-3 w-full bg-white border border-[#85808033] rounded-[10px] md:col-span-2">
                        <select
                            value={generateTokenData.service}
                            onChange={(newValue) => {
                                console.log(newValue)
                                setGenerateTokenData({
                                    ...generateTokenData,
                                    service: newValue.target.value,
                                });
                            }}
                            required
                            className="bg-white w-full md:h-[45px] h-[40px] pr-5  outline-none text-[#797979D9] text-base font-normal"
                            placeholder="Service"
                        >
                            <option value="" className="p-5">
                                Service
                            </option>
                            {serviceProviderData?.map((item, i) => (<option key={i} value={item._id} className="p-5">
                                {item.name}
                            </option>))}
                        </select>
                    </div>

                    <div className="md:col-span-2 w-full">
                        <textarea
                            className="bg-white w-full pl-5 pr-5 py-2 border border-[#85808033] rounded-[10px] outline-none text-[#797979D9] text-base font-normal"
                            rows={4}
                            placeholder="Purpose of Visit"
                            value={generateTokenData.purpose_of_visit}
                            onChange={(e) =>
                                setGenerateTokenData({
                                    ...generateTokenData,
                                    purpose_of_visit: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div className='md:col-span-2 flex justify-center items-center'>
                        <button className='bg-[var(--custom-newOrange)] md:w-[335px] w-full md:h-[50px] h-[40px] rounded-[10px] boxShadowGenerateToken text-white text-base font-normal' type="submit">Pay Token Amount</button>
                    </div>
                </form>
            </div>

            {viewPopup && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="relative w-full max-w-md bg-white shadow-2xl overflow-hidden">
                        <IoCloseCircleOutline
                            className="text-black h-8 w-8 absolute right-2 top-2"
                            onClick={handleClose}
                        />
                        <div className='md:p-10 p-5 flex flex-col justify-center items-center'>
                            <img className='md:w-[148px] w-[100px] md:h-[148px] h-[100px] rounded-full' src='image-1.png' />
                            <p className='text-black md:text-2xl text-xl font-semibold'>Paid Successful</p>
                            <p className='text-black text-base font-normal text-center mt-2'>Your ticket is generated you will receive it on the mail you mentioned !</p>
                            <button className='bg-[var(--custom-newOrange)] md:w-[80px] w-full md:h-[50px] h-[40px] rounded-[10px] boxShadowGenerateToken text-white text-base font-normal mt-5' onClick={handleClose}>Ok</button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    )
}

export default isAuth(GenerateToken);
