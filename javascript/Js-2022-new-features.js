// .at
[1, 2, 3].at(-1);
"hello".at(-1);


Object.hasOwneProperty();// instead of instance.hasOwneProperty()
// Problem was 
// let newObj = Object.create(null);
// newObj.hasOwneProperty(''); // breaks

// Private in classes
class Foo {
    #privateField = 23;
    // privateField = 23; its another variable which is public.

    #privateMethod() {
        return "hello";
    }

    static #PRIVATE_STATIC_FIELD = 96;

    static #privateStaticMwthod() {
        return "hello static methods" + this.#PRIVATE_STATIC_FIELD;
    }
}

// 