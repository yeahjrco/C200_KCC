#pragma strict

@script RequireComponent(BoxCollider);
@script RequireComponent(SpriteRenderer);

var mainTexture: Sprite;
var altTexture: Sprite;

private var panelObject: GameObject;
private var isActive: boolean = false;
private var spriteRenderer: SpriteRenderer;
private var appController: CC_ApplicationController;

function Start() {
	
	var controllerObject = GameObject.FindGameObjectWithTag("GameController").gameObject;
	appController = controllerObject.GetComponent(CC_ApplicationController);
	panelObject = GameObject.Find("Panel - Main Panel").gameObject;
	
	DontDestroyOnLoad(transform.parent.gameObject);
	transform.parent.transform.parent = panelObject.transform;
	spriteRenderer = this.gameObject.GetComponent(SpriteRenderer);
}

function OnMouseDown() {
	// Handles scene loading and garbage collection
	// Triggers texture swapping of button
	
	if(isActive) {
		
		Debug.Log("Toggled " + this.gameObject.name.ToString() + " off.");
		spriteRenderer.sprite = mainTexture;
		animation.Play("CC_slideRight");
		isActive = false;
	} else {
		
		Debug.Log("Toggled " + this.gameObject.name.ToString() + " on.");
		spriteRenderer.sprite = altTexture;
		animation.Play("CC_slideLeft");
		isActive = true;
	}
}