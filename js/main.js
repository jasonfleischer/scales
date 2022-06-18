const log = require("@jasonfleischer/log");
const pianoKit = require("@jasonfleischer/piano");
const fretboardKit = require("@jasonfleischer/fretboard");
const musicKit = require("@jasonfleischer/music-model-kit");
musicKit.init();

let note_name_to_midi_value_map = {
	"C": 60,
	"C# / Db": 61,
	"D": 62,
	"D# / Eb": 63,
	"E": 64,
	"F": 65,
	"F# / Gb": 66,
	"G": 67,
	"G# / Ab": 68,
	"A": 69,
	"A# / Bb": 70,
	"B": 71
};

const pianoView = pianoKit({
	id: 'piano',
	onClick: function(note, isOn) {
		let midi_value = note_name_to_midi_value_map[note.note_name.type];
		$("note_type_select").value = midi_value;
		model.selected_root_note = midi_value;
		updateUI();
	},
	hover: true
});

const fretboardView = fretboardKit({
	id: 'fretboard',
	onClick: function(note, isOn) {
		let midi_value = note_name_to_midi_value_map[note.note_name.type];
		$("note_type_select").value = midi_value;
		model.selected_root_note = midi_value;
		updateUI();
	},
	hover: true,
	showLabels: false,
	darkMode: true
});

kofi = function(){
	window.open("https://ko-fi.com/jasonfleischer", "_blank");
}

info = function(){
	information.showAlert();
}
dismissInfo = function(){
	information.dismissAlert();
}

init = function() {

	storage.load();
	alert.init();

	var isSafariMobile = window.mobileAndTabletCheck() && isSafari;
	if (isSafariMobile && !isFromHomeScreen()){
		install.showAlert();
	}

	setupControls();
	windowResizedEnd();
	updateUI();
}

function setupControls(){
	setupNoteTypeSelect();
	function setupNoteTypeSelect() {

		var select = $("note_type_select");
		var i;
		let noteTypes = musicKit.Note.ALL_NOTE_NAME_TYPES;
		var midi_value = 60;
		for (i = 0; i < noteTypes.length; i++) {
			let noteType = noteTypes[i];
			let value = noteType.type;
			var option = document.createElement('option');
			if(midi_value == model.selected_root_note) {
				option.setAttribute('selected','selected');
			}
			option.setAttribute('value', midi_value);
			midi_value++;
			option.innerHTML = value;
			select.appendChild(option);
		}
		select.oninput = function() {
			model.selected_root_note = parseInt(this.value);
			storage.setSelectedNote(model.selected_root_note);
			updateUI();
		}
	}

	setupScaleTypeSelect();
	function setupScaleTypeSelect() {

		var select = $("scale_type_select");
		var i;
		let scaleTypes = musicKit.Scale.TYPE;

		for (const key in scaleTypes) {
			
			let value = scaleTypes[key];
			var option = document.createElement('option');
			if(value == model.selected_scale_type) {
				option.setAttribute('selected','selected');
			}
			option.setAttribute('value', value);
			option.innerHTML = value;
			select.appendChild(option);
		}

		select.oninput = function() {
			model.selected_scale_type = this.value;
			storage.setSelectedScaleType(model.selected_scale_type);
			updateUI();
		}
	}

	setupRandomButton()
	function setupRandomButton(){
		$("random_button").addEventListener("click", function(event){

			let midiValue = randomInteger(60, 71);
			let note = musicKit.all_notes[midiValue];
			model.selected_root_note = note.midi_value;

			let scaleTypes = Object.keys(musicKit.Scale.TYPE).map(function(key){
    			return musicKit.Scale.TYPE[key];
			});
			let scale_type = scaleTypes[randomInteger(0, scaleTypes.length - 1)];
			model.selected_scale_type = scale_type;

			$("note_type_select").value = midiValue;
			$("scale_type_select").value = scale_type;

			storage.setSelectedNote(midiValue);
			storage.setSelectedScaleType(scale_type);
			updateUI();
		});
	}

	setup_show_piano_switch();
	function setup_show_piano_switch() {
		$("show_piano").addEventListener("click", function(e){
			$("show_piano_checkbox").click();
		});
		$("show_piano_checkbox_switch").addEventListener('keyup', function(e) {
			if (event.code === 'Space' || event.code === 'Enter') $("show_piano_checkbox").click();
		});
		$("show_piano_checkbox").addEventListener("change", function(e){
			var value = this.checked;
			log.i("on show piano change: " + value);
			model.show_piano = value;
			storage.set_show_piano(value);
			updateUI();
		});
		$("show_piano_checkbox").checked = model.show_piano;
	}

	setup_show_guitar_switch();
	function setup_show_guitar_switch() {
		$("show_guitar").addEventListener("click", function(e){
			$("show_guitar_checkbox").click();
		});
		$("show_guitar_checkbox_switch").addEventListener('keyup', function(e) {
			if (event.code === 'Space' || event.code === 'Enter') $("show_guitar_checkbox").click();
		});
		$("show_guitar_checkbox").addEventListener("change", function(e){
			var value = this.checked;
			log.i("on show guitar change: " + value);
			model.show_guitar = value;
			storage.set_show_guitar(value);
			updateUI();
		});
		$("show_guitar_checkbox").checked = model.show_guitar;
	}

	setup_show_guitar_labels_switch();
	function setup_show_guitar_labels_switch() {
		$("show_guitar_labels").addEventListener("click", function(e){
			$("show_guitar_labels_checkbox").click();
		});
		$("show_guitar_labels_checkbox_switch").addEventListener('keyup', function(e) {
			if (event.code === 'Space' || event.code === 'Enter') $("show_guitar_labels_checkbox").click();
		});
		$("show_guitar_labels_checkbox").addEventListener("change", function(e){
			var value = this.checked;
			log.i("on show guitar labels change: " + value);
			model.show_guitar_labels = value;
			storage.set_show_guitar_labels(value);
			updateUI();
		});
		$("show_guitar_labels_checkbox").checked = model.show_guitar_labels;
	}

	setup_show_containing_scales_switch();
	function setup_show_containing_scales_switch() {
		$("show_containing_scales").addEventListener("click", function(e){
			$("show_containing_scales_checkbox").click();
		});
		$("show_containing_scales_checkbox_switch").addEventListener('keyup', function(e) {
			if (event.code === 'Space' || event.code === 'Enter') $("show_containing_scales_checkbox").click();
		});
		$("show_containing_scales_checkbox").addEventListener("change", function(e){
			var value = this.checked;
			log.i("on show containing scales change: " + value);
			model.show_containing_scales = value;
			storage.set_show_containing_scales(value);
			updateUI();
		});
		$("show_containing_scales_checkbox").checked = model.show_containing_scales;
	}
}


// resize
var window_resize_start_event_occured = false;
var resized_timer;
window.onresize = function(){
	clearTimeout(resized_timer);
	resized_timer = setTimeout(windowResizedEnd, 200);
	if(!window_resize_start_event_occured) {
		windowResizedStart();
		window_resize_start_event_occured = true;
	}
}
function windowResizedStart(){
	dismissInfo();	
}
function windowResizedEnd(){

	window_resize_start_event_occured = false;

	let contentWidth = document.body.clientWidth;

	let fretboardPaddingLeftRight = 34;
	fretboardView.resize(Math.min(contentWidth-fretboardPaddingLeftRight, 1000));
	let pianoPaddingLeftRight = 30;
	pianoView.resize(Math.min(contentWidth-pianoPaddingLeftRight, 1000));
}

function updateUI() {

	let note = musicKit.all_notes[model.selected_root_note];
	let scale = new musicKit.Scale(note, model.selected_scale_type);

	$("scale_structure").innerHTML = scale.getLabels().toString().replaceAll(',', ' ');
	$("page_name").innerHTML = scale.toString()

	$(pianoView.id).style.display = model.show_piano ? 'block': 'none'; 

	$(fretboardView.id).style.display = model.show_guitar ? 'block': 'none'; 
	
	fretboardView.show_labels = model.show_guitar_labels;
	$("show_guitar_labels").style.display = model.show_guitar ? 'block': 'none';

	$("containing_scales").style.display = model.show_containing_scales ? 'block': 'none';

	fretboardView.drawScale(scale);
	pianoView.drawScale(scale);

	updateUIContainingScales();
	function updateUIContainingScales() {
		let objects = scale.getContainingScaleTypeObjects(musicKit.all_notes);

		const removeChildren = (parent) => {
		    while (parent.lastChild) {
		        parent.removeChild(parent.lastChild);
		    }
		};
		removeChildren($('containing_scales'));

		if(objects.length<2) return;

		var i;
		for(let i = 0; i < objects.length; i++){
			let obj = objects[i];

			let button = document.createElement('button');
			button.innerHTML = obj.note.note_name.type + " " + obj.scale_type;
			button.style.backgroundColor = obj.note.note_name.color;
			button.classList.add("containing_scale_button");

			button.addEventListener("click", function(event){

				var midiValue = note_name_to_midi_value_map[obj.note.note_name.type]
				var key = obj.scale_type_key;

				model.selected_root_note = midiValue;
				model.selected_scale_type = musicKit.Scale.TYPE[key];

				$("note_type_select").value = midiValue;
				$("scale_type_select").value = model.selected_scale_type;

				storage.setSelectedNote(midiValue);
				storage.setSelectedScaleType(model.selected_scale_type);
				updateUI();

				var search_params = url.searchParams;
				search_params.set('value', 'tst');
				search_params.set('scale_type', key);

				//search_params.append('value', midiValue);
				//search_params.append('scale_type', key);

			});

			$("containing_scales").appendChild(button);
		}
	}
}








