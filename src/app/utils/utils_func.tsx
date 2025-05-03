



export const currencyFormatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}


export function removeDuplicates(arr: any[]) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }