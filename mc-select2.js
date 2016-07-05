define(['app', 'select2'], function(app){
    app.directive('select2', function(){
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                data: '=',
                reMap: '=',
                ngModel: '=',
                model: '='
            }, // {} = isolate, true = child, false/undefined = no change
            // controller: function($scope, $element, $attrs, $transclude) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '<select></select>',
            // templateUrl: '',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {

                var select2;

                $scope.$watch('data', function(newValue, oldValue, scope) {

                    var data = [];
                    // newValue = $scope.data;

                    iElm.html(!iAttrs.allowClear && iAttrs.allowClear != false ? '<option></option>' : '');
                    // 数据映射
                    if($scope.reMap){
                        angular.forEach(newValue, function(obj, key){
                            data.push({
                                id: obj[$scope.reMap.id ? $scope.reMap.id : 'id'],
                                text: obj[$scope.reMap.text]
                            })
                        });
                    }else{
                        angular.forEach(newValue, function(value, key){
                            data.push({id: key, text: value});
                        });
                    }

                    select2 = iElm.select2({
                        // tags: 'true',
                        data: data,
                        minimumResultsForSearch: iAttrs.searchable != undefined ? true : Infinity ,
                        allowClear: true
                    });

                    select2.val($scope.ngModel).trigger('change.select2');
                    
                });

            }

        };
    });
  })