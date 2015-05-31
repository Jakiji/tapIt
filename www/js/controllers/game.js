angular.module('starter.controllers')
	.controller('GameCtrl', function ($scope, $timeout) {
		$scope.score = 0;
		$scope.missed = 20;
		if (sessionStorage.best) {
			$scope.best = sessionStorage.best;
		} else {
			$scope.best = 0;
			sessionStorage.best = 0;
		}
		console.log(sessionStorage.best);
		$scope.currentTile = [0,0];
		var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		if (width > 520) {
			var c = 100;
		} else {
			var c = 56;
		}
		var interval = 3000;
		var promise;
		var levels = [20,20,20,20,20]

		function getRandomInt(min, max) {
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function updateInterval () {
			if (interval > 1100) {
				interval -= 100;
			} else {
				if (levels[0] > 0) {
					if (levels[0] == 1) {
						interval -= 100;
					}
					levels[0] -= 1;
				} else {
					if (levels[1] > 0) {
						if (levels[1] == 1) {
							interval -= 100;
						}
						levels[1] -= 1;
					} else {
						if (levels[2] > 0) {
							if (levels[2] == 1) {
								interval -= 100;
							}
							levels[2] -= 1;
						} else {
							if (levels[3] > 0) {
								if (levels[3] == 1) {
									interval -= 100;
								}
								levels[3] -= 1;
							} else {
								if (levels[4] > 0) {
									if (levels[4] == 1) {
										interval -= 100;
									}
									levels[4] -= 1;
								}
							}
						}
					}
				}
			}
		}

		function newElement () {
			var i = $scope.currentTile[0];
			var j = $scope.currentTile[1];
			angular.element(document.querySelector('#tile-' + parseInt(i) + parseInt(j)))
				.css('background-color', 'rgb(220,0,0)');
			$timeout(function () {
				angular.element(document.querySelector('#tile-' + parseInt(i) + parseInt(j)))
					.css('background-color', 'rgb(150,150,150)');
			}, 50);
			$scope.currentTile = [getRandomInt(0,4), getRandomInt(0,4)];
			console.log($scope.currentTile);
			angular.element(document.querySelector('#bar-left')).css('top', (5 + $scope.currentTile[0] * c).toString() + 'px');
			angular.element(document.querySelector('#bar-bottom')).css('left', (5 + $scope.currentTile[1] * c).toString() + 'px');
			angular.element(document.querySelector('#bar-top')).css('left', (5 + $scope.currentTile[1] * c).toString() + 'px');
			angular.element(document.querySelector('#bar-right')).css('top', (5 + $scope.currentTile[0] * c).toString() + 'px');
			$scope.missed -= 1;
			if ($scope.missed > 0) {
				updateInterval();
				console.log(interval);
				promise = $timeout(newElement, interval)
			} else {
				angular.element(document.querySelector('#end')).removeClass('hide');
				angular.element(document.querySelector('#bar-left')).addClass('hide');
				angular.element(document.querySelector('#bar-bottom')).addClass('hide');
				angular.element(document.querySelector('#bar-right')).addClass('hide');
				angular.element(document.querySelector('#bar-top')).addClass('hide');
				if ($scope.score > sessionStorage.best) {
					$scope.best = $scope.score;
					sessionStorage.best = $scope.best;
					console.log(sessionStorage.best);
				}
			}
			
		}

		$scope.play = function () {
			angular.element(document.querySelector('#tuto')).addClass('hide');
			$scope.score = 0;
			$scope.missed = 20;
			$scope.currentTile = [getRandomInt(0,4), getRandomInt(0,4)];
			console.log($scope.currentTile);
			angular.element(document.querySelector('#bar-left')).css('top', (5 + $scope.currentTile[0] * c).toString() + 'px');
			angular.element(document.querySelector('#bar-bottom')).css('left', (5 + $scope.currentTile[1] * c).toString() + 'px');
			angular.element(document.querySelector('#bar-top')).css('left', (5 + $scope.currentTile[1] * c).toString() + 'px');
			angular.element(document.querySelector('#bar-right')).css('top', (5 + $scope.currentTile[0] * c).toString() + 'px');
			angular.element(document.querySelector('#bar-left')).removeClass('hide');
			angular.element(document.querySelector('#bar-bottom')).removeClass('hide');
			angular.element(document.querySelector('#bar-right')).removeClass('hide');
			angular.element(document.querySelector('#bar-top')).removeClass('hide');
			promise = $timeout(newElement, interval)
		}

		$scope.click = function (i, j) {
			if (($scope.currentTile[0] == i) && ($scope.currentTile[1] == j)) {
				$scope.score += 1;
				angular.element(document.querySelector('#tile-' + parseInt(i) + parseInt(j)))
					.css('background-color', 'rgb(255,242,0)');
				$timeout(function () {
					angular.element(document.querySelector('#tile-' + parseInt(i) + parseInt(j)))
						.css('background-color', 'rgb(150,150,150)');
				}, 50);
				$timeout.cancel(promise);
				$scope.currentTile = [getRandomInt(0,4), getRandomInt(0,4)];
				console.log($scope.currentTile);
				angular.element(document.querySelector('#bar-left')).css('top', (5 + $scope.currentTile[0] * c).toString() + 'px');
				angular.element(document.querySelector('#bar-bottom')).css('left', (5 + $scope.currentTile[1] * c).toString() + 'px');
				angular.element(document.querySelector('#bar-top')).css('left', (5 + $scope.currentTile[1] * c).toString() + 'px');
				angular.element(document.querySelector('#bar-right')).css('top', (5 + $scope.currentTile[0] * c).toString() + 'px');
				updateInterval();
				promise = $timeout(newElement, interval)
			}
		}

		$scope.retry = function () {
			$scope.score = 0;
			$scope.missed = 20;
			levels = [20,20,20,20,20];
			$scope.currentTile = [getRandomInt(0,4), getRandomInt(0,4)];
			interval = 3000;
			console.log($scope.currentTile);
			angular.element(document.querySelector('#end')).addClass('hide');
			angular.element(document.querySelector('#bar-left')).css('top', (5 + $scope.currentTile[0] * c).toString() + 'px');
			angular.element(document.querySelector('#bar-bottom')).css('left', (5 + $scope.currentTile[1] * c).toString() + 'px');
			angular.element(document.querySelector('#bar-top')).css('left', (5 + $scope.currentTile[1] * c).toString() + 'px');
			angular.element(document.querySelector('#bar-right')).css('top', (5 + $scope.currentTile[0] * c).toString() + 'px');
			angular.element(document.querySelector('#bar-left')).removeClass('hide');
			angular.element(document.querySelector('#bar-bottom')).removeClass('hide');
			angular.element(document.querySelector('#bar-right')).removeClass('hide');
			angular.element(document.querySelector('#bar-top')).removeClass('hide');
			promise = $timeout(newElement, interval)
		}

	})