storage = {};

storage.load = function(){
	model.selected_root_note = storage.getSelectedNote(60);
	model.selected_scale_type = storage.getSelectedScaleType("Major pentatonic");
	model.show_piano = storage.get_show_piano(true);
	model.show_guitar = storage.get_show_guitar(true);
};

storage.SELECTED_NOTE = "SCALE_SELECTED_NOTE";
storage.getSelectedNote = function(default_value){
	return storage.get(storage.SELECTED_NOTE, default_value);
};
storage.setSelectedNote = function(value){
	localStorage.setItem(storage.SELECTED_NOTE, value);
};

storage.SELECTED_SCALE_TYPE = "SCALE_SELECTED_SCALE_TYPE";
storage.getSelectedScaleType = function(default_value){
	return storage.get(storage.SELECTED_SCALE_TYPE, default_value);
};
storage.setSelectedScaleType = function(value){
	localStorage.setItem(storage.SELECTED_SCALE_TYPE, value);
};

storage.SHOW_PIANO = "SHOW_PIANO";
storage.get_show_piano = function(default_value){
	var value = storage.get(storage.SHOW_PIANO, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_show_piano = function(value){
	localStorage.setItem(storage.SHOW_PIANO, value);
};

storage.SHOW_GUITAR = "SHOW_GUITAR";
storage.get_show_guitar = function(default_value){
	var value = storage.get(storage.SHOW_GUITAR, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_show_guitar = function(value){
	localStorage.setItem(storage.SHOW_GUITAR, value);
};

storage.get = function(key, default_value) {
	let result = localStorage.getItem(key);
	return (result == undefined) ? default_value : result;
};
