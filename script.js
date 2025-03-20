document.addEventListener('DOMContentLoaded', function () {
    // Modal لتفاصيل المنتجات
    var modal = document.getElementById("productModal");
    var span = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function () {
            var productDetails = this.closest('.section').querySelector('p').textContent;
            document.getElementById('productDetails').textContent = productDetails;
            modal.style.display = "block";
            new Audio('https://www.soundjay.com/buttons/beep-01a.mp3').play(); // صوت كليك
        });

        button.addEventListener('mouseenter', function () {
            this.style.transform = "scale(1.1)";
            this.style.transition = "transform 0.2s";
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = "scale(1)";
        });
    });

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Form submission
    document.getElementById('orderForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var fullName = document.getElementById('fullName').value.trim();
        var address = document.getElementById('address').value.trim();

        if (fullName === "" || address === "") {
            var warningMessage = document.getElementById('warningMessage');
            if (!warningMessage) {
                warningMessage = document.createElement('p');
                warningMessage.id = 'warningMessage';
                warningMessage.style.color = 'red';
                warningMessage.style.marginTop = '10px';
                warningMessage.textContent = "⚠ الرجاء إدخال جميع البيانات قبل إرسال الطلب!";
                document.getElementById('orderForm').appendChild(warningMessage);
            }
        } else {
            document.getElementById('order-online').innerHTML = `
                <h3>Order Submitted</h3>
                <p>Thank you, <strong>${fullName}</strong>! Your order has been received. We will contact you at: <em>${address}</em>.</p>
            `;
            new Audio('https://www.soundjay.com/buttons/beep-07.mp3').play(); // صوت تأكيد
        }
    });

    // Smooth scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // الثيم الليلي/النهاري
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = 'Switch to Dark Mode';
        } else {
            themeToggle.textContent = 'Switch to Light Mode';
        }
    });

    // الاقتباسات العشوائية
    const quotes = [
        "Fashion is the armor to survive the reality of everyday life. – Bill Cunningham",
        "Style is a way to say who you are without having to speak. – Rachel Zoe",
        "Elegance is not standing out, but being remembered. – Giorgio Armani"
    ];

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        document.getElementById('quoteText').textContent = quotes[randomIndex];
    }
    displayRandomQuote();
    setInterval(displayRandomQuote, 5000);

    // حاسبة الأسعار
    document.getElementById('calculateBtn').addEventListener('click', function() {
        const price = parseFloat(document.getElementById('itemPrice').value) || 0;
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        const total = price * quantity;
        document.getElementById('totalPrice').textContent = `Total: ${total.toFixed(2)} EGP`;
        new Audio('https://www.soundjay.com/buttons/beep-01a.mp3').play();
    });

    // Carousel
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
    }

    document.querySelector('.next').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    document.querySelector('.prev').addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);

    // مؤشر الموسم
    const seasons = ["Winter", "Spring", "Summer", "Fall"];
    const month = new Date().getMonth();
    const seasonIndex = Math.floor(month / 3) % 4;
    document.getElementById('seasonText').textContent = `Current Season: ${seasons[seasonIndex]}`;

    // عجلة الحظ
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const prizes = ["10% Off", "Free Shipping", "20% Off", "Try Again"];
    let startAngle = 0;
    let spinAngle = 0;
    let spinning = false;

    function drawWheel() {
        const arc = Math.PI / (prizes.length / 2);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < prizes.length; i++) {
            const angle = startAngle + i * arc;
            ctx.fillStyle = i % 2 === 0 ? '#607d8b' : '#e0e0e0';
            ctx.beginPath();
            ctx.arc(150, 150, 140, angle, angle + arc);
            ctx.lineTo(150, 150);
            ctx.fill();
            ctx.save();
            ctx.fillStyle = '#fff';
            ctx.translate(150, 150);
            ctx.rotate(angle + arc / 2);
            ctx.fillText(prizes[i], 60, 10);
            ctx.restore();
        }
    }

    document.getElementById('spinBtn').addEventListener('click', function() {
        if (!spinning) {
            spinning = true;
            spinAngle = Math.random() * 10 + 10;
            let rotation = 0;
            const spinInterval = setInterval(() => {
                rotation += spinAngle;
                startAngle += spinAngle * Math.PI / 180;
                drawWheel();
                spinAngle *= 0.95;
                if (spinAngle < 0.05) {
                    clearInterval(spinInterval);
                    spinning = false;
                    const prizeIndex = Math.floor(((startAngle % (2 * Math.PI)) / (2 * Math.PI)) * prizes.length);
                    document.getElementById('spinResult').textContent = `You won: ${prizes[prizeIndex]}!`;
                    new Audio('https://www.soundjay.com/buttons/beep-07.mp3').play();
                }
            }, 20);
        }
    });
    drawWheel();

    // محدد المقاسات
    document.getElementById('findSizeBtn').addEventListener('click', function() {
        const height = parseFloat(document.getElementById('height').value) || 0;
        const weight = parseFloat(document.getElementById('weight').value) || 0;
        let size = "Unknown";
        if (height > 0 && weight > 0) {
            if (height < 150 && weight < 50) size = "Small";
            else if (height < 170 && weight < 70) size = "Medium";
            else if (height < 190 && weight < 90) size = "Large";
            else size = "X-Large";
        }
        document.getElementById('sizeResult').textContent = `Suggested Size: ${size}`;
        new Audio('https://www.soundjay.com/buttons/beep-01a.mp3').play();
    });
});
