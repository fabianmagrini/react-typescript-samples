import { type NavItem, getNavItems, subscribe } from '@mfe-demo/nav-registry';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const [items, setItems] = useState<NavItem[]>(getNavItems);

  useEffect(() => {
    return subscribe(() => setItems(getNavItems()));
  }, []);

  return (
    <nav className="nav-shell">
      <span className="nav-brand">MFE Demo</span>
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
