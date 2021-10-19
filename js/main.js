const log = require("@jasonfleischer/log");
const pianoKit = require("@jasonfleischer/piano");
const fretboardKit = require("@jasonfleischer/fretboard");
const musicKit = require("@jasonfleischer/music-model-kit");
musicKit.init();

const pianoView = pianoKit({
	id: 'piano',
	width: 800,
	onClick: function(note, isOn) {
		if(isOn) {
			let color = note.note_name.is_sharp_or_flat ? "#777": "#aaa";
			startNote(note.frequency);
			pianoView.drawNoteWithColor(note, color);
		} else {
			startNote(note.frequency);
			pianoView.clearNote(note);
		}
	},
	hover: true
});

const fretboardView = fretboardKit({
	id: 'fretboard',
	width: 800,
	onClick: function(note, isOn) {
		
	},
	hover: true,
	showLabels: false,
	darkMode: true
});

// add a midi listener
/*new musicKit.MidiListener(
	function (midiValue, channel, velocity) { // note on
		let note = musicKit.all_notes[midiValue];
		let color = note.note_name.is_sharp_or_flat ? "#777": "#aaa";
		startNote(note.frequency);
		pianoView.drawNoteWithColor(note, color);
	},
	function (midiValue, channel, velocity) { // note off
		let note = musicKit.all_notes[midiValue];
		startNote(note.frequency);
		pianoView.clearNote(note);
	});*/



init = function() {

	storage.load();
	alert.init();

	var isSafariMobile = window.mobileAndTabletCheck() && isSafari;
	if (isSafariMobile && !isFromHomeScreen()){
		install.showAlert();
	}
	setupControls();
	
}

function setupControls(){
	setupNoteTypeSelect();
	function setupNoteTypeSelect() {

		var select = $("note_type_select");
		var i;
		let noteTypes = musicKit.Note.ALL_NOTE_NAME_TYPES;
		for (i = 0; i < noteTypes.length; i++) {
			let noteType = noteTypes[i];
			let value = noteType.type;
			var option = document.createElement('option');
			if(value == model.selectedNote) {
				option.setAttribute('selected','selected');
			}
			option.setAttribute('value', value);
			option.innerHTML = value;
			select.appendChild(option);
		}

		var selectText = $("note_type");
		selectText.innerHTML = "Note: " + select.value;
		select.oninput = function() {
			model.selectedNote = this.value;
			selectText.innerHTML = "Note: " + this.value;
		}
	}

	setupScaleTypeSelect();
	function setupScaleTypeSelect() {

		var select = $("scale_type_select");
		var i;
		let scaleTypes = musicKit.Scale.TYPE;
		//for (i = 0; i < scaleTypes.length; i++) {

		for (const key in scaleTypes) {
		    console.log(`${key}: ${scaleTypes[key]}`);

			
			let value = scaleTypes[key];
			var option = document.createElement('option');
			if(value == model.selectedsScaleType) {
				option.setAttribute('selected','selected');
			}
			option.setAttribute('value', value);
			option.innerHTML = value;
			select.appendChild(option);
		}

		var selectText = $("scale_type");
		selectText.innerHTML = "Scale: " + select.value;
		select.oninput = function() {
			model.selectedsScaleType = this.value;
			selectText.innerHTML = "Scale: " + this.value;
		}
	}


	
}

kofi = function(){
	window.open("https://ko-fi.com/jasonfleischer", "_blank");
}

info = function(){
	information.showAlert();
}
function dismissInfo(){
	information.dismissAlert();
}





