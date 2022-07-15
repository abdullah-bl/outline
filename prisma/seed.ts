import { PrismaClient } from "@prisma/client";
import type { Prisma } from '@prisma/client'

const db = new PrismaClient();


const getPosts = (): Prisma.PostCreateInput[] => {
  return [
    {
      id: '1',
      title: "Post 1",
      content: "Content 1",
      pinned: true,

    },
    {
      id: '2',
      title: "Post 2",
      content: "Content 2",
    },
  ]
}

const getComments = (): Prisma.CommentCreateInput[] => {
  return [
    {
      id: '1',
      content: "Comment for Post 2",
      post: {
        connect: {
          id: '1'
        }
      }
    },
    {
      id: '2',
      content: "Comment for Post 2",
      post: {
        connect: {
          id: '2'
        }
      }
    },
  ]
}

const getStatus = (): Prisma.StatusCreateInput[] => {
  return [
    {
      id: '1',
      title: 'New Project'
    },
    {
      id: '2',
      title: 'New Item'
    },
    {
      id: '3',
      title: 'New Task'
    },
  ]
}

// const getDurations = (): Prisma.DurationCreateInput[] => {
//   return [
//     {
//       id: '1',
//       value: '180 day',
//     },
//     {
//       id: '2',
//       value: '360 day',
//     },
//     {
//       id: '3',
//       value: '720 day',
//     }
//   ]
// }


async function seed() {
  await Promise.all([
    getStatus().map(s => {
      return db.status.create({ data: s })
    }),
    getPosts().map((post) => {
      return db.post.create({ data: post })
    }),
    getComments().map((comment) => {
      return db.comment.create({ data: comment })
    }),

  ])
}







seed();

