var XMLDoc;
var XMLPath = "MesFilms.xml"

function parseXMLFile(texteXML)
{
    var parser = new DOMParser();
    XMLDoc = parser.parseFromString(texteXML, "text/html");

    var films = XMLDoc.getElementsByTagName("titre");
    document.getElementById("areaTitres").innerHTML = films;
}

function getXML()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200)
        {
            fillTextAreas(this);
        }
    };
    xhttp.open("GET", XMLPath, true);
    xhttp.send();
}

function fillTextAreas(xml)
{
    var parser = new DOMParser();
    XMLDoc = parser.parseFromString(xml.responseText, "text/html");

    document.getElementById("areaFilms").innerHTML = xml.responseText;

    var films = XMLDoc.getElementsByTagName("film");

    var titres = XMLDoc.getElementsByTagName("titre");
    var strtitres = "";
    var infos = "";
    var reals = XMLDoc.getElementsByTagName("realisateur");
    var dates = XMLDoc.getElementsByTagName("date");

    var selectReal = document.getElementById("selectReal");
    var newReal = "";
    
    for (let index = 0; index < films.length; index++) {
        const element = titres[index];
        const element2 = reals[index];
        const element3 = dates[index];
        
        strtitres = strtitres + element.innerHTML + "\n";
        infos = infos + "Film : " + element.innerHTML + " Réal : " + element2.innerHTML + " Date : " + element3.innerHTML + "\n";
        
        var newOption = document.createElement('option');
        newOption.setAttribute('value', element2.innerHTML);
        newOption.innerText = element2.innerHTML;
        newOption = selectReal.appendChild(newOption);
    }

    document.getElementById("areaTitres").innerHTML = strtitres;
    document.getElementById("areaInfos").innerHTML = infos; 
}

function XMLSplit()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200)
        {
            var strDoc = this.responseText;

            const titres = strDoc.split('<titre>');
            const real = strDoc.split('<realisateur>');
            const date = strDoc.split('<date>');

            var tableauNom = [''];
            var tableauDate = [''];
            var tableauReal = [''];

            for (let i = 1; i < titres.length; i++) {
                tableauNom[i - 1] = titres[i].split('</titre>');
                tableauReal[i - 1] = real[i].split('</realisateur>');
                tableauDate[i - 1] = date[i].split('</date>');
                
                document.getElementById("listeSplit").innerHTML += "Titre : " + tableauNom[i - 1][0] + " / Réalisateur : " + tableauReal[i - 1][0] + " / Date : " + tableauDate[i - 1][0] + "\n";
            }
        }
    };

    xhttp.open("GET", XMLPath, true);
    xhttp.send();
}

function afficherReal(selectValue)
{
    // var listeRealDom = document.getElementById("listeReal");
    // var listeReal = [];

    // var reals = XMLDoc.getElementsByTagName("film");

    // for (let index = 0; index < reals.length; index++) {
    //     const element = reals[index];

    //     if(element.getElementsByTagName("realisateur")[0].innerText == selectValue)
    //     {
    //         console.log(element);
    //         listeReal.push(element);
    //     }
    // }

    // listeRealDom.innerHTML = listeReal;
    // console.table(listeReal);

    var x = XMLDoc.getElementsByTagName('film');

    var liste = document.getElementById('listeReal');
    liste.innerHTML = '';


    for(i = 0; i < x.length; i++)
    {
        for(var j = 0; j < selectValue.selectedOptions.length; j++)
        {
            if(x[i].getAttribute('idreal') == selectValue.selectedOptions[j].value)
            {
                var li = document.createElement('li');
                var txt = document.createTextNode(x[i].firstChild.nextSibling.firstChild.textContent);
                li.appendChild(txt);
                document.getElementById('listeReal').appendChild(li);
            }
        }
    }
}

var pButton = document.getElementById("pButton").addEventListener("click", XMLSplit);

var xButton = document.getElementById("xPathCick").addEventListener("click", xpath);

function xpath()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200)
        {
            showResults(xhttp.responseXML);
        }
    };
    xhttp.open("GET", XMLPath, true);
    xhttp.send();
}

function showResults(xml)
{
    var txt = "";

    path = "lesfilms/film[date>1960]/titre";

    if (xml.evaluate)
    {
        var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();
        while (result)
        {
            txt += "Noeud : " + result.childNodes[0].nodeName + " | " + result.childNodes[0].nodeValue + "\n";
            result = nodes.iterateNext();
        }
    }
    else if (window.ActiveXObject || xhttp.responseType == "msxml-document")
    {
        xml.setProperty("SelectionLanguage", "XPath");
        nodes = xml.selectNodes(path);
        for (var i = 0; i < nodes.length; i++)
        {
            txt += nodes[i].childNodes[0].nodeValue + "</br>";
        }
    }
    document.getElementById("xPathFilms").innerText = txt;

    //afficher noeud du titre 1, du dernier titre, valeur contenue dans le noeud
}