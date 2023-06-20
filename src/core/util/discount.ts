export function calcDiscount(price: number, discountPrice: number) {
    return Math.round(100 - (discountPrice / price) * 100);
}
