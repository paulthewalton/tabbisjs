var onlytabs = (function () {
	var fn = {};

	var data;
	var types = ['tab', 'pane'];
	var type;
	var groups = [];
	var selectors = [];
	var activeGroups = [];
	var activeChildren = [];
	var activeItems = [];
	var indexGroup;
	var indexItem;

	fn.init = function(options) {
		data = options;
		fn.setDefaults();

		groups['tab'] = document.querySelectorAll(data.tabGroup);
		groups['pane'] = document.querySelectorAll(data.paneGroup);

		for( var groupIndex = 0; groupIndex < groups['tab'].length; groupIndex++ ) {
			var tabItems = groups['tab'][groupIndex].children;

			for( var itemIndex = 0; itemIndex < tabItems.length; itemIndex++ ) {
				tabItems[itemIndex].addEventListener('click', fn.onClick.bind(this, groupIndex, itemIndex), false);
			}
		}
	};

	fn.onClick = function(groupIndex, itemIndex) {
		indexGroup = groupIndex;
		indexItem = itemIndex;

		for( var i = 0; i < types.length; i++ ) {
			type = types[i];

			fn.setActiveGroup();
			fn.setActiveChildren();
			fn.setActiveItems();
			fn.putActiveClass();
		}		

		fn.setCallback(indexGroup, indexItem);
	}

	fn.putActiveClass = function() {
		for( var i = 0; i < activeChildren[type].length; i++ ) {
			activeChildren[type][i].classList.remove(data[type + 'Active']);
		}

		activeItems[type].classList.add(data[type + 'Active']);
	};

	fn.setDefaults = function() {
		for( var i = 0; i < types.length; i++ ) {
			type = types[i];

			fn.setOption(type + 'Group', '[data-' + type + 's]');
			fn.setOption(type + 'Active', 'active');
		}
	};

	fn.setOption = function(key, value) {
		data = data || [];
		data[key] = data[key] || value;
	};

	fn.setActiveGroup = function() {
		activeGroups[type] = groups[type][indexGroup];
	};

	fn.setActiveChildren = function() {
		activeChildren[type] = activeGroups[type].children;
	};

	fn.setActiveItems = function() {
		activeItems[type] = activeChildren[type][indexItem];
	};

	fn.setCallback = function() {
		if (typeof data.callback === "function") {
			data.callback(activeItems.tab, activeItems.pane);
		}
	};

	fn.reset = function() {
		for( var groupIndex = 0; groupIndex < groups['tab'].length; groupIndex++ ) {
			tabItems = groups['tab'][groupIndex].children;
			paneItems = groups['pane'][groupIndex].children;

			for( var itemIndex = 0; itemIndex < tabItems.length; itemIndex++ ) {
				tabItems[itemIndex].classList.remove(data['tabActive']);
				paneItems[itemIndex].classList.remove(data['paneActive']);
			}
		}
	};

	// Memory true false
	
	return fn;
})();