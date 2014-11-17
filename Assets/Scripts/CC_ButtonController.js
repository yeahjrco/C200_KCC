#pragma strict

@script RequireComponent(SphereCollider);
@script RequireComponent(SpriteRenderer);

var mainTexture: Sprite;
var altTexture: Sprite;
var loadLevel: String;

private var isActive: boolean = false;
private var spriteRenderer: SpriteRenderer;
private var appController: CC_ApplicationController;

function Start() {
	
	var controllerObject = GameObject.FindGameObjectWithTag("GameController").gameObject;
	appController = controllerObject.GetComponent(CC_ApplicationController);
	
	spriteRenderer = this.gameObject.GetComponent(SpriteRenderer);
	
	spriteRenderer.sprite = mainTexture;
}

function OnMouseDown() {
	// Handles scene loading and garbage collection
	// Triggers texture swapping of button
	
	if(isActive) {
		
		Debug.Log("Toggled " + this.gameObject.name.ToString() + " off.");
		spriteRenderer.sprite = mainTexture;
		isActive = false;
		appController.CleanScene(true);
	} else {
		
		Debug.Log("Toggled " + this.gameObject.name.ToString() + " on.");
		spriteRenderer.sprite = altTexture;
		isActive = true;
		appController.CleanScene(false);
		Application.LoadLevelAdditive(loadLevel);
	}
}

function DeactivateButton() {

	this.gameObject.SetActive(false);
}

function ActivateButton() {
	
	this.gameObject.SetActive(true);
}