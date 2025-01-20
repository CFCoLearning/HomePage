import { CheckMark } from "./check-mark";

interface AttendanceRecord {
  username: string;
  dates: boolean[];
}

const attendanceData: AttendanceRecord[] = [
  {
    username: "echozyr2001",
    dates: [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
  },
  {
    username: "YamKH514",
    dates: [
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
    ],
  },
  {
    username: "DriveFLY",
    dates: [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
    ],
  },
  {
    username: "ArchSerein",
    dates: [
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
    ],
  },
  {
    username: "DemoJustLuGuo",
    dates: [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
    ],
  },
  {
    username: "RisingGalaxy",
    dates: [
      true,
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      true,
      false,
    ],
  },
  {
    username: "AmberHeart",
    dates: [
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
    ],
  },
  {
    username: "Yinko",
    dates: [
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      false,
    ],
  },
  {
    username: "Kirov7",
    dates: [
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
    ],
  },
];

export function RecordTable() {
  const dates = Array.from(
    { length: 21 },
    (_, i) => `1.${String(i + 6).padStart(2, "0")}`
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-2 py-2 text-left text-sm font-medium text-gray-600">
              Username
            </th>
            {dates.map((date) => (
              <th
                key={date}
                className="whitespace-nowrap px-1 py-2 text-center text-sm font-medium text-gray-600"
              >
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record) => (
            <tr key={record.username}>
              <td className="whitespace-nowrap px-2 py-1 text-sm font-medium text-gray-900">
                {record.username}
              </td>
              {record.dates.map((checked, index) => (
                <td key={index} className="px-1 py-1">
                  <CheckMark checked={checked} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
