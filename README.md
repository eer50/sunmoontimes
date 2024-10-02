# SunMoonTimes
A JavaScript library to calculate sunrise, sunset, moonrise, moonset and twilight times based on latitude, longitude, date, and timezone.  
see live demo: https://eer50.github.io/sunmoontimes/

## Demo
You can check out a live demo of the library [here](https://eer50.github.io/sunmoontimes/).

## Example Usage
```
    // Call Main with desired values
    var latitude = 30.0444; // Set latitude
    var longitude = 31.2357; // Set longitude
    var timezone = 3; // Set timezone offset
    var date = new Date(); // Set the date
    var timeformat = "12h"; // Set timeFormat

    // Create an instance of Main
    var sunMoonTimes = new Main(latitude, longitude, timezone, date, timeformat);
    
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
### Time Formats  
Here are the available time formats:
| Format | Description                    | Example  |
|--------|--------------------------------|----------|
| 24h    | 24-hour time format            | 16:45    |
| 12h    | 12-hour time format            | 4:45 pm  |
| 12hNS  | 12-hour format with no suffix  | 4:45     |

## Credits
The original functions were adapted from http://hinch.me.uk/riset.html.

## License
This project is licensed under the ISC License.
