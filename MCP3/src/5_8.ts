import promptSync from 'prompt-sync';

function calculateDiscount(unitPrice: number, quantity: number, discountRates: { minItems: number, discount: number }[]): { totalPrice: number, discountAmount: number, savings: number, totalPriceWithoutDiscount: number } {
    let discountRate = 0;

    // Ordenar as faixas de desconto para garantir que estejam em ordem crescente de minItems
    discountRates.sort((a, b) => a.minItems - b.minItems);

    // Encontrar o desconto aplicável com base na quantidade de itens
    for (const rate of discountRates) {
        if (quantity >= rate.minItems) {
            discountRate = rate.discount;
        } else {
            break;
        }
    }

    const totalPriceWithoutDiscount = unitPrice * quantity;
    const discountAmount = totalPriceWithoutDiscount * (discountRate / 100);
    const totalPriceWithDiscount = totalPriceWithoutDiscount - discountAmount;
    const savings = discountAmount;

    return {
        totalPrice: totalPriceWithDiscount,
        discountAmount: discountAmount,
        savings: savings,
        totalPriceWithoutDiscount: totalPriceWithoutDiscount
    };
}

function main() {
    const prompt = promptSync();

    const unitPrice = parseFloat(prompt('Digite o preço unitário do produto: '));
    const quantity = parseInt(prompt('Digite a quantidade de itens: '), 10);

    // Exemplo de faixas de desconto
    const discountRates = [
        { minItems: 4, discount: 5 },
        { minItems: 5, discount: 10 },
        { minItems: 6, discount: 15 },
        { minItems: 7, discount: 20 },
        { minItems: 8, discount: 25 },
        { minItems: 9, discount: 30 },
        { minItems: 10, discount: 35 },
        { minItems: 11, discount: 40 }
    ];

    const { totalPrice, discountAmount, savings, totalPriceWithoutDiscount } = calculateDiscount(unitPrice, quantity, discountRates);

    console.log(`Preço total sem desconto: R$ ${totalPriceWithoutDiscount.toFixed(2)}`);
    console.log(`Preço total com desconto: R$ ${totalPrice.toFixed(2)}`);
    console.log(`Valor do desconto aplicado: R$ ${discountAmount.toFixed(2)}`);
    console.log(`Economia do cliente: R$ ${savings.toFixed(2)}`);
}

main();

// import promptSync from 'prompt-sync';

// function calculateDiscount(unitPrice: number, quantity: number): { totalPrice: number, discountAmount: number, savings: number, totalPriceWithoutDiscount: number } {
//     let totalPriceWithoutDiscount = unitPrice * quantity;
//     let totalPriceWithDiscount = 0;
//     let discountAmount = 0;

//     for (let i = 1; i <= quantity; i++) {
//         if (i > 3) {
//             let discountRate = Math.min((i - 3) * 5, 40);
//             let discountedPrice = unitPrice * (1 - discountRate / 100);
//             totalPriceWithDiscount += discountedPrice;
//             discountAmount += unitPrice - discountedPrice;
//         } else {
//             totalPriceWithDiscount += unitPrice;
//         }
//     }

//     let savings = discountAmount;

//     return {
//         totalPrice: totalPriceWithDiscount,
//         discountAmount: discountAmount,
//         savings: savings,
//         totalPriceWithoutDiscount: totalPriceWithoutDiscount
//     };
// }

// function main() {
//     const prompt = promptSync();

//     const unitPrice = parseFloat(prompt('Digite o preço unitário do produto: '));
//     const quantity = parseInt(prompt('Digite a quantidade de itens: '), 10);

//     const { totalPrice, discountAmount, savings, totalPriceWithoutDiscount } = calculateDiscount(unitPrice, quantity);

//     console.log(`Preço total sem desconto: R$ ${totalPriceWithoutDiscount.toFixed(2)}`);
//     console.log(`Preço total com desconto: R$ ${totalPrice.toFixed(2)}`);
//     console.log(`Valor do desconto aplicado: R$ ${discountAmount.toFixed(2)}`);
//     console.log(`Economia do cliente: R$ ${savings.toFixed(2)}`);
// }

// main();
