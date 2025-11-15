import MongoDatabase from "@/lib/database";
import { NextResponse } from "next/server";

const attendanceOptions = new Set(["attending", "maybe", "not_attending"]);
const soloTableOptions = new Set(["yes", "no"]);

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "잘못된 요청입니다." },
        { status: 400 },
      );
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const attendance =
      typeof body.attendance === "string" ? body.attendance : "";
    const guestsCountRaw = body.guestsCount;
    const soloTable = typeof body.soloTable === "string" ? body.soloTable : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name) {
      return NextResponse.json(
        { message: "이름을 입력해 주세요." },
        { status: 400 },
      );
    }

    if (!attendanceOptions.has(attendance)) {
      return NextResponse.json(
        { message: "참석 여부를 선택해 주세요." },
        { status: 400 },
      );
    }

    if (!soloTableOptions.has(soloTable)) {
      return NextResponse.json(
        { message: "솔로 테이블 참여 여부를 선택해 주세요." },
        { status: 400 },
      );
    }

    const guestsCountNumber = Number(guestsCountRaw ?? 0);
    if (!Number.isFinite(guestsCountNumber) || guestsCountNumber < 0) {
      return NextResponse.json(
        { message: "동행 인원은 0 이상의 숫자로 입력해 주세요." },
        { status: 400 },
      );
    }

    const guestsCount = Math.min(Math.floor(guestsCountNumber), 20);

    const sanitizedMessage = message ? message.slice(0, 1000) : "";

    const dbInstance = await MongoDatabase.getInstance();
    const database = dbInstance.getDatabase();

    await database.collection("wedding_rsvps").insertOne({
      name,
      attendance,
      guestsCount,
      message: sanitizedMessage,
      soloTable,
      submittedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to process wedding RSVP", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
