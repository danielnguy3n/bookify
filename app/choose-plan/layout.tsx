import Footer from "@/components/Home/Footer";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="wrapper wrapper__full">
      {children}
      <Footer />
    </div>
  );
}
