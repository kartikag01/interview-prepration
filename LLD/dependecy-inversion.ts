
class ShoppingCartService {
    discountService: DiscountService;

    constructor(discountService: DiscountService) {
        this.discountService = discountService;
    }

    checkout(): number {
        const discount = this.discountService.getDiscount();
        let total = 1250;
        return total - discount;
    }
}

interface DiscountService {
    getDiscount(): number;
}

class DiscountServiceImpl implements DiscountService {
    getDiscount() {
        return 10;
    }
}

function clientCode() {
    const scs = new ShoppingCartService(new DiscountServiceImpl());
    let subTotal = scs.checkout();
    console.log(subTotal);

}

clientCode();

// OUTPUT:
// 1150