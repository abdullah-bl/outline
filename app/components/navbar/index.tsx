import {
  DimensionsIcon,
  FileIcon,
  HomeIcon,
  BookmarkIcon,
  StackIcon,
  GearIcon,
  FileTextIcon,
  PieChartIcon,
} from "@radix-ui/react-icons";
import { useLocation } from "@remix-run/react";
import { NavbarItem } from "./NavbarItem";

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="w-full">
      <ul className="flex space-x-4 py-2 overflow-x-scroll">
        <NavbarItem
          active={pathname === "/"}
          to="/"
          icon={<HomeIcon />}
          label={"Home"}
        />
        <NavbarItem
          active={pathname.includes("/posts")}
          to="/posts"
          icon={<BookmarkIcon />}
          label={"Posts"}
        />
        <NavbarItem
          active={pathname.includes("/tasks")}
          to="/tasks"
          icon={<FileTextIcon />}
          label={"Tasks"}
        />
        <NavbarItem
          active={pathname.includes("/budget")}
          to="/budget"
          icon={<PieChartIcon />}
          label={"Budget"}
        />
        <NavbarItem
          active={pathname.includes("/items")}
          to="/items"
          icon={<StackIcon />}
          label={"Items"}
        />
        <NavbarItem
          active={pathname.includes("/projects")}
          to="/projects"
          icon={<DimensionsIcon />}
          label={"Projects"}
        />

        <NavbarItem
          active={pathname.includes("/reports")}
          to="/reports"
          icon={<FileIcon />}
          label={"Reports"}
        />
        <NavbarItem
          active={pathname.includes("/settings")}
          to="/settings"
          icon={<GearIcon />}
          label={"Settings"}
        />
      </ul>
    </nav>
  );
}
