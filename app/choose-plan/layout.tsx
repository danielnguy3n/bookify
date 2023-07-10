import Footer from "@/components/Home/Footer";
import { ReduxProvider } from "@/redux/provider";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="wrapper wrapper__full">
      <ReduxProvider>{children}</ReduxProvider>
      <Footer />
    </div>
  );
}
