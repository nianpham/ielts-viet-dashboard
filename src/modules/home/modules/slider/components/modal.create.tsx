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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UploadService } from "@/services/upload";
import { Loader, Plus } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import "@/styles/hide-scroll.css";
import { SliderService } from "@/services/sliders";

export function ModalCreateSlider() {
  const { toast } = useToast();
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mainPreview, setMainPreview] = useState<string | null>(null);

  const handleMainImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn. Vui lòng chọn file nhỏ hơn 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setMainPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateMainImage = () => {
    mainImageInputRef.current?.click();
  };

  const validateForm = () => {
    if (!mainPreview) {
      toast({
        variant: "destructive",
        title: "Vui lòng chọn hình ảnh.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    const uploadMainImage: any = await UploadService.uploadToCloudinary([
      mainPreview,
    ]);

    const body = {
      image: uploadMainImage[0]?.url || "",
    };
    await SliderService.createSlider(body);
    setIsLoading(false);

    window.location.href = "/?tab=slider";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-orange-700"
        >
          <Plus size={16} className="mr-2" /> Thêm hình ảnh
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <span className="!text-[20px]">Thêm hình ảnh mới</span>
          </DialogTitle>
          <DialogDescription>
            <span className="!text-[16px]">
              Tải lên hình ảnh và nhấn{" "}
              <strong className="text-orange-700">Lưu</strong> để chèn hình ảnh
              mới vào slider.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="w-full grid grid-cols-1 gap-8">
          <div className="col-span-1">
            <div className="mb-6">
              <Label htmlFor="thumbnail" className="text-right !text-[16px]">
                Hình ảnh
              </Label>
              <div className="mt-2">
                {!mainPreview && (
                  <div
                    onClick={handleUpdateMainImage}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-5 py-16 text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-primary-700 cursor-pointer"
                  >
                    <div className="flex flex-col items-center">
                      <span>+ Tải hình lên</span>
                      <span className="text-xs text-gray-500">
                        hoặc kéo thả file vào đây
                      </span>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={mainImageInputRef}
                  onChange={handleMainImageChange}
                  accept="image/*"
                  className="hidden"
                />
                {mainPreview && (
                  <div className="mt-2">
                    <Image
                      src={mainPreview}
                      alt="main-preview"
                      className="w-full rounded-md mt-2"
                      width={1000}
                      height={1000}
                    />
                    <div
                      onClick={handleUpdateMainImage}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-5 py-3 mt-5 text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-primary-700 cursor-pointer"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">
                          Thay đổi hình ảnh
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="!px-10 !text-[16px]"
            >
              Huỷ
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="!px-10 !text-[16px]"
          >
            Lưu
            {isLoading && <Loader className="animate-spin" size={48} />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
