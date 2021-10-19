storage = {};

storage.load = function(){
	model.master_volume_percent = storage.get_volume(30);
};

storage.SELECTED_SCALE_TYPE = "SCALE_SELECTED_SCALE_TYPE";
storage.getSelectedScaleType = function(default_value){
	return storage.get(storage.SELECTED_SCALE_TYPE, default_value);
};
storage.setSelectedScaleType = function(value){
	localStorage.setItem(storage.SELECTED_SCALE_TYPE, value);
};

storage.SELECTED_NOTE = "SCALE_SELECTED_NOTE";
storage.getSelectedNote = function(default_value){
	return storage.get(storage.SELECTED_NOTE, default_value);
};
storage.setSelectedNote = function(value){
	localStorage.setItem(storage.SELECTED_NOTE, value);
};

storage.get = function(key, default_value) {
	let result = localStorage.getItem(key);
	return (result == undefined) ? default_value : result;
};
