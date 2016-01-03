/**
 * Created by david on 12/28/15.
 */
function ReplaceContent(id,content) {
    if (document.getElementById || window.location){
        var container = document.getElementById(id);
        container.innerHTML = content;
        window.location = '#' + id;
    }
}

function changeStatus(id, status) {
    if (document.getElementById){
        var elId = document.getElementById(id);
        elId.style.display = status;
    }
}
