// app.js

const tooltip = document.getElementById('tooltip');
const githubRawUrl = 'https://raw.githubusercontent.com/yemreblky/turkiye-map-svg/refs/heads/main/harita.svg';

// Haritayı internetten çek ve başlat
loadMapFromGithub();

async function loadMapFromGithub() {
    try {
        const response = await fetch(githubRawUrl);
        if (!response.ok) throw new Error("Harita dosyası alınamadı.");
        
        const svgData = await response.text();
        document.getElementById('map-wrapper').innerHTML = svgData;

        // Gereksiz katmanları gizle
        let regions = document.getElementById('regions');
        if (regions) regions.style.display = 'none';

        setupInteractions();
    } catch (error) {
        console.error("Hata:", error);
    }
}

function setupInteractions() {
    let haritaGrubu = document.getElementById('provinces');
    let cities = haritaGrubu.getElementsByTagName('path');

    // Klasik for döngüsü (HTMLCollection için en güvenli yol)
    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        
        // Fare üzerine gelince şehir ismini göster
        city.addEventListener('mousemove', function(event) {
            let cityName = city.getAttribute('id'); 
            tooltip.textContent = cityName;
            tooltip.style.opacity = '1';
            tooltip.style.left = (event.clientX + 15) + 'px';
            tooltip.style.top = (event.clientY - 35) + 'px';
        });

        // Fare ayrılınca gizle
        city.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });

        // Tıklayınca sehir ismiyle perfume.html sayfasına git
        city.addEventListener('click', function() {
            let cityName = city.getAttribute('id');
            window.location.href = "perfume.html?sehir=" + cityName;
        });
    }
}