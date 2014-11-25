//#pragma strict
//
//mapGO=GameObject.Find("Window - Map");
//map=mapGO.GetComponent(JC_map);
////variables for scrollMenu
//var scrollPosition : Vector2; 
//var mapGO:GameObject;
//var map:JC_GoogleMapAPI;
//var longString="Direction Listing";
//var steps : direction[];
//
////for listing current route direction
//private var currentSteps : direction[]=new direction[1];
//
////ensure user cannot over click the direction
//private var stepNo:int=0;
//
////check if map.map_id change
//private var oMap_id:int=0;
//
//function Start () {
//
//}
//
//function Update () {
//	if (map.map_id!=oMap_id){
//		longString="";
//		oMap_id=map.map_id;
//		stepNo=0;
//		for(var i=0;i<=steps.Length;i++){
//			if(map.map_id==i && map.map_id!=0){
//			this.currentSteps[0]=steps[i-1];
//	}
//	}
//	}
//	
//
//}
//
//// The variable to control where the scrollview 'looks' into its child elements.
//
//// The string to display inside the scrollview. 2 buttons below add & clear this string.
//
//function OnGUI () {	
//	// Begin a scroll view. All rects are calculated automatically - 
//	// it will use up any available screen space and make sure contents flow correctly.
//	// This is kept small with the last two parameters to force scrollbars to appear.
//	GUILayout.BeginArea(Rect(Screen.width*0.09,Screen.height/4,200,500));
//	scrollPosition = GUILayout.BeginScrollView (scrollPosition);
//	
//	// We just add a single label to go inside the scroll view. Note how the
//	// scrollbars will work correctly with wordwrap.
//		GUILayout.Label (longString);
//				if (GUILayout.Button ("Next Step")){
//		if(stepNo<currentSteps[0].listing.Length){
//			longString+= "\n"+currentSteps[0].listing[stepNo]+"\n";
//			stepNo++;
//		}
//	}
//
//	
//	// Add a button to clear the string. This is inside the scroll area, so it
//	// will be scrolled as well. Note how the button becomes narrower to make room
//	// for the vertical scrollbar
//	// End the scrollview we began above.
//	GUILayout.EndScrollView ();
//	
//	// Now we add a button outside the scrollview - this will be shown below
//	// the scrolling area.
//
//
//	GUILayout.EndArea();
//
//}
//	
//public class direction{
//		var id:int;
//		var listing: String[];
//}