import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main
        className={`h-full flex w-full flex-col`}
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
