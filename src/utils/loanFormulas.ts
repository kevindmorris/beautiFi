function calculateLoanBalance({
  P,
  PMT,
  r,
  n,
}: {
  P: number;
  PMT: number;
  r: number;
  n: number;
}) {
  const FV = P * Math.pow(1 + r, n) - PMT * ((Math.pow(1 + r, n) - 1) / r);

  return FV;
}

export { calculateLoanBalance };
