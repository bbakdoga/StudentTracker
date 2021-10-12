

// Calculates time period string from periods and years
const calcTimePeriod = (data) => {
  return (
    data.start_period +
    " " +
    data.start_year +
    (data.end_period
      ? data.start_period + data.start_year == data.end_period + data.end_year
        ? ""
        : " - " + data.end_period + " " + data.end_year
      : " - Present")
  );
};

export default calcTimePeriod;