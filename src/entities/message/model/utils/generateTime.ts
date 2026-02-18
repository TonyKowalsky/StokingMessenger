export const generateTime = () => {
  const now = new Date();
  return {
    time: now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    date: now.toISOString().split("T")[0],
  };
};
