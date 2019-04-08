$(document).ready(
    //tutaj jest kawałek kodu, w którym przypisane są zmienne z adresami do udostepniania usługą wms
    function() {
        
    var daneOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        
        
    var daneORTO = L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer", {layer: "Raster", format: "image/png", transparent: 'true', version: '1.1.1'});
    var danePanstwo=L.tileLayer.wms("http://localhost:8080/geoserver/projekt_KOM/wms", {
        layers: "projekt_KOM:panstwo", 
        format: 'image/png',
        transparent: true,
        version: '1.1.1'
    });
        var styl_wojewodztwa ={
            "color":"green"
        }
        var wojewodztwa = new L.GeoJSON.AJAX ("wojewodztwa.geojson", {style:styl_wojewodztwa} );
    //tutaj jest przypisanie do zmiennej obiektu "L" i wywołanie metody .map która tworzy mapę o wybranych parametrach
    var mojaMapa = L.map('mymap',{center:[52.1, 21.0], zoom: 10});
        
    //wywołanie mapy i wrowadzenie do niej danych z OSM    
    mojaMapa.addLayer(daneOSM);
    
        //obsługa óżnych zrodel mapy
            var baseMaps ={
        "OpenStreetMaps": daneOSM, 
        "Ortofotomapa": daneORTO,
        
    };
        var overlays={
            "GranicaPanstwa": danePanstwo,
            "GranicaWojewodztwa": wojewodztwa
        };
        //dodanie guzika do przełączania mapy miedzy roznymi zrodlami danych
    L.control.layers(baseMaps,overlays).addTo(mojaMapa)
        
     //dodanie skali   
    L.control.scale({imperial: false}).addTo(mojaMapa);
        
    //dodanie lokalizacji i obsłuuga lokalizacji
        
    mojaMapa.locate({setView:true, maxZoom:14});
        
        
        //funkcja która wyświetla ikonę okręgu w miejscu gdzie się znajdujemy (wspolrzedne sa przesylane za pomoca zmiennej o nazwie event)
     function zlokalizowano(event){
         var radius = event.accuracy/2;
         L.marker(event.latlng).addTo(mojaMapa);
         L.circle(event.latlng, radius).addTo(mojaMapa);
     };
        
        mojaMapa.on('locationfound',zlokalizowano);
        
         //zmienna przechowujaca stylizacje danych pobieranych z pliku geoJSON     
        
        //zmienna przchowujaca obiekt biblioteki leaflet i wywolujacy na rzecz obiektu metode GeoJSON.AJAX jako atrybuty dla metody podaje adres danych i nazwe miennej do stylizacji
        
        //wywolanie metody add.To na rzecz obiektu wojewodztwa i dodanie danych do okna moja mapa
        //wojewodztwa.addTo(mojaMapa);
        

        
        
    });