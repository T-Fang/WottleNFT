export interface CountdownTime {
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
}

export const defaultRemainingTime: CountdownTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};
