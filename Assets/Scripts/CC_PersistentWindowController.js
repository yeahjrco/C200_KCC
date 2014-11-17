#pragma strict

private var facebookButton: CC_ButtonController;
private var infoButton: CC_ButtonController;
private var videoButton: JY_VideoController;

function Start () {
	
	facebookButton = GameObject.Find("Button - Facebook").GetComponent(CC_ButtonController);
	infoButton = GameObject.Find("Button - Info").GetComponent(CC_ButtonController);
	videoButton = GameObject.Find("Button - Video").GetComponent(JY_VideoController);
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