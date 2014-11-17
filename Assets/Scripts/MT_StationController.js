#pragma strict

var mainTexture: Sprite;
var altTexture: Sprite;

private var spriteRenderer: SpriteRenderer;

function Start () {

	spriteRenderer = this.gameObject.GetComponent(SpriteRenderer);
	ToggleAltTexture();
}

function GetStationID() {
	
	var stationName = this.gameObject.name;
	
	return System.Int32.Parse(stationName.Substring(stationName.Length - 1));
}

function ToggleMainTexture() {

	spriteRenderer.sprite = mainTexture;
}

function ToggleAltTexture() {

	spriteRenderer.sprite = altTexture;
}