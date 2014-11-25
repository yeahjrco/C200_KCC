#pragma strict

private var facebookButton: CC_ButtonController;
private var infoButton: CC_ButtonController;
private var videoButton: JY_VideoController;
private var walkButton: CC_ButtonController;

private var stationID: int;
private var appController: CC_ApplicationController;

function Start() {
	
	var controllerObject = GameObject.FindGameObjectWithTag("GameController").gameObject;
	appController = controllerObject.GetComponent(CC_ApplicationController);
	
	facebookButton = GameObject.Find("Button - Facebook").GetComponent(CC_ButtonController);
	infoButton = GameObject.Find("Button - Info").GetComponent(CC_ButtonController);
	videoButton = GameObject.Find("Button - Video").GetComponent(JY_VideoController);
	walkButton = GameObject.Find("Button - Walk").GetComponent(CC_ButtonController);
}

function Update() { 
	
	stationID = appController.locationID;
	if (stationID == 5 || stationID == 0) {
		
		walkButton.DeactivateButton();
	} else {
		
		walkButton.ActivateButton();
	}
} 

function DeactivateButtons() {
	
	facebookButton.DeactivateButton();
	infoButton.DeactivateButton();
	videoButton.DeactivateButton();
}

function ActivateButtons() {

	facebookButton.ActivateButton();
	infoButton.ActivateButton();
	videoButton.ActivateButton();
}

function ResetButtons() {
	
	facebookButton.ResetButton();
	infoButton.ResetButton();
	walkButton.ResetButton();
}