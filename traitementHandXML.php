<?php

//header('content-type: text/xml');

$tabEtudiant = array (
    array("nom" => "Mock", "prenom" => "Romain"),
    array("nom" => "Sardou", "prenom" => "Michel"),
    array("nom" => "Jean", "prenom" => "Damien"),
    array("nom" => "Vincent", "prenom" => "Francky")
);

var_dump($tabEtudiant);

$txt = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";

$txt .= "<Etudiants>\n";

foreach ($tabEtudiant as $etud) 
{
    $txt .= "\t<Etudiant>\n";

    foreach($etud as $key => $val) 
    {
        $txt .= "\t<$key>". htmlspecialchars($val). "\t</$key>\n";
    }
        
    $txt .= "\t</Etudiant>\n"; //Fin de l’étudiant
}

$txt .= "</Etudiants>\n"; //Fin des étudiant

file_put_contents('Etudiants _txt.xml', $txt);

//var_dump($txt);

?>