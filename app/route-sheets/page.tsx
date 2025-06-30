import { RouteSheetsView } from "@/features/route-sheets/presentation/view/route-sheets-view";
import { UserHeader } from "@/features/user/presentation/componets/user-header";

const RouteSheetsPage = () => {
  return (
    <main className="flex flex-col items-center w-full px-4">
      <UserHeader />
      <RouteSheetsView />
    </main>
  );
};

export default RouteSheetsPage; 