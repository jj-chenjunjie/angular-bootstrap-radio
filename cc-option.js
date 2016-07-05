define(['app'], function(app){
	app.directive('ccOption', function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {
				type: '@',
				name: '@',
				data: '=',
				ngModel: '=',
				bit: '=',
				result: '='
			}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {

			// 	console.log('$element', $element);
				
			// },
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: function(elm){
			// 	$element.append('<label class="checkbox-inline" ng-repeat="obj in data"><input type="checkbox" name="{{name}}" value="{{obj.value}}" ng-true-value="{{obj.value}}" ng-false-value="0" ng-model="checkedList[$index]" ng-change="change()"/>{{obj.text}}</label>');	
			// },
			templateUrl: 'views/mc-option/option.html',
			replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {

				if($scope.type === 'checkbox'){
					// 初始化checkbox的模型
					$scope.ngModel = [];
					angular.forEach($scope.data, function(value, key) {
						$scope.ngModel[$scope.ngModel.length] = -Number(key);
					});

					if (iAttrs.bit) {
						if(!angular.isNumber($scope.bit)){
							$scope.bit = 0;
						}
						$scope.change = function(index) {
							$scope.bit += $scope.ngModel[index];
						}
						$scope.$watch('bit', function(newValue, oldValue, scope) {
							var index = 0;
							angular.forEach($scope.data, function(value, key) {
								scope.ngModel[index++] = Number(key) & newValue ? Number(key) : -Number(key);
							});
						});
					}else {
						$scope.change = function(){
							var array = []
							angular.forEach($scope.ngModel, function(value, key) {
								if (value > 0) {
									array.push(value);
								};
							});
							$scope.result = array.join(',');
						}
						$scope.$watch('result', function(newValue, oldValue, scope) {
							var index = 0;
							var array = newValue ? newValue.split(",") : [];
							angular.forEach($scope.data, function(value, key) {
								scope.ngModel[index++] = $.inArray(key + '', array) != -1 ? Number(key) : -Number(key);
							});

						});

					}
					

				}else{
					$scope.click = function(value){
						$scope.ngModel = value;
					}
				}
			}
		};
	});
})