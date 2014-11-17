#pragma strict

private var appController: CC_ApplicationController;
private var stationRegistry: Array;

function Start(){
	
	var controllerObject = GameObject.FindGameObjectWithTag("GameController").gameObject;
	appController = controllerObject.GetComponent(CC_ApplicationController);
	
	stationRegistry = new Array();
	var locationCount = this.gameObject.transform.childCount;	
	for (var i: int = 1; i <= locationCount; i++) {
	
		stationRegistry.Push(GameObject.Find("Icon - Station " + i).gameObject);
	}
	
	yield WaitForSeconds(0.1);
	ActivateStation(appController.locationID);
}

function ActivateStation(stationID: int) {
	
	for(var stationObject: GameObject in stationRegistry) {
		
		var stationController: MT_StationController;
		stationController = stationObject.GetComponent(MT_StationController);
		
		if (stationController.GetStationID() == stationID) {
		
			stationController.ToggleMainTexture();
		} else {
		
			stationController.ToggleAltTexture();
		}
	}
}

function DeactivateStations() {
	
	for(var stationObject: GameObject in stationRegistry) {
		
		var stationController: MT_StationController;
		stationController = stationObject.GetComponent(MT_StationController);
		
		stationController.ToggleAltTexture();
	}
}