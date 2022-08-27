var InstaUser = window.location.href.split('instagram.com')[1].split('/')[1];
var followersCount, followingCount;
getFollowCount(InstaUser);

function getFollowCount(user) {
    url = 'https://www.instagram.com/' + user + '/?__a=1';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var getJSON = JSON.parse(this.responseText);
            if (getJSON.graphql.user.edge_follow) {
                followingCount = getJSON.graphql.user.edge_follow.count || 'Total' ;
                followersCount = getJSON.graphql.user.edge_followed_by.count || 'Total';
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
var listT = document.querySelectorAll('.m82CD')[0] || document.querySelectorAll('.m82CD > div')[0];
if (listT.innerText == 'Followers') {
    getList(followersCount, ' Followers');
} else if (listT.innerText == 'Following') {
    getList(followingCount, ' Following');
}

function getList(count, listType) {
    csv = listType + '\n';
    var elem = document.querySelectorAll('.FPmhX.notranslate._0imsa');
    if (elem.length == count) {
        createCSV(elem, listType);
    } else {
        var msg = elem.length + listType + ' out of  ' + count + listType + '\n\nPress "OK" to save the CSV file.\nPress "Cancel" to continue to load followers.';
        var actionR = confirm(msg);
        if (actionR == true) {
            createCSV(elem, listType);
        }
    }
}

function createCSV(elem, listType) {
    for (var i = 0; i < elem.length; i++) {
        csv = csv + elem[i].innerHTML + "\n";
    }
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = InstaUser + ' ' + listType + ' List ' + getCurTime() + '.csv';
    hiddenElement.click();
}

function getCurTime() {
    var currentdate = new Date();
    var datetime = " as on " + currentdate.getDate() + " " + (currentdate.toLocaleString('default', {
        month: 'long'
    })) + " " + currentdate.getFullYear() + " at " + currentdate.getHours() + "h_" + currentdate.getMinutes() + "m_" + currentdate.getSeconds() + "s";
    return datetime;
}