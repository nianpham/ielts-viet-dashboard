/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { IMAGES } from "@/utils/image";
import { SliderService } from "@/services/sliders";
import Image from "next/image";

export default function Slider() {
  const COUNT = 12;

  const [data, setData] = useState([] as any);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currenPage, setCurrenPage] = useState<any>(1 as any);
  const [currenData, setCurrenData] = useState<any>([] as any);

  const selectPage = (pageSelected: any) => {
    setCurrenPage(pageSelected);
    const start = (pageSelected - 1) * COUNT;
    const end = pageSelected * COUNT;
    setCurrenData(data.slice(start, end));
  };

  const render = (data: any) => {
    setData(data);
    setTotalPage(Math.ceil(data.length / COUNT));
    setCurrenPage(1);
    setCurrenData(data.slice(0, COUNT));
  };

  const init = async () => {
    try {
      const res = await SliderService.getAll();
      if (Array.isArray(res) && res.length > 0) {
        setData(res);
        setTotalPage(Math.ceil(res.length / COUNT));
        setCurrenPage(1);
        setCurrenData(res.slice(0, COUNT));
        setIsLoading(false);
      } else {
        setData([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => { }, [totalPage, isLoading, currenData, currenPage]);

  return (
    <section className="p-4">
      <div className="relative overflow-hidden">
        <div className="flex">
          <div className="flex items-start flex-1">
            <h5>
              <span className="text-gray-800 text-[20px] font-bold">
                SLIDER TRANG CHỦ ({data?.length})
              </span>
              <div className="flex flex-wrap">
                {data?.map((item: any, index: any) => {
                  return (
                    <div key={index} className="w-52 h-52">
                      <div>hahahah</div>
                      <Image
                        src={item?.image}
                        alt="imgaaa"
                        width={1000}
                        height={1000}
                        className="w-full h-full"
                      />
                    </div>
                  )
                })}
              </div>
            </h5>
          </div>
        </div>
        {isLoading && data.length > 0 ? (
          <div className="w-full flex justify-center items-center pt-60">
            <Loader className="animate-spin" size={48} />
          </div>
        ) : (
          <nav
            className="flex flex-col items-start justify-center mt-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            {data.length > 0 ? (
              <div className="grid grid-cols-4">
                {data?.map((item: any, index: any) => {
                  <div key={index} className="w-52 h-52">
                    <Image
                      src={item?.image}
                      alt="imgaaa"
                      width={1000}
                      height={1000}
                      className="w-full h-full"
                    />
                  </div>;
                })}
              </div>
            ) : (
              <div className="mt-40">
                <Image
                  src={IMAGES.EMPTY}
                  alt="empty"
                  width={100}
                  height={100}
                />
              </div>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
