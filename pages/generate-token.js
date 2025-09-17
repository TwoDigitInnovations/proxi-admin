import isAuth from '@/components/isAuth';
import React, { useState } from 'react'

function GenerateToken() {
    const [generateTokenData, setGenerateTokenData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        purposeOfvisit: "",
    })

    const createGenerateToke = async (e) => {
        e.preventDefault();

        const data = {
            name: generateTokenData?.name,
            email: generateTokenData?.email,
            phone: generateTokenData?.phone,
            gender: generateTokenData?.gender,
            purposeOfvisit: generateTokenData?.purposeOfvisit,
        }
        console.log(data);
        console.log(generateTokenData);
        // return
        props.loader(true);
        Api("post", "createProduct", data, router).then(
            (res) => {
                props.loader(false);
                console.log("res================> category ", res);
                if (res.status) {
                    setAddProductsData({
                        name: "",
                        category_type: "",
                        category: [],
                        price: "",
                        offer: "",
                        short_description: "",
                        gender: "",
                        long_description: "",
                        price_slot: [
                            {
                                value: 0,
                                price: 0,
                            },
                        ],
                    });
                    setvarients([
                        {
                            color: "",
                            image: [],
                            selected: [],
                        },
                    ]);
                    router.push("/products");
                    props.toaster({ type: "success", message: res.data?.message });
                } else {
                    props.toaster({ type: "error", message: res?.data?.message });
                }
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
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

                    <div className="md:col-span-2 w-full">
                        <textarea
                            className="bg-white w-full pl-5 pr-5 py-2 border border-[#85808033] rounded-[10px] outline-none text-[#797979D9] text-base font-normal"
                            rows={4}
                            placeholder="Purpose of Visit"
                            value={generateTokenData.purposeOfvisit}
                            onChange={(e) =>
                                setGenerateTokenData({
                                    ...generateTokenData,
                                    purposeOfvisit: e.target.value,
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
        </section>
    )
}

export default isAuth(GenerateToken);
