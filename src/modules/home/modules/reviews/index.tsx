/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
// import { ModalCreateBlog } from "./modal.create";
// import { ModalUpdateBlog } from "./modal.update";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
// import { BlogService } from "@/services/blog";
import { HELPER } from "@/utils/helper";
import { ReviewService } from "@/services/review";
import { IMAGES } from "@/utils/image";
import { ModalUpdateReview } from "./components/modal.update";
import { ModalCreateReviews } from "./components/modal.create";

export interface Review {
  _id: string;
  created_at: string;
  comment: string;
  name: string;
  overall: number;
  rating: number;
  school: string;
  avatar: string;
}

export default function Review() {
  const COUNT = 6;

  const [data, setData] = useState<Review[]>([] as any);
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

  const prevPage = () => {
    if (currenPage > 1) {
      selectPage(currenPage - 1);
    }
  };

  const nextPage = () => {
    if (currenPage < totalPage) {
      selectPage(currenPage + 1);
    }
  };

  const init = async () => {
    try {
      const res = await ReviewService.getAll();

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
      console.error("Error fetching review data:", error);
      setData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {}, [totalPage, isLoading, currenData, currenPage]);

  return (
    <section className="p-4">
      <div className="relative overflow-hidden">
        <div className="flex">
          <div className="flex items-start flex-1">
            <h5>
              <span className="text-gray-800 text-[20px] font-bold">
                DANH SÁCH ĐÁNH GIÁ ({data?.length})
              </span>
            </h5>
          </div>
          <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
            <ModalCreateReviews />
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-md text-gray-700 uppercase bg-gray-50 border dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="w-64 px-4 py-3">
                  HỌC VIÊN
                </th>
                <th scope="col" className="w-32 px-4 py-3">
                  ĐÁNH GIÁ
                </th>
                <th scope="col" className="w-80 px-4 py-3">
                  NỘI DUNG
                </th>
                <th scope="col" className="w-32 px-4 py-3">
                  OVERALL
                </th>
                <th scope="col" className="w-24 px-4 py-3">
                  NGÀY ĐĂNG
                </th>
                <th scope="col" className="w-24 px-4 py-3">
                  CHI TIẾT
                </th>
              </tr>
            </thead>
            <tbody>
              {currenData?.map((item: any, index: any) => {
                return (
                  <tr
                    key={index}
                    className={`${
                      item?.deleted_at ? "hidden" : ""
                    } border-b border-l border-r dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <td className="w-64 px-4 py-2 grid grid-cols-12 gap-3 items-center">
                      <Image
                        src={item?.avatar}
                        alt="img"
                        className="w-20 h-20 mr-3 object-cover col-span-6 rounded-full"
                        width={1000}
                        height={1000}
                      />
                      <span className="col-span-6 text-[14px] line-clamp-2 bg-primary-100 text-gray-900 font-medium py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                        {item?.name}
                      </span>
                    </td>
                    <td className="pl-10 w-32 px-4 py-2">
                      <span className="text-[14px] line-clamp-2 bg-primary-100 text-gray-900 font-medium py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                        {item?.rating}
                      </span>
                    </td>
                    <td className="w-40 px-4 py-2">
                      <span className="text-[14px] bg-primary-100 text-gray-900 font-medium py-0.5 rounded dark:bg-primary-900 dark:text-primary-300 line-clamp-3">
                        {item?.comment}
                      </span>
                    </td>
                    <td className="pl-10 w-32 text-[14px] px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item?.overall}
                    </td>
                    <td className="w-24 text-[14px] px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {HELPER.formatDate(item?.created_at)}
                    </td>
                    <td className="w-24 text-[14px] px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <ModalUpdateReview data={item} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {isLoading ? (
          <div className="w-full flex justify-center items-center pt-60">
            <Loader className="animate-spin" size={48} />
          </div>
        ) : currenData.length === 0 ? (
          <div className="col-span-2 text-center w-full flex justify-center items-center py-4">
            <p className="text-gray-500 text-lg">
              Không tìm thấy bài viết nào.
            </p>
          </div>
        ) : (
          <nav
            className="flex flex-col items-start justify-center mt-4 p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <button
                  onClick={prevPage}
                  disabled={currenPage === 1}
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
              {Array.from({ length: totalPage }, (_, i) => i + 1)?.map(
                (item: any, index: any) => {
                  return (
                    <li key={index} onClick={() => selectPage(item)}>
                      <a
                        href="#"
                        className={`${
                          item === currenPage ? "bg-orange-100" : "bg-white"
                        } flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      >
                        {item}
                      </a>
                    </li>
                  );
                }
              )}
              <li>
                <button
                  onClick={nextPage}
                  disabled={currenPage === totalPage}
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
