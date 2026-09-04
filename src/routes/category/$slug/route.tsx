import { Outlet, createFileRoute } from "@tanstack/react-router";

/** Layout shell so /category/$slug and /category/$slug/page/$page can nest cleanly. */
export const Route = createFileRoute("/category/$slug")({
  component: () => <Outlet />,
});
