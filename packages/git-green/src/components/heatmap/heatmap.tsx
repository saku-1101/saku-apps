import { levels } from "@/components/constants/variables";
import type { ContributionCalendar, ContributionDay } from "@/components/types";
import { ContributionLevel } from "@/components/types/enums";
import styles from "./heatmap.module.css";
interface GraphProps extends React.ComponentProps<"div"> {
  data: ContributionCalendar;
  daysLabel?: boolean;
}

const newYearText = "Happy New Year 🎉 Go make the first contribution !";

function numberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function Heatmap(props: GraphProps) {
  const { data: calendar, daysLabel, ...rest } = props;

  const currentYear = new Date().getFullYear();
  const isNewYear =
    currentYear === calendar.year &&
    (new Date(currentYear, 0, 2).getTime() - Date.now()) /
      1000 /
      60 /
      60 /
      24 >=
      0;

  return (
    <div {...rest}>
      <div className="mb-2 text-sm">
        <span className="mr-2 italic">{calendar.year}:</span>
        {isNewYear && calendar.total === 0
          ? newYearText
          : `${numberWithCommas(calendar.total)} Contributions`}
      </div>

      <div className={styles.graph}>
        <ul className={styles.months}>
          <li>Jan</li>
          <li>Feb</li>
          <li>Mar</li>
          <li>Apr</li>
          <li>May</li>
          <li>Jun</li>
          <li>Jul</li>
          <li>Aug</li>
          <li>Sep</li>
          <li>Oct</li>
          <li>Nov</li>
          <li>Dec</li>
        </ul>

        {daysLabel && (
          <ul className={styles.days}>
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
        )}

        <ul className={`${styles.grids} ${styles.blocks}`}>
          {calendar.weeks.reduce<React.ReactElement[]>((blocks, week, i) => {
            let days = week.days;

            // the code below is to fill the missing days in the first and last week
            if (days.length < 7) {
              const fills = Array.from(
                Array(7 - days.length),
              ).map<ContributionDay>(() => ({
                level: ContributionLevel.Null,
              }));
              if (i === 0) {
                days = [...fills, ...week.days];
              } else {
                days = [...week.days, ...fills];
              }
            }

            days.forEach((day, j) => {
              blocks.push(
                // biome-ignore lint/suspicious/noArrayIndexKey: This is a heatmap, we need to use the index
                <li key={`${i}${j}`} data-level={levels[day.level]} />,
              );
            });

            return blocks;
          }, [])}
        </ul>
      </div>
    </div>
  );
}
