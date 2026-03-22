1.1 Întrebări Teoretice
1.Cele 4 metode HTTP principale
- GET	- se folosește pentru a solicita/recupera date de pe server (ex: încărcarea unei pagini web). Nu modifică datele de pe server.
- POST -	se folosește pentru a trimite date noi către server pentru a fi procesate (ex: trimiterea unui formular de înregistrare sau adăugarea unui comentariu).
- PUT	- se folosește pentru a actualiza complet o resursă existentă sau pentru a o crea dacă nu există la o locație specifică.
- DELETE - se folosește pentru a șterge o resursă specifică de pe server.

2.Semnificația codurilor de status:
- 200 OK: Cererea a fost realizată cu succes.
- 301 Moved Permanently: Resursa solicitată a fost mutată definitiv la o nouă adresă (URL).
- 400 Bad Request: Serverul nu poate înțelege cererea din cauza unei sintaxe invalide trimise de client.
- 401 Unauthorized: Utilizatorul nu este autentificat; este nevoie de logare pentru a accesa resursa.
- 403 Forbidden: Clientul este autentificat, dar nu are permisiunile necesare pentru a vedea conținutul.
- 404 Not Found: Serverul nu a găsit resursa solicitată (pagina nu există).
- 500 Internal Server Error: O eroare generică pe server; ceva a mers prost "în spate" fără ca vina să fie a clientului.

3.Diferența între HTTP și HTTPS:
- HTTP (HyperText Transfer Protocol): Datele sunt trimise în format text simplu. Oricine interceptează conexiunea (pe un Wi-Fi public, de exemplu) poate
citi parolele sau datele tale.
- HTTPS (HTTP Secure): Este HTTP peste un strat de criptare numit TLS (sau SSL). Datele sunt criptate înainte de a fi trimise, astfel încât doar 
destinatarul le poate descifra. Utilizează portul standard 443, în timp ce HTTP folosește portul 80.

1.2 Exercițiu Practic - Analiza HTTP cu Developer Tools
<img width="935" height="910" alt="Captură de ecran 2026-03-22 171542" src="https://github.com/user-attachments/assets/a5767715-fd79-46e2-8170-5dba0c506de9" />
Se observă utilizarea protocolului HTTPS pentru securizarea transferului și header-ul Host: httpbin.org.
<img width="941" height="618" alt="Captură de ecran 2026-03-22 171601" src="https://github.com/user-attachments/assets/c6d712d2-19fa-4710-a862-6db23c346129" />
Am trimis cu succes un obiect JSON folosind metoda POST, verificat prin atributul 'data' din răspunsul primit.

1.3 Testarea Metodelor HTTP cu Fetch API
<img width="940" height="382" alt="Captură de ecran 2026-03-22 171956" src="https://github.com/user-attachments/assets/427799d6-6f6d-4088-a835-7523a4d2b127" />
