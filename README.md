RetailManagerLite

RetailManagerLite è un piccolo gestionale per il settore retail/GDO sviluppato con ASP.NET Core, SQLite e React + TypeScript.
Permette di gestire prodotti con operazioni CRUD (Crea, Leggi, Aggiorna, Elimina) e funzionalità avanzate come ricerca filtrata e modifica inline.
Il progetto è pensato come demo per dimostrare competenze fullstack in un contesto reale di gestione punti vendita.

<img width="1372" height="461" alt="image" src="https://github.com/user-attachments/assets/9926d1e2-8eed-4eb9-9a3b-fb63164af508" />


🛠 Tecnologie utilizzate

Backend

ASP.NET Core Web API

Entity Framework Core con SQLite

C# 11

Frontend

React + TypeScript

Axios per le chiamate HTTP

Bootstrap 5 per lo styling

Strumenti

Visual Studio / VS Code

dotnet CLI / Node.js / npm

🚀 Funzionalità

Backend

Gestione prodotti con modello Product (ID, Nome, Categoria, Prezzo, Quantità)

Seed automatico dei dati iniziali (Latte, Pane, Uova) se il DB è vuoto

Persistenza dati con SQLite (retail.db)

API RESTful con metodi GET, POST, PUT, DELETE

Frontend

Visualizzazione tabella prodotti con ordinamento per colonna

Modifica inline di nome, categoria, prezzo e quantità

Ricerca filtrata per nome o categoria

Aggiunta e cancellazione prodotti

Feedback immediato dei dati aggiornati dal backend

💾 Installazione
Prerequisiti

.NET 7 SDK

Node.js
 + npm

Backend

Aprire la cartella backend/RetailManagerLite.Api

Installare pacchetti NuGet se necessario:

dotnet restore


Creare database e tabelle:

dotnet ef database update


Avviare il backend:

dotnet run


L’API sarà disponibile su http://localhost:5182

Il file SQLite retail.db verrà creato automaticamente

Frontend

Aprire la cartella frontend/retail-manager-lite

Installare dipendenze:

npm install


Avviare l’app React:

npm start


Il frontend sarà disponibile su http://localhost:3000

⚡ Avvio completo con un unico comando

Se vuoi avviare frontend e backend insieme, puoi usare concurrently nel frontend:

npm run start:full


Backend su localhost:5182

Frontend su localhost:3000

Dati iniziali già popolati

🗂 Struttura del progetto
RetailManagerLite/
├─ backend/RetailManagerLite.Api/   # Backend ASP.NET Core
│  ├─ Program.cs
│  ├─ Controllers/
│  ├─ Data/
│  ├─ Models/
│  └─ retail.db                     # SQLite (creato all’avvio)
├─ frontend/retail-manager-lite/    # Frontend React + TypeScript
│  ├─ src/
│  │  ├─ App.tsx
│  │  ├─ services/
│  │  └─ models/
│  └─ package.json
└─ README.md

📌 Note

Il backend utilizza SQLite per semplicità e demo locale

Tutti i dati vengono salvati in retail.db nella cartella backend

Il seed dei dati funziona solo se il DB è vuoto

👨‍💻 Autore

Davide Sgrazzutti – Demo fullstack per colloquio
