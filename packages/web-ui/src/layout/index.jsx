import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import Sidebar from "./SideNav";
import { NavigationBlockProvider } from "../utils-hooks/useNavigationBlocker";

export default function Layout() {
  return (
    <Router>
      <NavigationBlockProvider>
        <div className="flex flex-row w-full h-full">
          <div className="w-[50px] md:w-[100px] z-10 absolute md:static">
            <Sidebar />
          </div>
          <div className="w-full md:w-[calc(100%-100px)] h-full">
            <AppRouter />
          </div>
        </div>
      </NavigationBlockProvider>
    </Router>
  );
}
