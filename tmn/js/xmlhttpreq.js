/**
 * Created by david on 12/28/15.
 */

function addStorage() {
    /*if (localStorage.length > 0)
        clearStorage();*/
    if (sessionStorage.length > 0)
        clearStorage();
    var sIndex = document.getElementById("qbid");
    var key = sIndex.selectedIndex;
    var data = sIndex.options[sIndex.selectedIndex].value;

    //localStorage setItem
    /*if ("localStorage" in window && key != 0 && data != '') {
        localStorage.setItem(key, data);
        location.reload();
    } else {
        changeStatus('clearid', 'block');
    }*/

    //sessionStorage setItem
    if ("sessionStorage" in window && key != 0 && data != '') {
        sessionStorage.setItem(key, data);
        location.reload();
    } else {
        changeStatus('clearid', 'block');
    }
}

function removeStorage() {
    var key = document.getElementById('removeKey');

    //localStorage removeItem
    /*if ("localStorage" in window) {
        if (localStorage.length > 0) {
            localStorage.removeItem(key.value);
            location.reload();
        }
    } else {
        alert("no localStorage in window");
    }*/

    //sessionStorage removeItem
    if ("sessionStorage" in window) {
        if (sessionStorage.length > 0) {
            sessionStorage.removeItem(key.value);
            location.reload();
        }
    } else {
        alert("no sessionStorage in window");
    }
}

function clearStorage() {
    //localStorage clear
    /*if ("localStorage" in window) {
        if (localStorage.length > 0) {
            localStorage.clear();
            location.reload();
        } else {
            changeStatus('clearid', 'block');
        }
    } else {
        alert("no localStorage in window");
    }*/

    //sessionStorage clear
    if ("sessionStorage" in window) {
        if (sessionStorage.length > 0) {
            sessionStorage.clear();
            location.reload();
        } else {
            changeStatus('clearid', 'block');
        }
    } else {
        alert("no sessionStorage in window");
    }
}

window.onload = function(){
    document.getElementById("clearid").hidden = true;
    var localhtml = "";
    var sessionhtml = "";

    /*if (localStorage.length > 0) {
        sendRequest(localStorage.getItem(localStorage.key(0)), nflQBRequest);
        changeStatus('clearid', 'none');
        changeStatus('detailsid','block');
    } else {
        //clearStorage();
        changeStatus('clearid', 'block');
    }*/

    if (sessionStorage.length > 0) {
        sendRequest(sessionStorage.getItem(sessionStorage.key(0)), nflQBRequest);
        changeStatus('clearid', 'none');
        changeStatus('detailsid','block');
    } else {
        //clearStorage();
        changeStatus('clearid', 'block');
    }
}


/* XMLHTTP */

function sendRequest(url,callback,postData) {
    var req = createXMLHTTPObject();
    if (!req) return;
    var method = (postData) ? "POST" : "GET";
    req.open(method,url,true);
    req.setRequestHeader('Accept','XMLHTTP/1.0');
    req.page = url;
    if (postData)
        req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    req.onreadystatechange = function () {
        if (req.readyState != 4) return;
        if (req.status != 200 && req.status != 304) {
            console.log('HTTP error ' + req.status);
            return;
        }
        callback(req);
    }
    if (req.readyState == 4) return;
    req.send(postData);
}

function XMLHttpFactories() {
    return [
        function () {return new XMLHttpRequest()},
        function () {return new ActiveXObject("Msxml2.XMLHTTP")},
        function () {return new ActiveXObject("Msxml3.XMLHTTP")},
        function () {return new ActiveXObject("Microsoft.XMLHTTP")}
    ];
}

function createXMLHTTPObject() {
    var xmlhttp = false;
    var factories = XMLHttpFactories();
    for (var i=0;i<factories.length;i++) {
        try {
            xmlhttp = factories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}

function nflQBRequest(req){
    //retrieve result as a JavaScript object
    var jsondata=eval("("+req.responseText+")"),
        headers=jsondata.header,
        allrows=jsondata.rows,
        output='<table>',
        photoimg='',
        playerName='',
        playerAll='',
        totrows=jsondata.totalRows,
        headlen=headers.length,
        att='',
        cmp='',
        psyds='',
        yds_att='',
        cmp_per='';

    output+='<thead>'
    output+='<tr>'
    for (var i=0; i<headlen+2; i++){
        switch (i){
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3: // season year
                output+='<th>';
                output+=headers[i].desc+'</th>';
                output+='&nbsp';
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
            case 8: // playerAll
                output+='<th>';
                output+=headers[i].label+'</th>';
                output+='&nbsp';
                break;
            case 9:
                break;
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18: // all stats
                output+='<th>';
                output+=headers[i].label+'</th>';
                output+='&nbsp';
                break;
            case 19: // Yds/Att
                output+='<th>';
                output+='Yds/Att';
                output+='</th>';
                output+='&nbsp';
                break;
            case 20: // Cmp%
                output+='<th>';
                output+="Cmp%";
                output+='</th>';
                output+='&nbsp';
                break;
        }

    }
    output+='</tr></thead>';
    if (totrows != allrows.length) {
        console.log("Row data count mismatch");
    }

    output+='<tbody>';
    for (var i=0;i<allrows.length; i++){
        output+='<tr>';
        for (var j=0; j<headlen+2; j++){
            var rowdata=allrows[i][j]
//                            console.log(rowdata)
            switch (j) {
                case 0: //playerId
                    break;
                case 1: // fullName
                    playerName=rowdata;
                    break;
                case 2: // playerImage
                    photoimg=rowdata;
                    break;
                case 3: // seasonYear
                    output+='<td>'+rowdata+'</td>';
                    break;
                case 4: // week
                    break;
                case 5: // gameDate
                    break;
                case 6: // team text
                    break;
                case 7: // team img
                    playerAll='<figure><img src="'+photoimg+'"><figcaption>'+playerName+'</figcaption></figure><figure><img src="'+rowdata+'"></figure>';
                    break;
                case 8: // opponent
                    output+='<td>'+rowdata+'</td>';
                    break;
                case 9: // opponent img
                    break;
                case 10: // Att (passing)
                    att=rowdata;
                    output+='<td>'+att+'</td>';
                    break;
                case 11: // cmp (passing)
                    cmp=rowdata;
                    output+='<td>'+cmp+'</td>';
                    break;
                case 12: // sack
                    output+='<td>'+rowdata+'</td>';
                    break;
                case 13: // Int
                    output+='<td>'+rowdata+'</td>';
                    break;
                case 14: // PsYds
                    psyds=rowdata;
                    output+='<td>'+psyds+'</td>';
                    break;
                case 15: // PsTD
                    output+='<td>'+rowdata+'</td>';
                    break;
                case 16: // Rush
                    output+='<td>'+rowdata+'</td>';
                    break;
                case 17: // RushYds
                    output+='<td>'+rowdata+'</td>';
                    break;
                case 18: // RshTD
                    output+='<td>'+rowdata+'</td>';
                    break;
                case 19: // PsYds/Att
                    yds_att=psyds/att;
                    output+='<td>'+yds_att.toFixed(1)+'</td>';
                    break;
                case 20: // Cmp%
                    cmp_per=(cmp/att)*100;
                    output+='<td>'+cmp_per.toFixed(1)+'</td>';
                    break;
            }
        }
        output+='</tr>';
    }

    output+='</tbody></table>';

    document.getElementById("playerall").innerHTML=playerAll;

    document.getElementById("result").innerHTML=output;
}
