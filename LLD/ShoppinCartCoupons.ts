// 1. Each Product can have multiple coupons.
// 2. Find Toal

interface Product {
    getPrice(): number;
    setPrice(price: number): void;
    getType(): ProductTypes;
}

class ProductItem implements Product {
    name: string;
    type: ProductTypes;
    price: number;

    constructor(name: string, type: ProductTypes, price: number) {
        this.name = name;
        this.type = type;
        this.price = price;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number): void {
        this.price = price;
        console.log("this.price", this.price);
    }

    getType(): ProductTypes {
        return this.type;
    }
}

enum ProductTypes {
    BOOKS,
    CLOTHS,
    HOME_DECORE,
}

abstract class Coupon {
    nextCoupon: Coupon;

    public getNext(): Coupon {
        return this.nextCoupon;
    }
    public setNext(value: Coupon) {
        this.nextCoupon = value;
    }

    abstract apply(sc: ShoppingCart): void;

}

class CouponAll extends Coupon {
    static DISCOUNT: number = 0.10;

    apply(shoppingCart: ShoppingCart): void {
        for (let item of shoppingCart.productList) {
            item.setPrice(item.getPrice() - item.getPrice() * CouponAll.DISCOUNT);
        }
        if (this.nextCoupon) {
            this.nextCoupon.apply(shoppingCart);
        }
    }
}

class CouponNext extends Coupon {
    static DISCOUNT: number = 0.25;
    apply(shoppingCart: ShoppingCart): void {
        for (let index = 0; index < shoppingCart.productList.length; index++) {
            let item = shoppingCart.productList[index];
            if (index === 1) {
                item.setPrice(item.getPrice() - item.getPrice() * CouponNext.DISCOUNT);
            }
        }
        if (this.nextCoupon) {
            this.nextCoupon.apply(shoppingCart);
        }
    }
}

class CouponType extends Coupon {
    static DISCOUNT: number = 0.15;

    eligibleType: ProductTypes[] = [
        ProductTypes.BOOKS,
    ];

    apply(shoppingCart: ShoppingCart): void {
        for (let index = 0; index < shoppingCart.productList.length; index++) {
            let item: Product = shoppingCart.productList[index];
            if (this.eligibleType.includes(item.getType())) {
                item.setPrice(item.getPrice() - item.getPrice() * CouponType.DISCOUNT);
            }
        }
        if (this.nextCoupon) {
            this.nextCoupon.apply(shoppingCart);
        }
    }
}

class ShoppingCart {

    productList: Array<Product>;

    constructor() {
        this.productList = [];
    }

    addToCart(product: Product) {
        this.productList.push(product);
    }

    getTotal(): Number {
        let totalPrice: number = 0;
        for (let p of this.productList) {
            totalPrice = totalPrice + p.getPrice();
        }
        return totalPrice;
    }
}

function main() {
    let p1 = new ProductItem("Yellow Tshirt", ProductTypes.CLOTHS, 40);
    let p2 = new ProductItem("System Design Book", ProductTypes.BOOKS, 60);
    let p3 = new ProductItem("Novel", ProductTypes.BOOKS, 6);

    let cart = new ShoppingCart();
    cart.addToCart(p1);
    cart.addToCart(p2);
    cart.addToCart(p3);

    let couponAll: Coupon = new CouponAll();
    let couponNext: Coupon = new CouponNext();
    let couponType: Coupon = new CouponType();
    couponAll.setNext(couponNext);
    couponNext.setNext(couponType);

    couponAll.apply(cart);

    console.log(cart.getTotal());
}

main();