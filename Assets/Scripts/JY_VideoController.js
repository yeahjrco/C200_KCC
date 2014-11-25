#pragma strict

@script RequireComponent(BoxCollider);
@script RequireComponent(SpriteRenderer);

var mainTexture: Sprite;
var altTexture: Sprite;
var disabledTexture: Sprite;

private var url: String = "http://techslides.com/demos/sample-videos/small.mp4";

private var spriteRenderer: SpriteRenderer;

function Start() {
	
	spriteRenderer = this.gameObject.GetComponent(SpriteRenderer);
}

function OnMouseDown() {
	
	Debug.Log("Toggled " + this.gameObject.name.ToString() + " on.");
	spriteRenderer.sprite = mainTexture;
	yield WaitForSeconds(0.1);
	Handheld.PlayFullScreenMovie(url, Color.black, FullScreenMovieControlMode.Full, FullScreenMovieScalingMode.AspectFit);
	ResetButton();
	Debug.Log("Toggled " + this.gameObject.name.ToString() + " off.");
}

function DeactivateButton() {

	spriteRenderer.sprite = disabledTexture;
	this.gameObject.GetComponent(BoxCollider).enabled = false;
}

function ActivateButton() {
	
	spriteRenderer.sprite = altTexture;
	this.gameObject.GetComponent(BoxCollider).enabled = true;
}

function ResetButton() {
	
	spriteRenderer.sprite = altTexture;
}