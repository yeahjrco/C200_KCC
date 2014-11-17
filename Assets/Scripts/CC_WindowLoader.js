#pragma strict

@script RequireComponent(MeshCollider);
@script RequireComponent(MeshRenderer);

var setOwnBackdrop: boolean;

private var windowObject: GameObject;
private var panelObject: GameObject;
private var appController: CC_ApplicationController;

function Start() {

	var controllerObject = GameObject.FindGameObjectWithTag("GameController").gameObject;
	appController = controllerObject.GetComponent(CC_ApplicationController);
	
	windowObject = this.gameObject;
	panelObject = GameObject.Find("Panel - Main Panel").gameObject;
	
	windowObject.transform.parent = panelObject.transform;
	appController.RegisterWindow(windowObject);
	if(setOwnBackdrop) {
	
		GameObject.Find("Window - Persistent Controls").gameObject.GetComponent(MeshRenderer).enabled = false;
		this.gameObject.GetComponent(MeshRenderer).enabled = true;
	} else {
	
		GameObject.Find("Window - Persistent Controls").gameObject.GetComponent(MeshRenderer).enabled = true;
		this.gameObject.GetComponent(MeshRenderer).enabled = false;
	}
}