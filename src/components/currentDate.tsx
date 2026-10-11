
import { connection } from "next/server";

export default async function CurrentDate() {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <p className="text-[11px] text-gray-500">
      {date}
    </p>
  );
}
