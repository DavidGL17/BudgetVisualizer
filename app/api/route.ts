import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

async function GET(request: NextRequest) {
  // get all statements from the database
  const statements = await prisma.statement.findMany();
  return Response.json(statements);
}

export { GET };
