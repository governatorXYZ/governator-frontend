import { useEffect, useState, useMemo } from "react";
import type { Duration } from "date-fns";
import { intervalToDuration, isBefore } from "date-fns";

export type Timer = {
  duration?: Duration;
  isTimeUp?: boolean;
  endTime?: Date;
  now?: Date;
}

export const useTimer = (deadline: Date | string): Timer => {
  const [now, setNow] = useState(new Date());
  
  const endTime = useMemo(
    () => typeof deadline === 'string' ? new Date(deadline) : deadline,
    [deadline]
  );

  const duration = useMemo(
    () => intervalToDuration({ start: now, end: endTime }), 
    [now, endTime]
  );

  const isTimeUp = useMemo(
    () => !isBefore(now, endTime),
    [now, endTime]
  );

  // Update the timer every second, if the time is not up.
  useEffect(() => {
    if (!isTimeUp) {
      const interval = setInterval(() => {
        setNow(new Date());
      }, 1000);

      return () => {
        clearInterval(interval);
      }
    }
  }, [setNow, isTimeUp]);

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