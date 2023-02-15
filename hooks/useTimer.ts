import { useEffect, useState } from "react";
import type { Duration } from "date-fns";
import { intervalToDuration, isBefore } from "date-fns";

const pad = (num?: number) => (num?.toString().padStart(2, '0') ?? '00');

export const useTimer = (deadline: Date) => {
  const [now, setNow] = useState(new Date());
  const [duration, setDuration] = useState<Duration>();
  const [isTimeUp, setIsTimeUp] = useState<boolean>();
  const [endTime, setEndTime] = useState<Date>();
  const [time, setTime] = useState<string>();

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
    if (duration) {
      setTime(`${pad(duration.days)} : ${pad(duration.hours)} : ${pad(duration.minutes)} : ${pad(duration.seconds)}`)
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
    return { time, duration, isTimeUp, endTime };
  }

  return {
    time,
    duration,
    isTimeUp,
    endTime,
    now
  };
}