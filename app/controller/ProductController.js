angular
    .module('productRepository')
    .controller('ProductController', ProductController)
    .controller('addProductController', addProductController)
    .controller('productViewController', productViewController);

ProductController.$inject = ['$scope', '$uibModal'];
function ProductController($scope, $modal) {
    const vm = this;
    vm.display_records = [];
    vm.products = [
        {
            id: '',
            name: 'Funny Egg',
            category: 'Maturbador',
            cost_price: 10.99,
            sales_price: 0.00,
            quantity: 3,
            total_cost_price_x_quantity: 0.00,
            total_sales_price_x_quantity: 0.00
        },
        {
            id: '',
            name: 'Calcinha',
            category: 'Lingerie',
            cost_price: 8.59,
            sales_price: 0.00,
            quantity: 10,
            total_cost_price_x_quantity: 0.00,
            total_sales_price_x_quantity: 0.00
        },
        {
            id: '',
            name: 'Gel lubrificante Volumão',
            category: 'Cosmético',
            cost_price: 12.49,
            sales_price: 0.00,
            quantity: 2,
            total_cost_price_x_quantity: 0.00,
            total_sales_price_x_quantity: 0.00
        }
    ];

    vm.getData = () => {
        vm.calculateProductPrices();
        vm.display_records = angular.copy(vm.products);
    }

    vm.calculateProductPrices = () => vm.products.forEach(product => {
        product.sales_price = ((product.cost_price * 2) + (product.cost_price * .1)).toFixed(2);
        product.total_cost_price_x_quantity = (product.cost_price * product.quantity).toFixed(2);
        product.total_sales_price_x_quantity = (product.sales_price * product.quantity).toFixed(2);
    });

    vm.addRecord = () => {
        modalInstance = $modal.open({
            animation: false,
            templateUrl: '../app/view/add_record.html',
            controller: 'addProductController',
            scope: $scope,
            size: '',
            resolve: {
            }
        });
    }

    $scope.cancelModal = () => modalInstance.dismiss('cancel');

    $scope.saveRecord = params => {
        console.log(params);
        vm.products.push(params);
        vm.getData();
    }

    vm.viewRecord = product => {
        modalInstance = $modal.open({
            animation: false,
            templateUrl: '../app/view/view_record.html',
            controller: 'productViewController',
            scope: $scope,
            size: 'lg',
            resolve: {
                record: function () {
                    return product;
                }
            }
         });
    }

    vm.getData();
}

addProductController.$inject = ['$scope'];
function addProductController($scope) {
    $scope.saveProduct = function () {
        $scope.datas = {};

        console.log($scope.product);
        if (!angular.isDefined($scope.name) || $scope.name === '') {
            alert('product.name is empty');
            return;
        }
        else if (!angular.isDefined($scope.quantity) || $scope.quantity === '') {
            alert('product.quantity is empty');
            return;
        } else if (!angular.isDefined($scope.cost_price) || $scope.cost_price === '') {
            alert('product.cost_price is empty');
            return;
        } else if (!angular.isDefined($scope.category) || $scope.category === '') {
            alert('product.category is empty');
            return;
        } else {
            $scope.datas.name = $scope.name;
            $scope.datas.quantity = $scope.quantity;
            $scope.datas.cost_price = $scope.cost_price;
            $scope.datas.category = $scope.category;
            console.log($scope.datas);
        }
        $scope.cancelModal();
        $scope.saveRecord($scope.datas);
    }
}

productViewController.$inject = ['$scope', 'record'];
function productViewController($scope, record){
	function init(){
        $scope.discountList = [];
        for(let i = 1; i <= 95; i++){
            $scope.discountList.push(i);
        }
        $scope.product = record;
        
    }
	init();
}
