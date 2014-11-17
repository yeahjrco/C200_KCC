#pragma strict

@script RequireComponent(SphereCollider);
@script RequireComponent(SpriteRenderer);

var mainTexture: Sprite;
var altTexture: Sprite;
private var url: String = "http://techslides.com/demos/sample-videos/small.mp4";

private var spriteRenderer: SpriteRenderer;

function Start() {
	
	spriteRenderer = this.gameObject.GetComponent(SpriteRenderer);
}

function OnMouseDown() {
	
	Debug.Log("Toggled " + this.gameObject.name.ToString() + " on.");
	spriteRenderer.sprite = altTexture;
	yield WaitForSeconds(0.1);
	Handheld.PlayFullScreenMovie(url, Color.black, FullScreenMovieControlMode.Full, FullScreenMovieScalingMode.AspectFit);
	spriteRenderer.sprite = mainTexture;
	Debug.Log("Toggled " + this.gameObject.name.ToString() + " off.");
}

function DeactivateButton() {

	this.gameObject.SetActive(false);
}

function ActivateButton() {
	
	this.gameObject.SetActive(true);
}