#pragma strict

import System.Collections.Generic;

var locationCheckInterval: float = 10;
var locationServiceWaitTime: int = 20;
var debugLocation: int = 0;
var locationID: int = 0;

private var locationRadius: float = 0.000263;
private var objectRegistry: Array;
private var persistentWindow: GameObject;
private var mapObject: GameObject;
private var persistentWindowController: CC_PersistentWindowController;
private var coordinatesDict: Dictionary.<int, Array>;
private var timeInterval: float = 0;

function Awake() {

	Application.LoadLevelAdditive("MT_HeritageMap");
	Application.LoadLevelAdditive("JT_UserGuide");
}

function Start() {
	
	objectRegistry = new Array();
	mapObject = GameObject.Find("Window - Heritage Map").gameObject;
	persistentWindow = GameObject.Find("Window - Persistent Controls").gameObject;
	persistentWindowController = persistentWindow.GetComponent(CC_PersistentWindowController);
	coordinatesDict = new Dictionary.<int, Array>();
	
	// Coordinates 
	coordinatesDict[1] = new Array(1.327655, 103.920311);
	coordinatesDict[2] = new Array(1.325889, 103.922345);
	coordinatesDict[3] = new Array(1.323408, 103.923457);
	coordinatesDict[4] = new Array(1.324512, 103.925444);
	coordinatesDict[5] = new Array(1.326357, 103.922918);
	
	// Check if location service is enabled by user
	if (!Input.location.isEnabledByUser)
		Debug.Log("Enable location service"); 
	else
		StartLocation();
}

function Update(){

	try {
	
		mapObject = GameObject.Find("Window - Heritage Map").gameObject;
		var mapController = mapObject.GetComponent(MT_MapController);
	} catch (NullReferenceException) {
		
		mapObject = null;
	}
	if (timeInterval <= 0) {
	
		locationID = GetLocationID();
		if (locationID != 0) {
			
			Debug.Log("Activating Station with ID: " + locationID);
			persistentWindowController.ActivateButtons();
			if (mapObject != null)
				mapController.ActivateStation(locationID);
		} else {
			
			persistentWindowController.DeactivateButtons();
			if (mapObject != null)
				mapController.DeactivateStations();
		}
		timeInterval = locationCheckInterval;
	} else {
		
		timeInterval -= Time.deltaTime;
	}
}

function CleanScene(loadHeritageMap: boolean) {
	// Destroy all non-persistent objects
	// Clears object registry and reset's persistent window
	
	for(var gameObject: GameObject in objectRegistry) {
	
		Debug.Log("Removed " + gameObject.name.ToString() + " from registry.");
		Destroy(gameObject);
	}
	objectRegistry.Clear();
	persistentWindow.GetComponent(MeshRenderer).enabled = true;
	if (loadHeritageMap)
		Application.LoadLevelAdditive("MT_HeritageMap");
	persistentWindowController.ResetButtons();
}

function RegisterWindow(gameObject: GameObject) {
	// Add object to registry for scene cleaning
	// @ gameObject: GameObject to register 
	
	objectRegistry.Push(gameObject);
	Debug.Log("Added " + gameObject.name.ToString() + " to registry.");
}

function StartLocation() {

	Input.location.Start();
	
	var maxWait : int = locationServiceWaitTime;
	while (Input.location.status == LocationServiceStatus.Initializing && maxWait > 0) {
	
		yield WaitForSeconds (1);
		maxWait--;
	}
	
	if (maxWait < 1) {
	
		Debug.Log("Timed out");
		return;
	}
	
	if (Input.location.status == LocationServiceStatus.Failed) {
	
		Debug.Log("Unable to determine device location");
		return;
	}
}

function GetUserLocation() {
	
	var coordinates: Array = new Array();
	
	coordinates.Push(Input.location.lastData.latitude);
	coordinates.Push(Input.location.lastData.longitude);
	Debug.Log("User Location: " + coordinates);
	//GameObject.Find("Debugger").gameObject.guiText.text = "User Location: " + coordinates;
	
	return coordinates;
}

function GetLocationID() {

	var currentLocation: Array = GetUserLocation();
	
	for (var locationID: int = 1; locationID <= 5; locationID++) {
	
		var locationLat = coordinatesDict[locationID][0];
		var locationLon = coordinatesDict[locationID][1];
			
		if (LocationInRange(currentLocation, locationLat, locationLon))
			return locationID;
	}
	return debugLocation;
}

private function LocationInRange(currentLocation: Array, locationLat: float, locationLon: float) {
	
	var curLat: float = currentLocation[0];
	var curLon: float = currentLocation[1];
	
	var maxLat: float = locationLat + locationRadius;
	var minLat: float = locationLat - locationRadius;
	var maxLon: float = locationLon + locationRadius;
	var minLon: float = locationLon - locationRadius;
	
	var checkLat: boolean = false;
	var checkLon: boolean = false;
	
	checkLat = (curLat >= minLat && curLat <= maxLat);
	checkLon = (curLon >= minLon && curLon <= maxLon);
	
	return (checkLat && checkLon);
}