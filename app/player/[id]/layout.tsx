import Nav from "@/components/For-You/Nav";
import Searchbar from "@/components/For-You/Searchbar";
import { ReduxProvider } from "@/redux/provider";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <div className="wrapper">
        <Nav audioNav={true} />
        <Searchbar />
        {children}
      </div>
    </ReduxProvider>
  );
}
