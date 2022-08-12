import type { Post, Task } from "@prisma/client";
import Posts from "../posts";



export default function Summary({ posts, tasks }: { posts?: Post[], tasks?: Task[] }) {
  console.log(posts, tasks);
  return (
    <div className="flex items-center gap-2 w-full overflow-y-scroll">
      <Posts posts={posts} /> 
      <Posts posts={posts} /> 
      <Posts posts={posts} /> 
      <Posts posts={posts} /> 
      <Posts posts={posts} /> 
      <Posts posts={posts} /> 
      <Posts posts={posts} /> 
      <Posts posts={posts} /> 
      <Posts posts={posts} /> 
      <Posts posts={posts} /> 
    </div>
  )
}