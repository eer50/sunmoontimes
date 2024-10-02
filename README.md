# sunMoonTimes
A JavaScript library to calculate sunrise, sunset, moonrise, moonset and twilight times based on latitude, longitude, date, and timezone.  
see live demo: https://eer50.github.io/sunmoontimes/
## Example Usage
```
    // Call Main with desired values
    var latitude = 30.0444; // Set latitude
    var longitude = 31.2357; // Set longitude
    var timezone = 3; // Set timezone offset
    var date = new Date(); // Set the date
    var timeformat = "12h"; // Set timeFormat
    
    var sunMoonTimes = new Main(latitude, longitude, timezone, date, timeformat); // Create an instance of Main
    
    // Accessing the times after execution
    document.write("Sunrise:", sunMoonTimes.sunrise, "<br>");
    document.write("Sunset:", sunMoonTimes.sunset, "<br>");
    document.write("Civil Twilight Begin:",sunMoonTimes.civilTwilightBegin, "<br>");
    document.write("Civil Twilight End:",sunMoonTimes.civilTwilightEnd, "<br>");
    document.write("Nautical Twilight Begin:",sunMoonTimes.nauticalTwilightBegin, "<br>");
    document.write("Nautical Twilight End:",sunMoonTimes.nauticalTwilightEnd, "<br>");
    document.write("Astronomical Twilight Begin:",sunMoonTimes.astronomicalTwilightBegin, "<br>");
    document.write("Astronomical Twilight End:",sunMoonTimes.astronomicalTwilightEnd, "<br>");
    document.write("Moonrise:", sunMoonTimes.moonrise, "<br>");
    document.write("Moonset:", sunMoonTimes.moonset);
```
