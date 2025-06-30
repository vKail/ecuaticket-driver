import { ScanQrView } from "@/features/qr-reader/presentation/view/scan-qr-view";
import { UserHeader } from "@/features/user/presentation/componets/user-header";

export default function QrReaderPage() {
  return (
    <main className="flex flex-col items-center w-full px-4">
      <UserHeader />
      <ScanQrView />
    </main>
  );
}
