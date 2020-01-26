class Generator {
    constructor(creator) {
        this.stack = [];
        let my_yield = (value) => this.stack.push(value);
        creator.apply(this, [my_yield]);
        this[Symbol.iterator] = () => ({
            next: this.next.bind(this)
        });
    }
    next() {
        let item = this.stack.shift();
        return {
            value: item,
            done: item == undefined
        };
    }
}

let a = new Generator(function (my_yield) {
    my_yield(1);
    my_yield(2);
    my_yield(4);
    my_yield(3);
})

console.log(a.next());
console.log(a.next());

for (let i of a) {
    console.log(i);
}


