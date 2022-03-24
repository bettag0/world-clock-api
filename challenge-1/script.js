var proxyCors = 'https://cors-anywhere.herokuapp.com/';

function easternTimeButtonClick(){ 
    getJSON('http://worldclockapi.com/api/json/est/now');
};

function coordinatedUniversalButtonClick(){ 
    getJSON('http://worldclockapi.com/api/json/utc/now');
};

function centralEuropeanTimeButtonClick(){ 
    getJSON('http://worldclockapi.com/api/jsonp/cet/now?callback=mycallback');
};

function buildPage(req){
    $('#content').text(req.response);
    var json = JSON.parse(req.response);
    var time = json['currentDateTime'].replace('T', ' ');
    var dayWeek = json['dayOfTheWeek'];
    var timeZone = json['timeZoneName'];
    var p = document.createElement('p');
    var pText = document.createTextNode('Current Date Time: ' + time);
    p.append(pText);
    $('#content').append(p);
    p = document.createElement('p');
    pText = document.createTextNode('Day of the Week: ' + dayWeek);
    p.append(pText);
    $('#content').append(p);
    p = document.createElement('p');
    pText = document.createTextNode('Time Zone: ' + timeZone);
    p.append(pText);
    $('#content').append(p);

    $('#easternTime').hide();
    $('#coordinatedTime').hide();
    $('#centralEuropeanTime').hide();
    $('#content').show();
}

function returnClick(){
    $('#easternTime').show();
    $('#coordinatedTime').show();
    $('#centralEuropeanTime').show();
    $('#content').hide();
}

getJSON = function(url){   
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader("Access-Control-Allow-Origin", "*");
    req.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    req.setRequestHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    req.setRequestHeader("Acces-Control-Max-Age", "86400");

    req.onload = function() {
        var statusHttp = req.status;
        if(statusHttp == 200){
            console.log('Status: ', req.status + ' Response:', req.response);
            buildPage(req);
        }
        else{
            console.error('Status: ', req.status + ' Response:', req.response);
        }
    };

    req.send(); 
};

$('#content').hide();
