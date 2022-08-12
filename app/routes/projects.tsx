import type { Project } from "@prisma/client";
import { InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Container } from "~/components/container";
import {
  ListItemLink,
  ListView,
  ListViewDetails,
  ListViewItem,
  ListViewLayout,
} from "~/components/listView";
import Search from "~/components/search";
import { Heading } from "~/components/text";
import { db } from "~/utils/db.server";

const getProjects = async (q?: string): Promise<Project[]> =>
  await db.project.findMany({
    where: { active: true },
    orderBy: {
      createdAt: "desc",
    },
  });
type LoaderData = Awaited<ReturnType<typeof getProjects>>;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") as string) || "";
  return json<LoaderData>(await getProjects(q));
};

export default function Index() {
  const projects = useLoaderData<LoaderData>();
  const [filtered, setFiltered] = useState<Project[]>(projects);
  const { pathname } = useLocation();
  // const search = (e: any) => {
  //   const s = e.target.value.toLocaleLowerCase().trim();
  //   s
  //     ? setFiltered(
  //         projects.filter(
  //           (project: Project) =>
  //             project.name.toLocaleLowerCase().includes(s) ||
  //             project.description?.includes(s) ||
  //             project.slug?.includes(s)
  //         ) as any
  //       )
  //     : setFiltered(projects as any);
  // };
  return (
    <>
      <Container>
        <Heading>Projects</Heading>
        <Search />
        {/* <hr /> */}
        <Outlet />
      </Container>
    </>
  );
}
