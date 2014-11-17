#pragma strict

@script RequireComponent(BoxCollider);
@script RequireComponent(SpriteRenderer);

var mainTexture: Sprite;
var altTexture: Sprite;
var disabledTexture: Sprite;
var loadLevel: String;

private var isActive: boolean = false;
private var spriteRenderer: SpriteRenderer;
private var appController: CC_ApplicationController;

function Start() {
	
	var controllerObject = GameObject.FindGameObjectWithTag("GameController").gameObject;
	appController = controllerObject.GetComponent(CC_ApplicationController);
	
	spriteRenderer = this.gameObject.GetComponent(SpriteRenderer);
}

function OnMouseDown() {
	// Handles scene loading and garbage collection
	// Triggers texture swapping of button
	
	if(isActive) {
		
		Debug.Log("Toggled " + this.gameObject.name.ToString() + " off.");
		appController.CleanScene(true);
		isActive = false;
	} else {
		
		Debug.Log("Toggled " + this.gameObject.name.ToString() + " on.");
		appController.CleanScene(false);
		spriteRenderer.sprite = mainTexture;
		isActive = true;
		Application.LoadLevelAdditive(loadLevel);
	}
}

function DeactivateButton() {
	
	if (isActive) {
		return;
	}
	spriteRenderer.sprite = disabledTexture;
	this.gameObject.GetComponent(BoxCollider).enabled = false;
}

function ActivateButton() {
	
	if (isActive) {
		return;
	}
	spriteRenderer.sprite = altTexture;
	this.gameObject.GetComponent(BoxCollider).enabled = true;
}

function ResetButton() {
	
	spriteRenderer.sprite = altTexture;
	isActive = false;
}