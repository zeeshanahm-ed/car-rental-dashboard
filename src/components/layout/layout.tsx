import { Outlet } from 'react-router-dom';

import Header from './components/header';
import SidebarRoutes from './components/sidebar-routes';
import { HeaderPropsProvider } from '../core/use-header-props';

function Layout() {


  return (
    <HeaderPropsProvider>
      <div className="h-screen w-full overflow-hidden flex flex-col">

        {/* ================= HEADER ON TOP ================= */}
        <header className="h-16 border-b bg-background border-border-gray z-40 fixed top-0 left-0 right-0 flex items-center px-6">
          <Header />
        </header>

        {/* Wrapper below header */}
        <div className="flex flex-1 pt-16 relative">

          {/* ================= SIDEBAR ================= */}
          <aside style={{ boxShadow: '0px 7px 28px 0px #0105110F' }} className="w-72 h-[calc(100vh-64px)] fixed left-0 top-14 bg-[#F9F9F9] z-30 overflow-hidden overflow-y-auto">
            <SidebarRoutes />
          </aside>


          {/* ================= MAIN CONTENT ================= */}
          <main className="ml-72 w-[calc(100%-288px)] h-[calc(100vh-64px)] overflow-y-auto px-6 py-5" >
            <Outlet />
          </main>

        </div>
      </div>
    </HeaderPropsProvider>

  );
}

export default Layout;
