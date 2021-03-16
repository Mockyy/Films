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
    };
<<<<<<< Updated upstream:Filmjs.js
    xhttp.open("GET", "https://film/Films/MesFilms.xml", true);
=======
    xhttp.open("GET", "http://film/MesFilms.xml", true);
>>>>>>> Stashed changes:Film.js
    xhttp.send();
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
                console.log("Titre : " + tableauNom[i - 1][0] + " / Réalisateur : " + tableauReal[i - 1][0] + " / Date : " + tableauDate[i - 1][0] + "\n");
            }
        }
    };

    xhttp.open("GET", "http://film/MesFilms.xml", true);
    xhttp.send();
}

function afficherReal(selectValue)
{
    var listeRealDom = document.getElementById("listeReal");
    var listeReal = [];

    var reals = XMLDoc.getElementsByTagName("film");

    for (let index = 0; index < reals.length; index++) {
        const element = reals[index];

        if(element.getElementsByTagName("realisateur")[0].innerText == selectValue)
        {
            console.log(element);
            listeReal.push(element);
        }
    }

    listeRealDom.innerHTML = listeReal.innerHTML;
}