import type { Post } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Container } from "~/components/container";
import Posts from "~/components/posts";
import { Heading } from "~/components/text";
import { db } from "~/utils/db.server";

const getPosts = async (q?: string): Promise<Post[]> =>
  await db.post.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      published: true,
      OR: [
        {
          title: {
            contains: q,
          },
        },
        {
          content: {
            contains: q,
          },
        },
      ],
    },
  });

type LoaderData = Awaited<ReturnType<typeof getPosts>>;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") as string) || "";
  return json<LoaderData>(await getPosts(q));
};

export default function Index() {
  const posts = useLoaderData<LoaderData>();
  return (
    <Container>
      <div className="flex justify-between items-center">
        <Heading> Posts </Heading>
        <Form className="w-1/2">
          <input
            aria-label="search"
            type={"search"}
            name="q"
            className="rounded-full w-full bg-slate-50 text-black px-4"
          />
        </Form>
        <Link to={"./new"}> New Post </Link>
      </div>
      <Posts posts={posts} />
    </Container>
  );
}
