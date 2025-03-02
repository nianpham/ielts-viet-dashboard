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
import { HELPER } from "@/utils/helper";

interface TimekeepingItem {
  _id: string;
  account_id: string;
  check_in: string;
  check_out: string;
  status: string;
  created_at: string;
}

export function ModalStatisticDay({
  data,
  teacherDay,
  teacherMonth,
}: {
  data: any;
  teacherDay: any;
  teacherMonth: any;
}) {
  const [currentMonth, setCurrentMonth] = useState<number>(0);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    setCurrentMonth(currentMonth);
  }, [data, teacherMonth, setCurrentMonth]);
  const [currentYear, setCurrentYear] = useState<number>(0);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setCurrentYear(currentYear);
  }, [data, setCurrentYear]);

  const [isDay, setIsDay] = useState<boolean>(true);

  const [statsDay, setStatsDay] = useState<{
    totalItems: number;
    lateItems: number;
    enoughItems: number;
  }>({ totalItems: 0, lateItems: 0, enoughItems: 0 });

  const [currentDay, setCurrentDay] = useState<string>("");

  const calculateTimekeepingStats = (timekeeping: TimekeepingItem[]) => {
    const ONE_HOUR_THIRTY_MINUTES = 90 * 60 * 1000;

    const stats = timekeeping.reduce(
      (acc, item) => {
        const checkInTime = new Date(item.check_in).getTime();
        const checkOutTime = new Date(item.check_out).getTime();
        const duration = checkOutTime - checkInTime;

        if (duration < ONE_HOUR_THIRTY_MINUTES) {
          acc.lateItems += 1;
        } else {
          acc.enoughItems += 1;
        }
        acc.totalItems += 1;

        return acc;
      },
      { totalItems: 0, lateItems: 0, enoughItems: 0 }
    );

    return stats;
  };

  useEffect(() => {
    const currentDateTime = new Date().toISOString();

    setCurrentDay(HELPER.formatCurrentDate(currentDateTime));

    if (teacherDay && data) {
      const stats = calculateTimekeepingStats(teacherDay?.timekeeping);

      setStatsDay(stats);
    }
  }, [data, teacherDay]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="">
          Xem thống kê
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] max-h-[100vh] overflow-hidden"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {isDay ? (
              <span className="!text-[20px]">
                Thống kê làm việc ngày {currentDay}
              </span>
            ) : (
              <span className="!text-[20px]">
                Thống kê làm việc tháng {currentMonth}/{currentYear}
              </span>
            )}
          </DialogTitle>
          <DialogDescription>
            <span className="!text-[16px]">
              Thông tin tổng số ca làm việc theo ngày và tháng
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-row gap-3">
          <Button
            variant="outline"
            className={`${isDay ? "bg-gray-100" : "bg-white"} border-gray-300`}
            onClick={() => setIsDay(true)}
          >
            Thống kê ngày
          </Button>
          <Button
            variant="outline"
            className={`${!isDay ? "bg-gray-100" : "bg-white"} border-gray-300`}
            onClick={() => setIsDay(false)}
          >
            Thống kê tháng
          </Button>
        </div>

        {isDay && (
          <div className="w-full grid grid-cols-1 gap-8 max-h-[70vh] overflow-y-auto scroll-bar-style">
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="flex flex-row justify-start items-center gap-5 w-full mt-2">
                <Image
                  src={teacherDay?.teacher_avatar}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="font-semibold text-xl">
                    {teacherDay?.teacher_name}
                  </div>
                  <div className="font-semibold text-md text-gray-500">
                    {teacherDay?.role}
                  </div>
                </div>
              </div>
              <div className="mt-2 font-bold">
                Thông tin số ca làm việc trong ngày {currentDay}
              </div>
              <div className="w-full mb-0">
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
                        {statsDay.totalItems}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {statsDay.enoughItems}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {statsDay.lateItems}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-2 font-bold">
                Thông tin chi tiết trong ngày
              </div>
              <div className="w-full mb-5">
                {teacherDay.timekeeping.length > 0 ? (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-200 p-2 text-left">
                          STT
                        </th>
                        <th className="border border-gray-200 text-green-600 p-2 text-left">
                          Giờ check in
                        </th>
                        <th className="border border-gray-200 text-red-600 p-2 text-left">
                          Giờ check out
                        </th>
                        <th className="border border-gray-200 p-2 text-left">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {teacherDay?.timekeeping?.map(
                        (item: any, index: number) => (
                          <tr key={index}>
                            <td className="border border-gray-200 p-2">
                              {index + 1}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {HELPER.formatDate2(item?.check_in)}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {HELPER.formatDate2(item?.check_out)}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {HELPER.getTimekeepingStatus(
                                item?.check_in,
                                item?.check_out
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  <div className="w-full flex justify-center items-center text-gray-500">
                    Giáo viên chưa có ca làm việc trong ngày
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!isDay && (
          <div className="w-full grid grid-cols-1 gap-8">
            <div className="flex flex-col justify-start items-start gap-4 overflow-auto h-full">
              <div className="flex flex-row justify-start items-center gap-5 w-full mt-2">
                <Image
                  src={teacherMonth?.teacher_avatar}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="font-semibold text-xl">
                    {teacherMonth?.teacher_name}
                  </div>
                  <div className="font-semibold text-md text-gray-500">
                    {teacherMonth?.role}
                  </div>
                </div>
              </div>
              <div className="mt-2 font-bold">
                Thông tin số ca làm việc trong tháng {currentMonth}/
                {currentYear}
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
                        {teacherMonth?.timekeeping?.total_shift}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {teacherMonth?.timekeeping?.enough_shift}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {teacherMonth?.timekeeping?.error_shift}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
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
