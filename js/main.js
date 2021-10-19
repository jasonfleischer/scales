const log = require("@jasonfleischer/log");
const pianoKit = require("@jasonfleischer/piano");
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

const fretboardKit = require("@jasonfleischer/fretboard");

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
init();

function setupControls(){
	//setupDurationSelect();
	function setupDurationSelect() {

		var select = $("note_type_select");
		var i;
		let noteTypes = musicKit.Note.ALL_NOTE_NAME_TYPES
		for (i = 0; i < noteTypes.length; i++) {
			let noteType = noteTypes[i];
			var option = document.createElement('option');
			option.innerHTML = noteType;
			select.appendChild(option);
		}

		
		select.value = duration;
		var selectText = $("type");
		selectText.innerHTML = duration == -1 ? "Note" : "Note: " + duration + "min";
		select.oninput = function() {
			duration = parseFloat(this.value);
			selectText.innerHTML = duration == -1 ? "Duration" : "Duration: " + duration + "min";
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





