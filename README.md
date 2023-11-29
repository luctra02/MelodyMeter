# Program Informasjon

MelodyMeter er en nettside for å utforske vurderinger av sanger ved forskjellige kriteria som positivitet, lydhøyde, dansbarhet og energi!

# Installasjon og Setup Instruksjoner

For å kjøre appen lokalt må man først klone dette repositoriet. Du trenger node og npm installert globalt på maskinen din.

Krav:

Node version 20.5+
npm version 9.8+

## Installasjon:

Hvis du ikke er .\vite-project\ kjør

`cd .\vite-project\`

Etter det kan du installere de riktige pakkene ved

`npm install`


## Start Serveren:

`npm run dev`

## For å besøke appen:

localhost:5173

NB! Access tokenen går ut etter en time. Dette betyr at du må restarte applikassjonen hver time.

Et annet alternativ er å gå inn på nettsiden som kjøres av virtual machine på lenken: 
http://it2810-28.idi.ntnu.no/project1/

Får å komme inn på nettsiden må man være koblet til NTNU nettverket via VPN. 

# Navigasjon av nettsiden:

Man kan søke på artister i søkefeltet på hjemmesiden. Dette vil gi brukeren en liste med artister. Disse artistene er klikkbare knapper. Hvis man klikker på en artist får man opp en liste av albumer og playlister
knyttet til artisten. Disse er også klikkbare, og vil ta brukeren til en liste av sangene i det albumet/playlisten. Dissse sangene er også klikkbare, og hvis man klikker på dem tar den brukeren til en side hvor man
kan se forskjellige stats for sangen. Disse statsene er danceability, energy, loudness, and positivity. På oversikten over sangene i en playlist/album kan man også favorite sanger ved å trykke på stjernetegnet. 
Hvis man trykker på favorite knappen i navbaren tar den brukeren til en side som viser alle favorittsangene deres. Hvis man trykker på disse sangene blir man tatt til siden som viser stats for den sangen som ble nevnt tidligere.

## Bug

Sessionkey i sessionStorage funker ikke på nettsiden som kjøres av VM siden nøkkelen er på klient-siden, men funker helt fint i localhost. Så nettsiden vil ikke funke og huske verdier på VM når brukeren refresher siden, men brukeren kan fortsatt bla fram og tilbake med pilene.


# Refleksjon

## Forklaring av valgene våre

Vi har valgt å bruke spotify sitt API. Ressursene vi valgte er: å hente ut er album, playlist, artister, tracks, audio features. Disse vises én og én på nettsiden. Vi brukte state til å lagre informasjon om album, playlist, artister, tracks, audio features, samt brukerens valg av favorittsanger. Data til ressursene ble sendt fra en komponent til en annen ved å bruke navigate og location, siden det var en mer effektiv måte å håndtere props på enn å sende de opp til App.jsx for oss.

Brukeren kan filtrere artister via søkefunksjonen. Søket huskes selv om siden reloades.

Brukeren kan velge favorittsanger når de trykker seg inn på et album eller en playlist. Disse blir lagret og vist på en egen favorittside, og huskes selv etter at nettleseren lukkes. Vi har implementert dette ved hjelp av localStorage. localStorage lagrer alle sanger som har blitt lagt til i favoritter. Vi bruker sessionStorage til å lagre accessToken slik at man slipper å querye en ny token hver gang man refresher siden. 

Brukeren kan navigere seg mellom flere forskjellige web pages. Vi har brukt React Router til å implementere dette.


Vi har valgt å bruke spotify sine foreslåtte queries, istedet for Tanstack Query. De er omtrent det samme, men spotify sitt API krever access tokens, og vi fant derfor ikke en måte å bruke Tanstack. Vi endte derfor opp med å følge spotify API dokumentassjonen sin anbefaling om valg av query.



## Testing

Vi har gjort manuelle tester på nettsiden vår på ulike skjermstørrelser (mobil, stasjonær PC, etc.), og mener at siden er meget responsiv. Vi testet om hovedfunksjonalitetene funket overens med det vi har programmert og at de dekket de funskjonelle kravene for prosjektet.

Vi har skrevet snapshot tester for alle funksjonene i script.ts og sjekket verdier som brukere får opp som informasjon når de 
er på nettsiden. Vi prøvde å kjøre mocking tester for å unngå å hente ut data for hver test, men fant ikke en god løsning å bruke Mock Service Worker til det. Det var vanskelig å teste funksjonene uten å fetche data fra Spotify sin API og vi hadde dårlig tid mot slutten, men tenker å implementere dette i sluttproduktet hvis vi får det til.

Vi prøvde å gjøre brukertesting, men fikk ikke til dette ved å se på guiden som var i forelesningen. Istedenfor gjorde vi manuell brukertesting som nevnt over. 

Vi prøvde å lage mocks menn fikk en del problemer grunnet endring av strukturen av msw, og suboptimal kode for testing som gjorde det vanskeligere enn forventet

# Endringer fra første innlevering

 [+] Legge til 404 error hvis man prøver å gå til en side som ikke finnes og Tekst som kommer hvis det ikke er noe artister som kommer på søk

 [+] Ha mulighet til å velge en favoritt på sangsiden

 [+] Små design endringer, logo, statview icons

 [+] Responsiv design, endret fra flex til grid og endring når viewen blir mindre

 [+] Mer bærekraftig design ved bruk av komponenter på kode som blir brukt ofte
