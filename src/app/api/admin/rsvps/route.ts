import MongoDatabase from "@/lib/database";
import { isAllowedIp } from "@/lib/utils/request";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

async function ensureAllowed(request: Request) {
  if (!isAllowedIp(request.headers)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  return null;
}

export async function GET(request: Request) {
  const forbidden = await ensureAllowed(request);
  if (forbidden) return forbidden;

  const dbInstance = await MongoDatabase.getInstance();
  const database = dbInstance.getDatabase();

  const rsvps = await database
    .collection("wedding_rsvps")
    .find({}, { sort: { submittedAt: -1 } })
    .limit(100)
    .toArray();

  const formatted = rsvps.map((item) => ({
    id: item._id?.toString() ?? "",
    name: item.name,
    attendance: item.attendance,
    guestsCount: item.guestsCount,
    soloTable: item.soloTable,
    message: item.message,
    submittedAt: item.submittedAt,
  }));

  const stats = formatted.reduce(
    (acc, current) => {
      acc.total += 1;
      if (current.attendance === "attending") acc.attending += 1;
      if (current.attendance === "maybe") acc.maybe += 1;
      if (current.attendance === "not_attending") acc.declined += 1;
      if (current.soloTable === "yes") acc.soloYes += 1;
      if (typeof current.guestsCount === "number") {
        acc.guests += current.guestsCount;
      }
      return acc;
    },
    { total: 0, attending: 0, maybe: 0, declined: 0, soloYes: 0, guests: 0 },
  );

  return NextResponse.json({ rsvps: formatted, stats });
}

export async function DELETE(request: Request) {
  const forbidden = await ensureAllowed(request);
  if (forbidden) return forbidden;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Missing id" }, { status: 400 });
  }

  const dbInstance = await MongoDatabase.getInstance();
  const database = dbInstance.getDatabase();

  await database.collection("wedding_rsvps").deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ success: true });
}
