<?php
// Check for empty fields
if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['phone']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    echo "No arguments Provided!";
    return false;
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));

// Conexão com o banco de dados
$host = "localhost";
$user = "root";
$password = ""; // padrão XAMPP
$database = "contato_site";

$conn = new mysqli($host, $user, $password, $database);

// Verifica conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Insere dados na tabela
$stmt = $conn->prepare("INSERT INTO mensagens (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email_address, $phone, $message);
$stmt->execute();
$stmt->close();
$conn->close();

// Envia o e-mail (opcional, pode manter)
$to = 'Felipevinicius063@gmail.com';
$email_subject = "Website Contact Form: $name";
$email_body = "Você recebeu uma nova mensagem do formulário de contato do site.\n\n".
              "Detalhes:\nNome: $name\nEmail: $email_address\nTelefone: $phone\nMensagem:\n$message";
$headers = "From: noreply@seudominio.com\n";
$headers .= "Reply-To: $email_address";

mail($to, $email_subject, $email_body, $headers);
return true;
?>
