#pragma strict

private var targetAspect: float;
private var windowAspect: float;
private var scaleHeight: float;
private var scaleWidth: float;

function Start () 
{
	
    targetAspect = this.gameObject.camera.aspect;
    windowAspect = (Screen.width * 1.0) / Screen.height;
    scaleHeight = windowAspect / targetAspect;
    var cameraRect: Rect = gameObject.camera.rect;
	
    if (scaleHeight < 1.0) {
    	
        cameraRect.width = 1.0;
        cameraRect.height = scaleHeight;
        cameraRect.x = 0;
        cameraRect.y = (1.0 - scaleHeight) / 2.0;
    }
    
    else {
    
        scaleWidth = 1.0 / scaleHeight;
        cameraRect.width = scaleWidth;
        cameraRect.height = 1.0;
        cameraRect.x = (1.0 - scaleWidth) / 2.0;
        cameraRect.y = 0;
    }
    
    this.camera.rect = cameraRect;
}