"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  interface DeliveryNotification {
    catNames: string;
    userName: string;
    totalPrice: number;
    freeGift: boolean;
  }

  const [data, setData] = useState<DeliveryNotification>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const hasFreeGift = data?.freeGift === true;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:3000/comms/your-next-delivery/f268af24-51ac-4694-b840-870829cdef8e"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log(data);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("API call failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-row  items-center place-content-between justify-items-center min-h-screen sm:p-20 bg-slate-50 text-black ">
      {hasFreeGift && (
        <div className="absolute top-60 right-56 bg-pink-300 text-yellow-900 font-bold text-sm px-2 py-1 rounded transform rotate-6 shadow-lg">
          FREE GIFT
        </div>
      )}
      {isLoading ? (
        <div>Page loading...</div>
      ) : (
        <div className="grow max-w-sm w-6/12 lg:max-w-full lg:flex border mx-40 rounded">
          <Image
            width="339"
            height={"244"}
            src="/cat-food.jpg"
            alt="Image of cats eating"
          />

          <div className="rounded-b lg:rounded-b-none lg:rounded-r  flex flex-col justify-between leading-normal pl-6 bg-white">
            <div className="mb-8 mx-10">
              <div className="text-green-700 font-bold text-xl mb-2 mt-10">
                Your next delivery for {data?.catNames}
              </div>
              <p className="text-zinc-600 text-base">
                Hey {data?.userName}! In two days' time, we'll be charging you
                for your next order for {data?.catNames}'s fresh food.
              </p>
              <p className="text-gray-700 text-base my-3">
                Total price: £{data?.totalPrice}
              </p>
              <div className="flex flex-row gap-5">
                <button className="bg-green-700 rounded text-white w-1/3 h-10 sm:h-9 sm:w-36">
                  SEE DETAILS
                </button>
                <button className="text-green-700 rounded bg-white w-1/3 h-10 border-green-700 border sm:h-9 sm:w-36">
                  EDIT DELIVERY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
