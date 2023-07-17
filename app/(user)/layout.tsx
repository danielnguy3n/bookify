import Nav from "@/components/Global/Nav";
import Searchbar from "@/components/Global/Searchbar";
import SidebarOverlay from "@/components/Global/SidebarOverlay";
import { ReduxProvider } from "@/redux/provider";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <div className="wrapper">
        <SidebarOverlay />
        <Nav audioNav={false} />
        
        <Searchbar />
        {children}
      </div>
    </ReduxProvider>
  );
}
