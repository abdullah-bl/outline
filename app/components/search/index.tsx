import { Form, useNavigate } from "@remix-run/react";

export default function Search() {
  const navigate = useNavigate();
  const search = (e: any) => navigate(`?q=${e.target.value}`);
  return (
    <Form className="w-full flex justify-center items-center m-2 border-b p-2 mx-auto">
      <input
        name="q"
        type={"search"}
        className="rounded-full w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-slate-50 text-black px-4"
        onChange={search}
        placeholder="Search in title or content"
      />
    </Form>
  );
}
