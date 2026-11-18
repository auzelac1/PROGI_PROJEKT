export function eur(iznos) {
    return new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(iznos);
}