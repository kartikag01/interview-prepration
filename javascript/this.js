console.log(this); // {}

function demo() {
    console.log(this); //    
}

demo(); // Global
new demo(); // demo{}

var obj = {
    fn: function(a,b) {
        console.log(this);
    }
}

obj.fn(); // obj - {fn:[Function: fn]}

var obj2 = { method: obj.fn };
obj2.method(); // obj2 - {method:[Function: fn]}
