"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import "@/styles/hide-scroll.css";

export function ModalStatisticMonth({
  data,
  teacher,
}: {
  data: any;
  teacher: any;
}) {
  const [currentMonth, setCurrentMonth] = useState<number>(0);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    setCurrentMonth(currentMonth);
  }, [data, teacher]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-32">
          Thống kê tháng
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] max-h-[80vh]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <span className="!text-[20px]">
              Thống kê làm việc tháng {currentMonth}
            </span>
          </DialogTitle>
          <DialogDescription>
            <span className="!text-[16px]">
              Thông tin thống kê tổng số ca làm việc trong tháng {currentMonth}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="w-full grid grid-cols-1 gap-8">
          <div className="flex flex-col justify-start items-start gap-4 overflow-auto h-full">
            <div className="flex flex-row justify-start items-center gap-5 w-full mt-2">
              <Image
                src={teacher?.teacher_avatar}
                alt=""
                width={1000}
                height={1000}
                className="w-20 h-20 object-cover rounded-full"
              />
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="font-semibold text-xl">
                  {teacher?.teacher_name}
                </div>
                <div className="font-semibold text-md text-gray-500">
                  {teacher?.role}
                </div>
              </div>
            </div>
            <div className="mt-2 font-bold">
              Thông tin số ca làm việc trong tháng {currentMonth}
            </div>
            <div className="w-full mb-5">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-2 text-left">
                      Tổng số ca làm việc
                    </th>
                    <th className="border border-gray-200 text-green-600 p-2 text-left">
                      Số ca làm việc đủ giờ
                    </th>
                    <th className="border border-gray-200 text-red-600 p-2 text-left">
                      Số ca làm việc thiếu giờ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-2">
                      {teacher?.timekeeping?.total_shift}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {teacher?.timekeeping?.enough_shift}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {teacher?.timekeeping?.error_shift}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <DialogFooter className="w-full !flex !flex-row !justify-between !items-center">
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="!px-10 !text-[16px]"
              >
                Đóng
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
