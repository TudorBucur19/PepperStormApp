export const formatMinutesRo = (totalMinutes: number): string => {
  const n = Number.isFinite(totalMinutes)
    ? Math.max(0, Math.trunc(totalMinutes))
    : 0;

  const noun = (m: number): string => {
    switch (true) {
      case m === 1:
        return "minut";
      case m === 0:
        return "minute"; // "0 minute"
      case m >= 20:
        return "de minute"; // "20 de minute", "21 de minute", etc.
      default:
        return "minute"; // 2–19 minute
    }
  };

  if (n < 60) {
    return `${n} ${noun(n)}`;
  } else {
    const h = Math.floor(n / 60);
    const m = n % 60;

    if (m === 0) {
      return `${h}h`; // e.g. "2h"
    } else {
      return `${h}h:${String(m).padStart(2, "0")} ${noun(m)}`; // "1h:05 minut", "1h:20 de minute"
    }
  }
};
