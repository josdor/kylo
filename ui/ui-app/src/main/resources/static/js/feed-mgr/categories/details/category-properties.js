define(["require", "exports", "angular", "../../../services/AccessControlService"], function (require, exports, angular, AccessControlService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var moduleName = require('feed-mgr/categories/module-name');
    var CategoryPropertiesController = /** @class */ (function () {
        /**
         * Manages the Category Properties section of the Category Details page.
         *
         * @constructor
         * @param $scope the application model
         * @param $mdToast the toast service
         * @param {AccessControlService} AccessControlService the access control service
         * @param CategoriesService the category service
         */
        function CategoryPropertiesController($scope, $mdToast, $q, accessControlService, EntityAccessControlService, CategoriesService, $mdDialog) {
            var _this = this;
            this.$scope = $scope;
            this.$mdToast = $mdToast;
            this.$q = $q;
            this.accessControlService = accessControlService;
            this.EntityAccessControlService = EntityAccessControlService;
            this.CategoriesService = CategoriesService;
            this.$mdDialog = $mdDialog;
            /**
            * Indicates if the properties may be edited.
            */
            this.allowEdit = false;
            /**
            * Indicates if the view is in "edit" mode.
            * @type {boolean} {@code true} if in "edit" mode or {@code false} if in "normal" mode
            */
            this.isEditable = false;
            /**
            * Indicates of the category is new.
            * @type {boolean}
            */
            this.isNew = true;
            /**
            * Indicates if the properties are valid and can be saved.
            * @type {boolean} {@code true} if all properties are valid, or {@code false} otherwise
            */
            this.isValid = true;
            this.editModel = CategoriesService.newCategory();
            $scope.$watch(function () {
                return CategoriesService.model.id;
            }, function (newValue) {
                _this.isNew = !angular.isString(newValue);
            });
            /**
             * Category data used in "normal" mode.
             * @type {CategoryModel}
             */
            this.model = CategoriesService.model;
            //Apply the entity access permissions
            $q.when(accessControlService.hasPermission(AccessControlService_1.default.CATEGORIES_EDIT, this.model, AccessControlService_1.default.ENTITY_ACCESS.CATEGORY.EDIT_CATEGORY_DETAILS)).then(function (access) {
                _this.allowEdit = access;
            });
        }
        /**
        * Switches to "edit" mode.
        */
        CategoryPropertiesController.prototype.onEdit = function () {
            this.editModel = angular.copy(this.model);
        };
        ;
        /**
        * Saves the category properties.
        */
        CategoryPropertiesController.prototype.onSave = function () {
            var _this = this;
            var model = angular.copy(this.CategoriesService.model);
            model.id = this.model.id;
            model.userProperties = this.editModel.userProperties;
            this.CategoriesService.save(model).then(function (response) {
                _this.model = _this.CategoriesService.model = response.data;
                _this.CategoriesService.update(response.data);
                _this.$mdToast.show(_this.$mdToast.simple()
                    .textContent("Saved the Category")
                    .hideDelay(3000));
            }, function (err) {
                _this.$mdDialog.show(_this.$mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title("Save Failed")
                    .textContent("The category '" + model.name + "' could not be saved. " + err.data.message)
                    .ariaLabel("Failed to save category")
                    .ok("Got it!"));
            });
        };
        ;
        CategoryPropertiesController.$inject = ["$scope", "$mdToast", "$q", "AccessControlService",
            "EntityAccessControlService", "CategoriesService", "$mdDialog"];
        return CategoryPropertiesController;
    }());
    exports.CategoryPropertiesController = CategoryPropertiesController;
    angular.module(moduleName).component("thinkbigCategoryProperties", {
        controller: CategoryPropertiesController,
        controllerAs: 'vm',
        templateUrl: "js/feed-mgr/categories/details/category-properties.html"
    });
});
//# sourceMappingURL=category-properties.js.map