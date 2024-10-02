
    function Main(latitude, longitude, timezone, date, format) {
    timeFormat = format;
    // Store results as properties of the Main function
    this.sunrise = null;
    this.sunset = null;
    this.moonrise = null;
    this.moonset = null;
    this.civilTwilightBegin = null;
    this.civilTwilightEnd = null;
    this.nauticalTwilightBegin = null;
    this.nauticalTwilightEnd = null;
    this.astronomicalTwilightBegin = null;
    this.astronomicalTwilightEnd = null;

    var OutString = "";
    var calend;
    var quady = new Array;
    var sunp = new Array;
    var moonp = new Array;
    var y, m, day, glong, glat, tz, numday, mj, lst1, i;
    var rads = 0.0174532925, sinmoonalt;

    function getCurrentDateInfo(date) {
        var currentDate = new Date(date);
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
        var day = currentDate.getDate();

        return {
            year: year,
            month: month,
            day: day
        };
    }

    // Use the passed-in values for latitude, longitude, and timezone
    var enteredLong = longitude; // Longitude from the function argument
    var enteredLat = latitude; // Latitude from the function argument
    var enteredTz = timezone; // Timezone from the function argument

    var long = enteredLong;
    var lat = enteredLat;
    var tz = enteredTz;

    var currentDateInfo = getCurrentDateInfo(date);

    y = parseInt(currentDateInfo.year, 10);
    m = parseInt(currentDateInfo.month, 10);
    day = parseInt(currentDateInfo.day, 10);
    numday = parseInt(1, 10);
    glong = parseFloat(long);
    glat = parseFloat(lat);
    tz = parseFloat(tz);

    mj = mjd(day, m, y, 0.0);
    
    // Calculate times for the specified date
    OutString += caldat(mj) + " ";

    // Get sun and moon times and assign to properties
    var sunTimes = find_sun_and_twi_events_for_date(mj, tz, glong, glat);
    this.sunrise = sunTimes.sunrise;
    this.sunset = sunTimes.sunset;
    this.civilTwilightBegin = sunTimes.civilTwilightBegin;
    this.civilTwilightEnd = sunTimes.civilTwilightEnd;
    this.nauticalTwilightBegin = sunTimes.nauticalTwilightBegin;
    this.nauticalTwilightEnd = sunTimes.nauticalTwilightEnd;
    this.astronomicalTwilightBegin = sunTimes.astronomicalTwilightBegin;
    this.astronomicalTwilightEnd = sunTimes.astronomicalTwilightEnd;
    
    var moonTimes = find_moonrise_set(mj, tz, glong, glat);
    this.moonrise = moonTimes.moonrise;
    this.moonset = moonTimes.moonset;

    // Logging output
    OutString += `Sunrise: ${this.sunrise}, Sunset: ${this.sunset}, Moonrise: ${this.moonrise}, Moonset: ${this.moonset}`;
    console.log(OutString);
}

var timeFormat;
  
  function hrsmin(hours) {
      var hrs = Math.floor(hours * 60 + 0.5) / 60.0;
      var h = Math.floor(hrs);
      var m = Math.floor(60 * (hrs - h) + 0.5);
  
      // Use padStart to ensure two-digit formatting
      var formattedHours = h.toString().padStart(2, '0');
      var formattedMinutes = m.toString().padStart(2, '0');
  
      // If '12h' is selected, convert to 12 hour format with suffix
      if (timeFormat === '12h') {
          var suffix = (h >= 12) ? 'PM' : 'AM';
          formattedHours = ((h + 11) % 12 + 1).toString(); // Convert to 12 hour format
          return formattedHours + ':' + formattedMinutes + ' ' + suffix;
      } 
      // Otherwise, return time in 24 hour format
      else if (timeFormat === '24h') {
          return formattedHours + ':' + formattedMinutes;
      } else if (timeFormat === '12hNS') {
          formattedHours = ((h + 11) % 12 + 1).toString(); // Convert to 12 hour format
          return formattedHours + ':' + formattedMinutes;
      }
  }
  
  function ipart(x) {
  //
  //	returns the integer part - like int() in basic
  //
      var a;
      if (x> 0) {
          a = Math.floor(x);
          }
      else {
          a = Math.ceil(x);
          }
      return a;
      }
   
  function frac(x) {
      var a;
      a = x - Math.floor(x);
      if (a < 0) a += 1;
      return a;
      }
     
  function round(num, dp) {
  //   dp = (!dp ? 2: dp);
     return Math.round (num * Math.pow(10, dp)) / Math.pow(10, dp);
      }       
  
  function range(x) {
      var a, b;
      b = x / 360;
      a = 360 * (b - ipart(b));
      if (a  < 0 ) {
          a = a + 360
          }
      return a
      }    
  
  function mjd(day, month, year, hour) {
      var a, b;
      if (month <= 2) {
          month = month + 12;
          year = year - 1;
          }
      a = 10000.0 * year + 100.0 * month + day;
      if (a <= 15821004.1) {
          b = -2 * Math.floor((year + 4716)/4) - 1179;
          }
      else {
          b = Math.floor(year/400) - Math.floor(year/100) + Math.floor(year/4);
          }
      a = 365.0 * year - 679004.0;
      return (a + b + Math.floor(30.6001 * (month + 1)) + day + hour/24.0);
      }
  
  function caldat(mjd) {
      var calout;
      var b, d, f, jd, jd0, c, e, day, month, year, hour;
      jd = mjd + 2400000.5;
      jd0 = Math.floor(jd + 0.5);
      if (jd0 < 2299161.0) {
          c = jd0 + 1524.0;
          }
      else {
          b = Math.floor((jd0 - 1867216.25) / 36524.25);
          c = jd0 + (b - Math.floor(b/4)) + 1525.0;
          }
      d = Math.floor((c - 122.1)/365.25);
      e = 365.0 * d + Math.floor(d/4);
      f = Math.floor(( c - e) / 30.6001);
      day = Math.floor(c - e + 0.5) - Math.floor(30.6001 * f);
      month = f - 1 - 12 * Math.floor(f/14);
      year = d - 4715 - Math.floor((7 + month)/10);
      hour = 24.0 * (jd + 0.5 - jd0);
      hour = hrsmin(hour);
      calout = round(year * 10000.0 + month * 100.0 + day + hour/10000, 4);
      return calout + ""; //making sure calout is a string
      }
  
  function quad(ym, yz, yp) {
      var nz, a, b, c, dis, dx, xe, ye, z1, z2, nz;
      var quadout = new Array;
  
      nz = 0;
      a = 0.5 * (ym + yp) - yz;
      b = 0.5 * (yp - ym);
      c = yz;
      xe = -b / (2 * a);
      ye = (a * xe + b) * xe + c;
      dis = b * b - 4.0 * a * c;
      if (dis > 0)	{
          dx = 0.5 * Math.sqrt(dis) / Math.abs(a);
          z1 = xe - dx;
          z2 = xe + dx;
          if (Math.abs(z1) <= 1.0) nz += 1;
          if (Math.abs(z2) <= 1.0) nz += 1;
          if (z1 < -1.0) z1 = z2;
          }
      quadout[0] = nz;
      quadout[1] = z1;
      quadout[2] = z2;
      quadout[3] = xe;
      quadout[4] = ye;
      return quadout;
      }
       
  function lmst(mjd, glong) {
      var lst, t, d;
      d = mjd - 51544.5
      t = d / 36525.0;
      lst = range(280.46061837 + 360.98564736629 * d + 0.000387933 *t*t - t*t*t / 38710000);
      return (lst/15.0 + glong/15);
      }
   
  function minisun(t) {
      var p2 = 6.283185307, coseps = 0.91748, sineps = 0.39778;
      var L, M, DL, SL, X, Y, Z, RHO, ra, dec;
      var suneq = new Array;
  
      M = p2 * frac(0.993133 + 99.997361 * t);
      DL = 6893.0 * Math.sin(M) + 72.0 * Math.sin(2 * M);
      L = p2 * frac(0.7859453 + M / p2 + (6191.2 * t + DL)/1296000);
      SL = Math.sin(L);
      X = Math.cos(L);
      Y = coseps * SL;
      Z = sineps * SL;
      RHO = Math.sqrt(1 - Z * Z);
      dec = (360.0 / p2) * Math.atan(Z / RHO);
      ra = (48.0 / p2) * Math.atan(Y / (X + RHO));
      if (ra <0 ) ra += 24;
      suneq[1] = dec;
      suneq[2] = ra;
      return suneq;
      }
  
  function minimoon(t) {
      var p2 = 6.283185307, arc = 206264.8062, coseps = 0.91748, sineps = 0.39778;
      var L0, L, LS, F, D, H, S, N, DL, CB, L_moon, B_moon, V, W, X, Y, Z, RHO;
      var mooneq = new Array;
  
      L0 = frac(0.606433 + 1336.855225 * t);	// mean longitude of moon
      L = p2 * frac(0.374897 + 1325.552410 * t) //mean anomaly of Moon
      LS = p2 * frac(0.993133 + 99.997361 * t); //mean anomaly of Sun
      D = p2 * frac(0.827361 + 1236.853086 * t); //difference in longitude of moon and sun
      F = p2 * frac(0.259086 + 1342.227825 * t); //mean argument of latitude
  
      // corrections to mean longitude in arcsec
      DL =  22640 * Math.sin(L)
      DL += -4586 * Math.sin(L - 2*D);
      DL += +2370 * Math.sin(2*D);
      DL +=  +769 * Math.sin(2*L);
      DL +=  -668 * Math.sin(LS);
      DL +=  -412 * Math.sin(2*F);
      DL +=  -212 * Math.sin(2*L - 2*D);
      DL +=  -206 * Math.sin(L + LS - 2*D);
      DL +=  +192 * Math.sin(L + 2*D);
      DL +=  -165 * Math.sin(LS - 2*D);
      DL +=  -125 * Math.sin(D);
      DL +=  -110 * Math.sin(L + LS);
      DL +=  +148 * Math.sin(L - LS);
      DL +=   -55 * Math.sin(2*F - 2*D);
  
      // simplified form of the latitude terms
      S = F + (DL + 412 * Math.sin(2*F) + 541* Math.sin(LS)) / arc;
      H = F - 2*D;
      N =   -526 * Math.sin(H);
      N +=   +44 * Math.sin(L + H);
      N +=   -31 * Math.sin(-L + H);
      N +=   -23 * Math.sin(LS + H);
      N +=   +11 * Math.sin(-LS + H);
      N +=   -25 * Math.sin(-2*L + F);
      N +=   +21 * Math.sin(-L + F);
  
      // ecliptic long and lat of Moon in rads
      L_moon = p2 * frac(L0 + DL / 1296000);
      B_moon = (18520.0 * Math.sin(S) + N) /arc;
  
      // equatorial coord conversion - note fixed obliquity
      CB = Math.cos(B_moon);
      X = CB * Math.cos(L_moon);
      V = CB * Math.sin(L_moon);
      W = Math.sin(B_moon);
      Y = coseps * V - sineps * W;
      Z = sineps * V + coseps * W
      RHO = Math.sqrt(1.0 - Z*Z);
      dec = (360.0 / p2) * Math.atan(Z / RHO);
      ra = (48.0 / p2) * Math.atan(Y / (X + RHO));
      if (ra <0 ) ra += 24;
      mooneq[1] = dec;
      mooneq[2] = ra;
      return mooneq;
      }
  
  function sin_alt(iobj, mjd0, hour, glong, cglat, sglat) {
      var mjd, t, ra, dec, tau, salt, rads = 0.0174532925;
      var objpos = new Array;
      mjd = mjd0 + hour/24.0;
      t = (mjd - 51544.5) / 36525.0;
      if (iobj == 1) {
          objpos = minimoon(t);
                  }
      else {
          objpos = minisun(t);
          }
      ra = objpos[2];
      dec = objpos[1];
      // hour angle of object
      tau = 15.0 * (lmst(mjd, glong) - ra);
      // sin(alt) of object using the conversion formulas
      salt = sglat * Math.sin(rads*dec) + cglat * Math.cos(rads*dec) * Math.cos(rads*tau);
      return salt;
      }
  
  function find_sun_and_twi_events_for_date(mjd, tz, glong, glat) {
    var sglong, sglat, date, ym, yz, above, sunrise, sunset, j;
    var yp, nz, rise, sett, hour, z1, z2, quadout;
    var rads = 0.0174532925;
    var sinho = new Array();
    
    sinho[0] = Math.sin(rads * -0.833); // Sun's altitude for sunrise
    sinho[1] = Math.sin(rads * -6.0);   // Sun's altitude for twilight
    sglat = Math.sin(rads * glat);
    var cglat = Math.cos(rads * glat);
    date = mjd - tz / 24;

    // Initialize output object
    var sunTimes = {
        sunrise: null,
        sunset: null,
        civilTwilightBegin: null,
        civilTwilightEnd: null,
        nauticalTwilightBegin: null,
        nauticalTwilightEnd: null,
        astronomicalTwilightBegin: null,
        astronomicalTwilightEnd: null
    };

    for (j = 0; j < 1; j++) {
        rise = false;
        sett = false;
        hour = 1.0;
        ym = sin_alt(2, date, hour - 1.0, glong, cglat, sglat) - sinho[j];

        while (hour < 25 && (sett == false || rise == false)) {
            yz = sin_alt(2, date, hour, glong, cglat, sglat) - sinho[j];
            yp = sin_alt(2, date, hour + 1.0, glong, cglat, sglat) - sinho[j];
            quadout = quad(ym, yz, yp);
            nz = quadout[0];
            z1 = quadout[1];
            z2 = quadout[2];

            if (nz == 1) {
                if (ym < 0.0) {
                    sunrise = hour + z1;
                    rise = true;
                } else {
                    sunset = hour + z1;
                    sett = true;
                }
            }

            if (nz == 2) {
                if (yz < 0.0) {
                    sunrise = hour + z2;
                    sunset = hour + z1;
                } else {
                    sunrise = hour + z1;
                    sunset = hour + z2;
                }
            }

            ym = yp;
            hour += 2.0;
        }

        if (rise || sett) {
            sunTimes.sunrise = rise ? hrsmin(sunrise) : "----";
            sunTimes.sunset = sett ? hrsmin(sunset) : "----";
            sunTimes.civilTwilightBegin = hrsmin(sunrise - 0.5);
            sunTimes.civilTwilightEnd = hrsmin(sunset + 0.5);
            sunTimes.nauticalTwilightBegin = hrsmin(sunrise - 1.0);
            sunTimes.nauticalTwilightEnd = hrsmin(sunset + 1.0);
            sunTimes.astronomicalTwilightBegin = hrsmin(sunrise - 1.5);
            sunTimes.astronomicalTwilightEnd = hrsmin(sunset + 1.5);
        }
    }

    return sunTimes; // Return the object with sun times
}

function find_moonrise_set(mjd, tz, glong, glat) {
    var sglong, sglat, date, ym, yz, rise, sett, hour, z1, z2, quadout;
    var rads = 0.0174532925;
    var sinho = Math.sin(rads * 8 / 60);
    sglat = Math.sin(rads * glat);
    var cglat = Math.cos(rads * glat);
    date = mjd - tz / 24;
    rise = false;
    sett = false;
    hour = 1.0;
    ym = sin_alt(1, date, hour - 1.0, glong, cglat, sglat) - sinho;

    // Initialize output object
    var moonTimes = {
        moonrise: null,
        moonset: null
    };

    while (hour < 25 && (sett == false || rise == false)) {
        yz = sin_alt(1, date, hour, glong, cglat, sglat) - sinho;
        yp = sin_alt(1, date, hour + 1.0, glong, cglat, sglat) - sinho;
        quadout = quad(ym, yz, yp);
        nz = quadout[0];
        z1 = quadout[1];
        z2 = quadout[2];

        if (nz == 1) {
            if (ym < 0.0) {
                moonrise = hour + z1;
                rise = true;
            } else {
                moonset = hour + z1;
                sett = true;
            }
        }

        if (nz == 2) {
            if (yz < 0.0) {
                moonrise = hour + z2;
                moonset = hour + z1;
            } else {
                moonrise = hour + z1;
                moonset = hour + z2;
            }
        }

        ym = yp;
        hour += 2.0;
    }

    moonTimes.moonrise = rise ? hrsmin(moonrise) : "----";
    moonTimes.moonset = sett ? hrsmin(moonset) : "----";

    return moonTimes; // Return the object with moon times
}

// export
module.exports = PrayTimes;
