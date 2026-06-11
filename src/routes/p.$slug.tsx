import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy /p/slug URLs → redirect to /slug */
export const Route = createFileRoute("/p/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$slug",
      params: { slug: params.slug },
    });
  },
});
