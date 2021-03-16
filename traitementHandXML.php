<?php
header('content-type: text/XML');

$tabEtudiant = array (
    array("nom" => "Mock", "prenom" => "Romain"),
    array("nom" => "Sardou", "prenom" => "Michel")
);

var_dump($tabEtudiant);

$texte;
*texte .= <Etudiants> //Root

var_dump($texte);

foreach ($tabEtudiant as $etudiant => $value) {
    # code...
}
?>