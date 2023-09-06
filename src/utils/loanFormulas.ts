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
function calculateMonthlyPayment({
  P,
  r,
  n,
}: {
  P: number;
  r: number;
  n: number;
}) {
  const PMT = (r * P) / (1 - Math.pow(1 + r, -n));

  return PMT;
}
function calculateLoanTerm({
  P,
  PMT,
  r,
}: {
  P: number;
  PMT: number;
  r: number;
}) {
  const n = -Math.log(1 - (r * P) / PMT) / Math.log(1 + r);

  return n;
}

export { calculateLoanBalance, calculateMonthlyPayment, calculateLoanTerm };
