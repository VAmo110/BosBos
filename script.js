document.addEventListener('DOMContentLoaded', function () {
    // نافذة منبثقة لعرض تفاصيل المنتجات
    var modal = document.getElementById("productModal");
    var span = document.getElementsByClassName("close")[0];

    // عند النقر على الزر لعرض التفاصيل
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function () {
            var productDetails = this.closest('.section').querySelector('p').textContent;
            document.getElementById('productDetails').textContent = productDetails;
            modal.style.display = "block";
        });

        // تأثير حركة خفيفة عند تمرير الماوس
        button.addEventListener('mouseenter', function () {
            this.style.transform = "scale(1.1)";
            this.style.transition = "transform 0.2s";
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = "scale(1)";
        });
    });

    // عند النقر على × لإغلاق النافذة
    span.onclick = function () {
        modal.style.display = "none";
    };

    // عند النقر في أي مكان خارج النافذة
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Form submission interaction for Order Online
    document.getElementById('orderForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var fullName = document.getElementById('fullName').value.trim();
        var address = document.getElementById('address').value.trim();

        if (fullName === "" || address === "") {
            // عرض تحذير للمستخدم
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
            // إخفاء الفورم وإظهار رسالة تأكيد
            var orderSection = document.getElementById('order-online');
            orderSection.innerHTML = `
                <h3>Order Submitted</h3>
                <p>Thank you, <strong>${fullName}</strong>! Your order has been received. We will contact you at the provided address: <em>${address}</em>.</p>
            `;
        }
    });

    // Navigation smooth scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});