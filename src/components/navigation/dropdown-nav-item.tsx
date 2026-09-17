import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { NavLink } from "@/components/navigation/nav-data";

export function DropdownNavItem({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: NavLink[];
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-64 p-1.5">
          <NavigationMenuLink
            render={<Link href={href} />}
            closeOnClick
            className="font-medium text-foreground"
          >
            Overview
          </NavigationMenuLink>
          <div className="my-1.5 h-px bg-border" />
          {items.map((item) => (
            <NavigationMenuLink
              key={item.href}
              render={<Link href={item.href} />}
              closeOnClick
            >
              {item.label}
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
