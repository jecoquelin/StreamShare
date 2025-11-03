<?php
// Configuration de la BDD
$containerName='db';
$dbname = 'dev_db';
$username = 'user';
$password = 'password';
$table = 'alembic_version';

// Commande pour executer le TRUNCATE dans le conteneur
$command = "docker exec -it $containerName psql -U $username -d $dbname -c 'TRUNCATE TABLE $table;'";

$output = [];
$returnVar = 0;

// Execution de la commande
exec($command, $output, $returnVar);

if ($returnVar == 0){
    echo "La table '$table' a été tronquée avec succès.";
} else {
    echo "Erreur lors de l'execution de la commande : " . implode("\n", $output);
}