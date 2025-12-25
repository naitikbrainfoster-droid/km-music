import { NavLink } from "react-router-dom";

const Section = ({ title, children }) => (
  <div className="mb-8">
    <p className="text-[11px] text-gray-500 uppercase mb-3 tracking-widest">
      {title}
    </p>
    <div className="space-y-1">{children}</div>
  </div>
);

const Item = ({ to, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `
      flex items-center gap-3 px-4 py-2 rounded-lg text-sm
      transition-all duration-200
      ${
        isActive
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
          : "text-gray-300 hover:bg-[#1f1f1f] hover:text-white"
      }
      `
    }
  >
    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-70" />
    {label}
  </NavLink>
);

const AdminSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#0b0b0b] border-r border-[#222] flex flex-col">
      
      {/* LOGO / TITLE */}
      <div className="px-6 py-6 border-b border-[#222]">
        <h2 className="text-xl font-bold text-white">
          KM Admin
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Control Panel
        </p>
      </div>

      {/* SCROLLABLE MENU */}
      <div className="flex-1 overflow-y-auto px-5 py-6 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">

        {/* BOARD */}
        <Section title="Board">
          <Item to="/admin/dashboard" label="Overview" />
        </Section>

        {/* ENQUIRY */}
        <Section title="Enquiry">
          <Item to="/admin/enquiry" label="View Enquiry" />
        </Section>

        {/* ARTISTS */}
        <Section title="Artists">
          <Item to="/admin/artists/add" label="Add Artist" />
          <Item to="/admin/artists/view" label="View Artists" />
        </Section>

        {/* SONGS */}
        <Section title="Songs">
          <Item to="/admin/songs/add" label="Add Song" />
          <Item to="/admin/songs/" label="View Songs" />
        </Section>

        {/* UPCOMING SONGS */}
        <Section title="Upcoming Songs">
          <Item to="/admin/upcoming/add" label="Add Upcoming" />
          <Item to="/admin/upcoming/" label="View Upcoming" />
        </Section>

        {/* USERS (LAST) */}
        <Section title="Users">
          <Item to="/admin/users/register" label="Register User" />
          <Item to="/admin/users" label="View Users" />
        </Section>

      </div>
    </aside>
  );
};

export default AdminSidebar;
