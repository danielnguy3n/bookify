import Nav from "@/components/For-You/Nav";
import Searchbar from "@/components/For-You/Searchbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="wrapper">
      <Nav audioNav={false}/>
      <Searchbar />
      {children}
    </div>
  );
}
