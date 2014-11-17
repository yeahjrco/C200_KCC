#pragma strict

var locationsList: StationInfo[];

private var appController: CC_ApplicationController;
private var spriteRenderer: SpriteRenderer;
private var stationImages: Sprite[];
private var currentImage: int = 0;

function Start () {
	
	var controllerObject = GameObject.FindGameObjectWithTag("GameController").gameObject;
	appController = controllerObject.GetComponent(CC_ApplicationController);
	var spriteRendererObject = GameObject.Find("Sprite - Site Image").gameObject;
	spriteRenderer = spriteRendererObject.GetComponent(SpriteRenderer);
	
	yield WaitForSeconds(0.1);
	ActivateStation(appController.locationID);	
	spriteRenderer.sprite = stationImages[currentImage];
}

function ActivateStation(stationID: int) {
	
	for(var stationInfo: StationInfo in locationsList) {
		
		if (stationInfo.stationID == stationID) {
		
			stationImages = stationInfo.images;
		}
	}
}

class StationInfo {
	
	var stationID: int;
	var images: Sprite[];
}

function OnMouseDown() {

	if (currentImage < (stationImages.Length - 1)) {
		currentImage++;
	} else {
		currentImage = 0;
	}
	spriteRenderer.sprite = stationImages[currentImage];
}