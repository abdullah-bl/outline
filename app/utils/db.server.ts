import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient()
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
  }
  db = global.__db;
}

export { db };



// import DataStore from 'nedb'



// export const db = {
//   settings: new DataStore({ filename: './data/settings.db', autoload: true }),
//   posts: new DataStore({ filename: 'db/posts.db', autoload: true, timestampData: true }),
//   comments: new DataStore({ filename: 'db/comments.db', autoload: true, timestampData: true }),
//   status: new DataStore({ filename: 'db/status.db', autoload: true, timestampData: true }),
//   chapters: new DataStore({ filename: 'db/chapters.db', autoload: true, timestampData: true }),
//   items: new DataStore({ filename: 'db/items.db', autoload: true, timestampData: true }),
//   projects: new DataStore({ filename: 'db/projects.db', autoload: true, timestampData: true }),
//   tasks: new DataStore({ filename: 'db/tasks.db', autoload: true, timestampData: true }),
//   users: new DataStore({ filename: 'db/users.db', autoload: true, timestampData: true }),
// }


// db.posts.ensureIndex({ fieldName: 'id', unique: true })
// db.comments.ensureIndex({ fieldName: 'id', unique: true })
// db.status.ensureIndex({ fieldName: 'id', unique: true })
// db.chapters.ensureIndex({ fieldName: 'id', unique: true })
// db.items.ensureIndex({ fieldName: 'id', unique: true })
// db.projects.ensureIndex({ fieldName: 'id', unique: true })
// db.tasks.ensureIndex({ fieldName: 'id', unique: true })
// db.users.ensureIndex({ fieldName: 'id', unique: true })

