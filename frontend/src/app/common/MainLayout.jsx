import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-[62px] pb-[50px] ">{children}</main>
      <Footer />
    </>
  );
};
