#pragma strict

private var appController: CC_ApplicationController;
private var currentStation: int = 0;

function Start () {
	
	var controllerObject = GameObject.FindGameObjectWithTag("GameController").gameObject;
	appController = controllerObject.GetComponent(CC_ApplicationController);
}	

function OnMouseDown() {
	
	if (currentStation < 5) {
		
		currentStation++;
		appController.debugLocation = currentStation;
	} else {
	
		currentStation = 0;
		appController.debugLocation = 0;
	}
}