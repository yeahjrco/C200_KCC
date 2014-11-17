#pragma strict

	public enum MapType
	{
		RoadMap,
		Satellite,
		Terrain,
		Hybrid
	}
	public var map_id : int;
	public var loadOnStart : boolean  = true;
	public var autoLocateCenter : boolean = true;
	public var centerLocation : GoogleMapLocation ;
	public var zoom : int = 13;
	public var mapType : MapType;
	public var size : int = 512;
	public var doubleResolution : boolean = false;
	public var markers : GoogleMapMarker[];
	public var paths : GoogleMapPath[];
	
	public static var displayPath: GoogleMapPath[]=new GoogleMapPath[1];
	public var displayMark: GoogleMapMarker[]=new GoogleMapMarker[1];
	
	private var oZoom = zoom;
	private var oMap_id = map_id;
	
	function Start () {
	 if(loadOnStart) Update();
}

	function Update () {
	if(autoLocateCenter && (markers.Length == 0 && paths.Length == 0)) {
			Debug.LogError("Auto Center will only work if paths or markers are used.");	
		}
	if(zoom!=oZoom||map_id!=oMap_id){
	oZoom=zoom;
	oMap_id=map_id;
	Refresh();
	}
}

	function Refresh()
	{
	if (map_id==1){
	//auto center for id=1
		this.centerLocation = new GoogleMapLocation("",1.326439,103.9221) ;
		this.zoom = 17;
		this.displayPath[0]=paths[0];
		this.displayMark[0]=markers[0];
	}
	else if(map_id==2){
		this.centerLocation= new GoogleMapLocation("",1.3247795,103.922951);
		this.zoom=17;
		this.displayPath[0]=paths[1];
		this.displayMark[0]=markers[1];
	}else if(map_id==3){
		this.centerLocation= new GoogleMapLocation("",1.3247469,103.92424511);
		this.zoom=17;
		this.displayPath[0]=paths[2];
		this.displayMark[0]=markers[2];
	}
	else if(map_id==4){
		this.centerLocation= new GoogleMapLocation("",1.3256452,103.9240954);
		this.zoom=17;
		this.displayPath[0]=paths[3];
		this.displayMark[0]=markers[3];
	}
	
		var url = "http://maps.googleapis.com/maps/api/staticmap";
		var qs = "";
		if (!autoLocateCenter) {
			if (centerLocation.address != "")
				qs += "center=" + WWW.EscapeURL (centerLocation.address);
			else {
				qs += "center=" + WWW.EscapeURL (String.Format ("{0},{1}", centerLocation.latitude, centerLocation.longitude));
			}
		
			qs += "&zoom=" + zoom.ToString ();
		}
		qs += "&size=" + WWW.EscapeURL(String.Format ("{0}x{0}", size));
		qs += "&scale=" + (doubleResolution ? "2" : "1");
		qs += "&maptype=" + mapType.ToString ().ToLower ();
		var usingSensor = false;
#if UNITY_IPHONE
		usingSensor = Input.location.isEnabledByUser && Input.location.status == LocationServiceStatus.Running;
#endif
		qs += "&sensor=" + (usingSensor ? "true" : "false");
		
		for (i in markers) {
			qs += "&markers=" + String.Format ("size:{0}|color:{1}|label:{2}", i.Msize.ToString ().ToLower (), i.color, i.label);
			for (loc in i.locations) {
				if (loc.address != "")
					qs += "|" + WWW.EscapeURL (loc.address);
				else
					qs += "|" + WWW.EscapeURL (String.Format ("{0},{1}", loc.latitude, loc.longitude));
			}
		}
		
		for (i in displayPath) {
			qs += "&path=" + String.Format ("weight:{0}|color:{1}", i.weight, i.color);
			if(i.fill) qs += "|fillcolor:" + i.fillColor;
			for(loc in i.locations) {
				if (loc.address != "")
					qs += "|" + WWW.EscapeURL(loc.address);
				else
					qs += "|" + WWW.EscapeURL (String.Format ("{0},{1}", loc.latitude, loc.longitude));
			}
		}
		
		
		var req = WWW(url + "?" + qs);
		while (!req.isDone)
			yield;
		if (req.error == null) {
			var tex = new Texture2D (size, size);
			tex.LoadImage (req.bytes);
			renderer.material.mainTexture = tex;
		}
		yield WaitForEndOfFrame();
	}
	
	


public enum GoogleMapColor
{
	black,
	brown,
	green,
	purple,
	yellow,
	blue,
	gray,
	orange,
	red,
	white
}


public class GoogleMapLocation
{
	var address : String;
	var latitude : float;
	var longitude : float;
	function GoogleMapLocation(address:String,latitude:float,longitude:float){
		this.address=address;
		this.latitude=latitude;
		this.longitude=longitude;
	}
}


public class GoogleMapMarker
{
	public enum GoogleMapMarkerSize
	{
		Tiny,
		Small,
		Mid
	}
	var Msize : GoogleMapMarkerSize;
	var color : GoogleMapColor;
	var label : String;
	var locations : GoogleMapLocation[];
	
}

public class GoogleMapPath
{
	var weight : int = 5;
	var color : GoogleMapColor;
	var fill : boolean = false;
	var fillColor : GoogleMapColor ;
	var locations : GoogleMapLocation[];	
}