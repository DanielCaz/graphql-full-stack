import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <header className="navbar bg-base-100 shadow-sm">
        <Link to="/" className="btn btn-ghost text-xl">
          GraphQL Frontend
        </Link>
      </header>
      <Outlet />
    </React.Fragment>
  );
}
