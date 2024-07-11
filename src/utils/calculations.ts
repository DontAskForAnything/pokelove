export function convertDecimeters(decimeters: number) {
  const meters = Math.floor(decimeters / 10);
  const centimeters = (decimeters % 10) * 10;

  let result = "";

  if (meters > 0) {
    result += `${meters} m`;
  }

  if (centimeters > 0) {
    if (result !== "") result += " ";
    result += `${centimeters} cm`;
  }

  return result;
}

export function convertHectograms(hectograms: number) {
  const kilograms = Math.floor(hectograms / 10);
  const grams = (hectograms % 10) * 100;

  let result = "";

  if (kilograms > 0) {
    result += `${kilograms} kg`;
  }

  if (grams > 0) {
    if (result !== "") result += " ";
    result += `${grams} g`;
  }

  return result;
}
