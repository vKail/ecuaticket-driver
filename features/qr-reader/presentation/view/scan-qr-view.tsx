"use client";

import { UserHeader } from "@/features/user/presentation/componets/user-header";
import { QrScannerHtml5 } from "../components/scann-qr";

export const ScanQrView = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <UserHeader />

      <div className="flex-1 flex items-center justify-center p-4">
        <QrScannerHtml5 />
      </div>
    </div>
  );
};
