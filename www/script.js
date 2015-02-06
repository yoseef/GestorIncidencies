var module = angular.module('app', ['onsen']);
var finca = {
    Id: 0,
    Nom: "",
    Data: new Date(),
    Descripcio: "",
    Coor: {
        lat: 0,
        long: 0
    }
};
var visita = {
    Id: 0,
    Id_Finca: 0,
    Data: new Date(),
    Observ: "",
    Fotos: [],
    Coor: {
        lat: 0,
        long: 0
    }
};

module.controller("MainCtrl", ['$scope', '$http', function ($scope, $http) {

        $scope.finques = [];
        $scope.visites = [];
        $scope.finca = Object.create(finca);
        $scope.visita = Object.create(visita);
        $scope.selectedFinca;

        //obtencio del JSON REMOT(http)
        //--->
        var config = function (m, u) {
            this.method = m;
            this.url = u;
        };

        $http(new config("GET", "http://jsonplaceholder.typicode.com/posts"))
                .success(function (data, status, headers, config) {
                    $scope.finques = data;
                })
                .error(function (data, status, headers, config) {
                    alert("No s'ha pogut obtenir el rec curs. codi HTTP:" + status);
                });
        $http(new config("GET", "visites.json"))
                .success(function (data, status, headers, config) {
                    $scope.visites = data;
                })
                .error(function (data, status, headers, config) {
                    alert("No s'ha pogut obtenir el recurs. codi HTTP:" + status);
                });

        //--->

        // guardar json en local
        //-->



        //-->

        //operacions:

        $scope.novaFinca = function () {
            $scope.finca = Object.create(finca);
            $scope.app.navi.pushPage('NovaFinca.html');
        };

        $scope.guardarFinca = function () {
            $scope.finca.Id = nouFincaId();
            $scope.finques.push($scope.finca);
            $scope.finca = Object.create(finca);
            $scope.menu.setMainPage('finques.html', {closeMenu: true});
        };
        $scope.editarFinca = function (fin) {
            $scope.app.navi.pushPage('EditarFinca.html');            
            $scope.setSelectedFinca(fin);
            var dataString = $scope.selectedFinca.Data.toString();
            $scope.selectedFinca.Data = new Date(dataString);
            

        };
        $scope.modificarFinca = function () {
            $scope.finca = $scope.selectedFinca;
        };
        //quan editem seleccionem aquella finca.
        $scope.setSelectedFinca = function (finca) {
            $scope.selectedFinca = finca;
        };

        var nouFincaId = function () {
            return $scope.finques.length + 1;
        };

        $scope.guardarVisita = function () {
            $scope.visites.push($scope.visita);
            $scope.visita = Object.create(visita);
        };


        //nomes agafa les  visites de aquella finca.
        $scope.filtre = function (visita) {
            if (visita.Id_Finca === $scope.selectedFinca.Id) {
                return visita;
            } else {
                return null;
            }
        };


    }]);