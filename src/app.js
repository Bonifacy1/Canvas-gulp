
// --------------------KONFIGURACJA-------------------- //
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth; // Szerokosc okna
canvas.height = window.innerHeight; // Wysokosc okna
const c = canvas.getContext('2d'); // inicjalizacja canvas 2d na zmienna c

// --------------------USTAWIENIA-------------------- //

// Współrzędnie kursora
const mouse = {
    x: undefined,
    y: undefined
}

// maksymalny promien kulki
const maxRadius = 30;

// kolory kulek
const colorArrey = [
    '#2E112D',
    '#540032',
    '#820333',
    '#C9283E',
    '#F0433A'
];

// --------------------PROGRAM-------------------- //

//przypisanie zmiennych kursora
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

// nadpisanie wielkosci podczasznianie wielkosci okna przegladarki
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

//tablica obiektów - kulek
const circleArray = [];



class Circle {
    constructor(x, y, dx, dy, radius) {
        //współrzędne początkowe + prędkości + promien + minimalny promien + losowy kolor
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArrey[Math.floor(Math.random() * colorArrey.length)]
    }

    draw() {
        c.beginPath();
        // x,y,promien,kat poczatkowy, kat koncowy, false - zgodnie z kierunkiem wskazowek */
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        // zmiana kierunku w razie uderzenia w ściankę okna
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        } else if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        // udpate pozycki kulki
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

for (let i = 0; i < 900; i++) {
    // zmiana parametrów promie, położenie, prędkość
    const radius = (Math.random() * 3) + 1;
    const x = Math.floor(Math.random() * (window.innerWidth - 2 * radius) + radius);
    const y = Math.floor(Math.random() * (window.innerHeight - 2 * radius) + radius);
    const dx = ((Math.random() - 0.5) * 4);
    const dy = ((Math.random() - 0.5) * 4);
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

console.log(circleArray);


// pętla animacji
function animate() {
    // informuje przeglądarkę o zamiarze wykonania animacji i żąda od przeglądarki wywołania określonej funkcji w celu odświeżenia animacji przed następnym odmalowaniem
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

animate();
