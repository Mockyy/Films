function nombre_visites()
{
    var nbVisites = localStorage.getItem('visites');

    if (nbVisites != null)
    {
        nbVisites = parseInt(nbVisites);
    }
    else
    {
        nbVisites = 1;
    }

    nbVisites++;

    localStorage.setItem('visites', nbVisites);

    document.getElementById("demo").innerHTML = nbVisites;
}