angular
    .module('productRepository')
    .controller('ProductController', ProductController)

ProductController.$inject = [];
function ProductController(){
    const vm = this;

    vm.products = [
        {
            name: 'Funny Egg',
            category: 'Maturbador',
            cost_price: 10.99,
            quantity: 3,
        }
    ];

  
}
