var offset;
var loop;
var newRGBColor = new RGBColor();

app.executeMenuCommand("group");

var win = new Window("dialog", "Enter Values");
var fieldsGroup = win.add("group");
fieldsGroup.orientation = "row";
fieldsGroup.alignChildren = ["left", "center"];

fieldsGroup.add("statictext", undefined, "Offset:");
var offsetField = fieldsGroup.add("edittext", undefined, "10");
offsetField.alignment = ["fill", "center"];
offsetField.size = [80, 30];

fieldsGroup.add("statictext", undefined, "Loop:");
var loopField = fieldsGroup.add("edittext", undefined, "1");
loopField.alignment = ["fill", "center"];
loopField.size = [80, 30];

var submitBtn = win.add("button", undefined, "Ok");
submitBtn.size = [200, 40];
submitBtn.alignment = ["center", "bottom"];
submitBtn.onClick = function() {
    offset = offsetField.text;
    loop = loopField.text;
    win.close();
};

var cancelBtn = win.add("button", undefined, "Cancel");
cancelBtn.size = [200, 40];
cancelBtn.alignment = ["center", "bottom"];
cancelBtn.onClick = function() {
    win.close();
};

win.show();
    for(var i = 0; i < loop; i++)
    {
       if(i==0)
       {
        newRGBColor.red = 255; newRGBColor.green = 255; newRGBColor.blue = 255;
       }
       else
       {
        var randomNumber = Math.floor(Math.random() * 255);
        newRGBColor.red = randomNumber; newRGBColor.green = randomNumber; newRGBColor.blue = randomNumber;
       }
        Outline();
    }


function Outline()
{
    var xmlstring = '<LiveEffect name="Adobe Offset Path"><Dict data="R mlim 4 R ofst ' + offset + ' I jntp 0 "/></LiveEffect>';
    var sel = app.activeDocument.selection;
    sel[0].duplicate();
    sel[0].zOrder(ZOrderMethod.SENDTOBACK);
    app.executeMenuCommand ('Live Outline Stroke');
    app.activeDocument.selection = null; 
    app.activeDocument.selection = sel; 
    app.executeMenuCommand('Live Pathfinder Add');
    app.selection[0].applyEffect(xmlstring);
    app.executeMenuCommand ('Live Outline Stroke');
    app.executeMenuCommand ('expandStyle');
    app.executeMenuCommand('Live Pathfinder Add');
    app.executeMenuCommand('noCompoundPath');
    app.executeMenuCommand('expandStyle');
    app.selection[0].opacity = 100;  
    app.activeDocument.defaultFillColor = newRGBColor;
}