/*
	Simple Sort Algo Visualizer
	Renders the various states of an array during sorting, after the sort is complete (and not in realtime)
		
	Copyright (c) 2017 EminenceDigital, Inc
	http://www.eminencedigital.com	
	
	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php
*/
    
	var sortVisualizer = {	
		displayArray: [], 
		displayContainer: $('#display'),	
        displaySpeed: 200,		
		init: function(display){
			this.displayContainer = display;
			
		},
		clearDisplay: function(){
			this.displayContainer.empty();			
			this.displayArray = [];
		},
		
		// Logs the state of the sort array
		logState: function(arr, logToBrowser){
			this.displayArray[this.displayArray.length]=arr.slice();
			if (logToBrowser){
				console.log(arr.slice().toString());
			}
		},
		
		// Renders display of sort array
		doDisplay: function() {
			this.displayContainer.empty();			
			var setCount = this.displayArray.length;
			
			// initially renders all the states of the array as hidden elements
			for (var i = 0; i <= this.displayArray.length - 1; i++) {
				var visibility = "display:none;";
				this.display(this.displayArray[i], i, visibility);
			}

			// Simulates an animation by toggling the visibility states 
			// of the elements rendered in the previous loop
			var interval = setInterval(function() {
				var visibleSet = $('.list-item:visible');
				var firstVisibleElement;
				var setNumber;
				
				if (visibleSet.length == 0) {
					firstVisibleElement = $('.set-0');
					setNumber = 0;
				} else {
					firstVisibleElement = $('.list-item:visible').first();
					setNumber = parseInt(firstVisibleElement.attr('set'));
				}

				var nextSetNumber = setNumber + 1;
				if ($('.set-' + nextSetNumber).length > 0) {
					$('.set-' + setNumber).remove();
					$('.set-' + nextSetNumber).show();

				} else {
					clearInterval(interval);
				}
			}, this.displaySpeed);
		},
		
		// Renders <li> tags to the page for each member of the array,
		// assignning the value of the array to the "height" property
		display: function(arr,set,visibility){			
			
			if (typeof(set) == 'undefined'){
				set=0;
			}
			
			var innerTableFormat="<li class='list-item set-${set}' set='${set}' style='${visibility}'><div style='height:${value}0px;'><span>${value}</span></div></li>";
			var fullCell="";
			for (var i=0; i<=arr.length-1; i++){
				var val=arr[i];				
				 $.tmpl(innerTableFormat, {value:val, set:set, visibility:visibility}).appendTo('#display');
			}
		}	
		
	}
