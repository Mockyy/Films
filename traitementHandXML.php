<?php

//header('content-type: text/xml');

$tabEtudiant = array (
    array("nom" => "Mock", "prenom" => "Romain"),
    array("nom" => "Sardou", "prenom" => "Michel"),
    array("nom" => "Jean", "prenom" => "Damien"),
    array("nom" => "Vincent", "prenom" => "Francky")
);

var_dump($tabEtudiant);


/////////////Ecrire le XML à la main//////////////////

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



/////////////XML WRITER///////////////////

$xml2= new XMLWriter();

//Fichier xml de stockage des données

$xml2->openUri("Etudiants_XMLWRITER.xml");

$xml2->setIndent(true);

$xml2->startDocument('1.0', 'utf-8');

$xml2->startElement("Etudiants");

//Boucler sur le tableau des étudiants avec $xml2->writeElement($balise,htmlspecialchars($valeur));
foreach ($tabEtudiant as $etud) {

    $xml2->startElement("Etudiant");

    foreach ($etud as $key => $value) {
        $xml2->writeElement($key, htmlspecialchars($value));
    }
    $xml2->endElement();
}

$xml2->endDocument();


//////////Dans le DOM/////////////
$document = new DomDocument();

$document->preserveWhiteSpace = false;

$document->formatOutput = true;

// on crée la racine <Etudiants> et on l'insère dans le document

$lesEtudiants = $document->createElement('Etudiants');

$document->appendChild($lesEtudiants);

$i = 1;
foreach ($tabEtudiant as $etud) {
    
    //Création d'un nouvel étudiant
    $newEtud = $document->createElement('Etudiant');
    $lesEtudiants->appendChild($newEtud);

    //Ajout de l'attribut id 
    $domAttribute = $document->createAttribute('id');
    $domAttribute->value = $i;
    $i++;
    $newEtud->appendChild($domAttribute);
  
    //Création du nom et prénom d'un étudiant
    foreach ($etud as $key => $value) {
        $etud = $document->createElement($key, $value);
        $newEtud->appendChild($etud);
    }
}

$document->save('Etudiants_DOM.xml');

echo "Export XML fini !";


//////Charger un XML/////////////
$lesEtudiantsXML = simplexml_load_file('Etudiants_DOM.xml');
var_dump($lesEtudiantsXML);


//////Connexion à la base de donnée/////////////
$connexion = new mysqli('localhost', 'root', "", "clicom_simplifie");

// Check connection
if ($connexion->connect_error) {
  die("Connection failed: " . $connexion->connect_error);
}
echo "Connected successfully to clicom";

//Requête
$sql = "SELECT * FROM client WHERE 1";
$result = $connexion->query($sql);

$documentClient = new DomDocument();
$documentClient->preserveWhiteSpace = false;
$documentClient->formatOutput = true;
// on crée la racine <Clients> et on l'insère dans le document
$lesClients = $documentClient->createElement('LesClients');
$documentClient->appendChild($lesClients);

//Affichage des résultats
if ($result->num_rows > 0) {
    //Affichage de chaque ligne
    while($row = $result->fetch_assoc()) {
        echo "NCLI : " . $row["NCLI"]. " - Nom : " . $row["NOM"]. " - Localite : " . $row["LOCALITE"]. "<br>";
        
        $newClient = $documentClient->createElement('Client');
        $lesClients->appendChild($newClient);

        foreach ($row as $key => $value) {
            $newClientAttribute = $documentClient->createElement($key, $value);
            $newClient->appendChild($newClientAttribute);
        }
    }
} else {
    echo "0 results";
}

$documentClient->save('clients.xml');

$connexion->close();


///////////BDD depuis XML////////////

//Connexion à la base
$connexion = new mysqli('localhost', 'root', '');

if($connexion->connect_error)
{
    die("Connection failed : " . $connexion->connect_error);
}
else
{
    echo ("Connected successfully to films \n");
}

//Creation de la base 'Films'
$sql = "CREATE DATABASE IF NOT EXISTS films";
if ($connexion->query($sql) === TRUE)
{
    echo ("Database created </br>");
}
else
{
    echo ("Error creating database " . $connexion->error . "</br>");
}

$connexion = new mysqli('localhost', 'root', '', 'films');

//Création des tables
$sql = "CREATE TABLE films (Titre VARCHAR(60) NOT NULL, Realisateur VARCHAR(30) NOT NULL, DateF VARCHAR(5))";
if (mysqli_query($connexion, $sql))
{
    echo ("Table created successfully </br>");

    //Insertion des données
    $filmsXML = simplexml_load_file('MesFilms.xml');
    foreach ($filmsXML->children() as $film) {

        $insert = "INSERT INTO films (Titre, Realisateur, DateF) VALUES
         (" . "\"" . $film->titre . "\"" .  ", " . "\"" .  $film->realisateur . "\"" .  ", " . "\"" .  $film->date . "\")";
    
        if ($connexion->query($insert) === TRUE)
        {
            echo ("Data inserted ");
        }
        else
        {
            echo ("Error : " . $connexion->error . "</br>");
        }
    }
}
else
{
    echo ("Error creating table " . $connexion->error . "</br>");
}

$connexion->close();

?>