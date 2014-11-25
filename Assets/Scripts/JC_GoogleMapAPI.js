#pragma strict

	var zoomLevel: int = 15;
	var mapSize: int = 128;
	var markers: GoogleMapMarker[];
	var pathWeight: int = 5;
	var paths: GoogleMapPath[];
	
	static var displayPath: GoogleMapPath[]=new GoogleMapPath[1];
	static var displayMark: GoogleMapMarker[]=new GoogleMapMarker[1];
	var centerLocation: GoogleMapLocation;
	
	private var appController: CC_ApplicationController;
	private var currentLocation: Array;
	private var centerCoordinatesDict: Dictionary.<int, Array>;
	private var locationCheckInterval: float = 0;
	
function Start() {

	var controllerObject = GameObject.FindGameObjectWithTag("GameController").gameObject;
	appController = controllerObject.GetComponent(CC_ApplicationController);
	
	centerCoordinatesDict = new Dictionary.<int, Array>();
	centerCoordinatesDict[1] = new Array(1.3265, 103.9221);
	centerCoordinatesDict[2] = new Array(1.3247795, 103.922951);
	centerCoordinatesDict[3] = new Array(1.3247469, 103.92424511);
	centerCoordinatesDict[4] = new Array(1.3256452, 103.9240954);
	
	currentLocation = appController.GetUserLocation();
	ActivateWalkGuide(appController.locationID);
}

function Update() {

	if (locationCheckInterval <= 0) {
	
		currentLocation = appController.GetUserLocation();
		locationCheckInterval = appController.locationCheckInterval;
		Refresh();
	} else {
		
		locationCheckInterval -= Time.deltaTime;
	}
}

function ActivateWalkGuide(stationID: int) {
	
	Debug.Log("Activating Walk Guide ID: " + stationID);
	var centerLat = centerCoordinatesDict[stationID][0];
	var centerLon = centerCoordinatesDict[stationID][1];
	
	this.centerLocation = new GoogleMapLocation("", centerLat, centerLon) ;
	this.displayPath[0] = paths[stationID - 1];
	this.displayMark[0] = markers[stationID - 1];
}

function Refresh() {

	var url = "http://maps.googleapis.com/maps/api/staticmap";
	var qs = "";
	if (centerLocation.address != "")
		qs += "center=" + WWW.EscapeURL(centerLocation.address);
	else
		qs += "center=" + WWW.EscapeURL(String.Format("{0},{1}", centerLocation.latitude, centerLocation.longitude));
	qs += "&zoom=" + zoomLevel.ToString();
	qs += "&size=" + WWW.EscapeURL(String.Format("{0}x{0}", mapSize));
	qs += "&scale=2&maptype=roadmap&sensor=true";
	
	var currentLat = currentLocation[0];
	var currentLon = currentLocation[1];
	
	qs += "&markers=size:small|color:green|" + WWW.EscapeURL(String.Format("{0},{1}", currentLat, currentLon));
	
	for(i in displayMark) {
	
		qs += "&markers=size:large|color:gray|label:" + i.label;
		for(loc in i.locations) {
		
			if(loc.address != "")
				qs += "|" + WWW.EscapeURL(loc.address);
			else
				qs += "|" + WWW.EscapeURL(String.Format("{0},{1}", loc.latitude, loc.longitude));
		}
	}
	for(i in displayPath) {
	
		qs += "&path=weight:" + pathWeight + "|color:green";
		for(loc in i.locations) {
		
			if(loc.address != "")
				qs += "|" + WWW.EscapeURL(loc.address);
			else
				qs += "|" + WWW.EscapeURL (String.Format ("{0},{1}", loc.latitude, loc.longitude));
		}
	}
	
	var req = WWW(url + "?" + qs);
	
	while(!req.isDone)
		yield;
	if(req.error == null) {
	
		var tex = new Texture2D(mapSize, mapSize);
		tex.LoadImage(req.bytes);
		renderer.material.mainTexture = tex;
	}
	yield WaitForEndOfFrame();
}

public enum GoogleMapColor {

	green,
	gray,
}

public class GoogleMapLocation {

	var address: String;
	var latitude: float;
	var longitude: float;
	
	function GoogleMapLocation(address: String,latitude: float,longitude: float){
	
		this.address=address;
		this.latitude=latitude;
		this.longitude=longitude;
	}
}

public class GoogleMapMarker {

	var label: String;
	var locations: GoogleMapLocation[];
}

public class GoogleMapPath {

	var locations: GoogleMapLocation[];	
}