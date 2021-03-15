var XMLDoc;

function parseXMLFile(texteXML)
{
    var parser = new DOMParser();
    XMLDoc = parser.parseFromString(texteXML, "text/html");

    var films = XMLDoc.getElementsByTagName("titre");
    document.getElementById("areaTitres").innerHTML = films;
    //document.getElementById("areaFilms").innerHTML = XMLDoc.responseText;
}

function getXML()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200)
        {
            var parser = new DOMParser();
            XMLDoc = parser.parseFromString(this.responseText, "text/html");

            document.getElementById("areaFilms").innerHTML = this.responseText;
            var films = XMLDoc.getElementsByTagName("titre");
            var titres = "";
            var infos = "";
            var reals = XMLDoc.getElementsByTagName("realisateur");
            var dates = XMLDoc.getElementsByTagName("date");
            
            for (let index = 0; index < films.length; index++) {
                const element = films[index];
                const element2 = reals[index];
                const element3 = dates[index];

                titres = titres + element.innerHTML + "\n";
                infos = infos + "Film : " + element.innerHTML + " Réal : " + element2.innerHTML + " Date : " + element3.innerHTML + "\n";
            }
            document.getElementById("areaTitres").innerHTML = titres;
            document.getElementById("areaInfos").innerHTML = infos;
        }
    };
    xhttp.open("GET", "http://film/Films/MesFilms.xml", true);
    xhttp.send();
}