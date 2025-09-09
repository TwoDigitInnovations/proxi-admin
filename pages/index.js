import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

export default function Home() {
  return (
    <section className="w-full h-full  bg-transparent md:pt-5 pt-5 pb-5 pl-5 pr-5">
      <div className='md:pt-[0px] pt-[0px] h-full'>
        {/* overflow-scroll no-scrollbar */}
        <p className="text-[var(--custom-black)] font-bold md:text-[32px] text-2xl">Dashboard</p>
        {/* mt-5  */}
        <div className="md:pb-10">
          <section className="bg-transparent md:px-5 md:py-5 py-5 h-full w-full">
            <div className="grid md:grid-cols-4 grid-cols-1 w-full gap-5">

              <div className="w-full bg-white boxShadow p-5 rounded-[20px]">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-[var(--custom-black)] text-base font-normal">Total User</p>
                    <p className="text-[var(--custom-black)] md:text-[28px] text-xl font-bold pt-2">40,689</p>
                  </div>
                  <img className="md:w-[60px]  w-[50px] md:h-[60px] h-[50px]" src="/totalUserImg.png" />
                </div>
                <div className="md:pt-5 pt-3 flex justify-start items-center">
                  <img className="w-[20px] h-[12px] " src="/totalUserImg-1.png" />
                  <p className="text-base font-normal text-[var(--custom-green)] ml-3">8.5%<span className="text-[var(--custom-black)] ml-2">Up from yesterday</span></p>
                </div>
              </div>

              <div className="w-full bg-white boxShadow p-5 rounded-[20px]">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-[var(--custom-black)] text-base font-normal">Total Profit</p>
                    <p className="text-[var(--custom-black)] md:text-[28px] text-xl font-bold pt-2">10293</p>
                  </div>
                  <img className="md:w-[60px]  w-[50px] md:h-[60px] h-[50px]" src="/totalProfitImg.png" />
                </div>
                <div className="md:pt-5 pt-3 flex justify-start items-center">
                  <img className="w-[20px] h-[12px] " src="/totalUserImg-1.png" />
                  <p className="text-base font-normal text-[var(--custom-green)]  ml-3">1.3%<span className="text-[var(--custom-black)] ml-2">Up from past week</span></p>
                </div>
              </div>

              <div className="w-full bg-white boxShadow p-5 rounded-[20px]">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-[var(--custom-black)] text-base font-normal">Total transactions</p>
                    <p className="text-[var(--custom-black)] md:text-[28px] text-xl font-bold pt-2">$89,000</p>
                  </div>
                  <img className="md:w-[60px]  w-[50px] md:h-[60px] h-[50px]" src="/totalTransactionsImg.png" />
                </div>
                <div className="md:pt-5 pt-3 flex justify-start items-center">
                  <img className="w-[20px] h-[12px] " src="/totalTransactionsImg-1.png" />
                  <p className="text-base font-normal text-custom-lightRed ml-3">4.3%<span className="text-[var(--custom-black)] ml-2">Down from yesterday</span></p>
                </div>
              </div>

              <div className="w-full bg-white boxShadow p-5 rounded-[20px]">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-[var(--custom-black)] text-base font-normal">Queries</p>
                    <p className="text-[var(--custom-black)] md:text-[28px] text-xl font-bold pt-2">12599</p>
                  </div>
                  <img className="md:w-[60px]  w-[50px] md:h-[60px] h-[50px]" src="/queriesImg.png" />
                </div>
              </div>

            </div>

            {/* <img className="w-full h-[444px]" src="/totalTransactionsImg-2.png" /> */}
          </section>
        </div>

      </div>
    </section>
  );
}
