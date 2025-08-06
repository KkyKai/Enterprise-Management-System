// pages/api/protected.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";


export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json({ message: "You are authenticated", user: session.user });
}
