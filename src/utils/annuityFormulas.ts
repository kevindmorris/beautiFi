function calculateAnnuityOrdinaryPV({
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
  const PV = P + PMT * ((1 - Math.pow(1 + r, -n)) / r);

  return PV;
}
function calculateAnnuityOrdinaryFV({
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
  const FV = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);

  return FV;
}

function calculateAnnuityDuePV({
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
  const PV = (P + PMT * ((1 - Math.pow(1 + r, -n)) / r)) * (1 + r);

  return PV;
}
function calculateAnnuityDueFV({
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
  const FV =
    P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

  return FV;
}

export {
  calculateAnnuityDuePV,
  calculateAnnuityDueFV,
  calculateAnnuityOrdinaryPV,
  calculateAnnuityOrdinaryFV,
};
