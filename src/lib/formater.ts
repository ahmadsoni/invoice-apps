  export const formatRupiah = (value: number): string => {
    const data = new Intl.NumberFormat("id-ID").format(Math.abs(value));
    return data === "NaN" ? "0" : data;
  };