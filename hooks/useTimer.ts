import { useEffect, useState } from "react";
import type { Duration } from "date-fns";
import { intervalToDuration, isBefore } from "date-fns";

export const useTimer = (deadline: Date) => {
  const [now, setNow] = useState(new Date());
  const [duration, setDuration] = useState<Duration>();
  const [isTimeUp, setIsTimeUp] = useState<boolean>();
  const [endTime, setEndTime] = useState<Date>();

  useEffect(() => {
    setEndTime(deadline);
    if (isBefore(now, deadline)) {
      setIsTimeUp(false);
      setDuration(intervalToDuration({
        start: now,
        end: deadline
      }))
    } else {
      setIsTimeUp(true);
      setDuration({ years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [setNow]);


  if (isTimeUp) {
    return { duration, isTimeUp, endTime };
  }

  return {
    duration,
    isTimeUp,
    endTime,
    now
  };
}