import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const client = await connectToDatabase();
    const db = await client.db("setlinks");
    const collection = await db.collection("links");
    const doc = await collection.findOne({handle:body.handle});
   
    if (doc) {
        return NextResponse.json({ "message": "Handle already exists" }, { status: 400 });
    }
    await collection.insertOne(body);
    return NextResponse.json({ "message": "Link added","handle":body.handle }, { status: 200 });
}