# Realty

![Realty Logo](./src/assets/realty_logo.png)

## O projektu

Ovaj projekt je razvijen kao dio sveučilišnog kolegija Web aplikacije. Projekt se sastoji od frontend i backend dijela. Backend dio projekta možete pronaći na [realty-backend](https://github.com/petarally/realty-backend).

## Funkcionalnosti

### Frontend

- **Dodavanje nekretnina**: Korisnici mogu dodavati nove nekretnine putem forme koja uključuje naziv, opće podatke, sadržaje, opis, slike i podatke o prodavatelju.
- **Prikaz pretplatnika**: Prikaz svih pretplatnika na newsletter.
- **Prikaz nekretnina**: Prikaz svih dostupnih nekretnina s detaljima.
- **Pretraga nekretnina**: Korisnici mogu pretraživati nekretnine prema različitim kriterijima.
- **Autentifikacija korisnika**: Korisnici se mogu registrirati i prijaviti kako bi koristili aplikaciju.

### Backend

- **REST API**: Backend pruža REST API za upravljanje nekretninama, korisnicima i pretplatnicima.
- **Autentifikacija i autorizacija**: Implementirana je autentifikacija i autorizacija korisnika pomoću JWT tokena.
- **Upravljanje slikama**: Backend omogućuje prijenos i pohranu slika nekretnina.
- **Baza podataka**: Podaci se pohranjuju u MongoDB bazu podataka.

## Tehnologije

### Frontend

- **Vue.js**: JavaScript framework za izgradnju korisničkog sučelja.
- **Axios**: Biblioteka za HTTP zahtjeve.
- **Tailwind CSS**: CSS framework za stiliziranje korisničkog sučelja.

### Backend

- **Node.js**: JavaScript runtime za izgradnju server-side aplikacija.
- **Express.js**: Web framework za Node.js.
- **MongoDB**: NoSQL baza podataka.
- **Multer**: Middleware za rukovanje prijenosom datoteka.
