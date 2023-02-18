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
  const [isTimeUp, setIsTimeUp] = useState<boolean>();
  
  const endTime = useMemo(
    () => typeof deadline === 'string' ? new Date(deadline) : deadline,
    [deadline]
  );

  const duration = useMemo(
    () => intervalToDuration({ start: now, end: endTime }), 
    [now, endTime]
  );

  useEffect(() => {
    if (isBefore(now, endTime)) {
      setIsTimeUp(false);
    } else {
      setIsTimeUp(true);
    }
  }, [endTime, now]);

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