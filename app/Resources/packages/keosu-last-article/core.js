/************************************************************************
	Pockeit is an open source CMS for mobile app
	Copyright (C) 2013  Vincent Le Borgne

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 ************************************************************************/



//Main function
app.controller('keosu-last-articleController', function ($scope, $http, $sce, usSpinnerService, cacheManagerService) {	

	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

	$scope.parts = function (isList, isArticle) {
		$scope.isList = isList;
		$scope.isArticle = isArticle;
	}
	$scope.close = function () {
		$scope.slide="fadeIn";
		$scope.parts(true, false);
		
	};
	$scope.open = function (page) {
		$scope.article = page;
		$scope.parts(false, true);
	};
	$scope.next = function(){
		$scope.isFirstPage = true;
		$scope.isLastPage = true;
		$scope.slide="slideInRight";
		$scope.activePage++;
		$scope.getPage($scope.activePage,true);
		
	};
	$scope.previous = function(){
		$scope.isFirstPage = true;
		$scope.isLastPage = true;
		$scope.slide="slideInLeft";
		$scope.activePage--;
		$scope.getPage($scope.activePage,true);
	};
	$scope.more = function(){
		$scope.activePage++;
		$scope.getPage($scope.activePage,false);
	}
	/*
	 * @pageNum : page number requested.
	 * @resetPages : if true, clean the array pages. 
	 */
	$scope.getPage = function(pageNum,resetPages){
		if(resetPages){
			console.log("test ");
			$scope.pages = [];
		}
		usSpinnerService.spin('spinner'); // While loading, there will be a spinner
		cacheManagerService.get($scope.param.host+'service/gadget/lastarticle/'+$scope.param.gadgetId+'/'+pageNum+'/json').success(function(data) {
			usSpinnerService.stop('spinner');
			$scope.isFirstPage = data.isFirst;
			$scope.isLastPage = data.isLast;
			start = $scope.pages.length;
			for (i = 0; i < data.data.length; i++) {
				$scope.pages[start+i] = data.data[i];
				$scope.pages[start+i].content = $sce.trustAsHtml(decodedContent(data.data[i].content));
				$scope.pages[start+i].title = decodedContent(data.data[i].title);
			}	
		});
	}
	$scope.init = function (params){
		$scope.slide="fadeIn";
		$scope.param = params;
		$scope.pages = new Array();
		$scope.parts(true, false);
		$scope.activePage=0;
		$scope.isFirstPage = true;
		$scope.isLastPage = true;
		$scope.getPage($scope.activePage,true);
	};
});

