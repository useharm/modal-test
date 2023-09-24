const modal = document.getElementById('myModal');
const formParts = document.querySelectorAll('.form-part');

document.getElementById('openModal').addEventListener('click', function () {
    document.getElementById('myModal').style.display = 'block';
    document.querySelector('.form-part#part1').classList.add('active');
});

document.body.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        formParts.forEach(part => part.classList.remove('active'));
    }
})



function showFormPart(index) {
    formParts.forEach(part => part.classList.remove('active'));
    formParts[index].classList.add('active');
}

document.querySelectorAll('.next').forEach(button => {
    button.addEventListener('click', function () {
        const currentIndex = Array.from(formParts).indexOf(document.querySelector('.form-part.active'));
        showFormPart(currentIndex + 1);
    });
});

document.querySelector('.submit').addEventListener('click', function () {
    formParts.forEach(part => part.classList.remove('active'));
    document.querySelector('.form-part#part4').classList.add('active');
})
document.querySelector('.close').addEventListener('click', function () {
    modal.style.display = 'none';
    formParts.forEach(part => part.classList.remove('active'));
})

document.addEventListener('DOMContentLoaded', function () {
    const ageRange = document.getElementById('ageRange');
    const output = document.querySelector('.output');

    ageRange.addEventListener('input', function () {
        output.textContent = `${ageRange.value} лет`;
    });
});


document.querySelectorAll('.prev').forEach(button => {
    button.addEventListener('click', function () {
        const currentIndex = Array.from(formParts).indexOf(document.querySelector('.form-part.active'));
        showFormPart(currentIndex - 1);
    });
});


const dropdownHeader = document.querySelector('.dropdown-header');
const dropdownList = document.querySelector('.dropdown-list');
const dropdownItems = document.querySelectorAll('.dropdown-list li');

dropdownHeader.addEventListener('click', function () {
    dropdownList.classList.toggle('active');
    const arrow = dropdownHeader.querySelector('.arrow');
    arrow.classList.toggle('up');
});

dropdownItems.forEach(item => {
    item.addEventListener('click', function () {
        const dropdownSpan = document.querySelector('.dropdown-header span')
        const prevValue = dropdownSpan.dataset.value;
        const selectedValue = item.dataset.value;
        item.dataset.value = prevValue;
        item.innerHTML = `${prevValue}`;
        dropdownList.classList.remove('active');
        dropdownHeader.innerHTML = `<span data-value=${selectedValue}>${selectedValue}</span> <div class="arrow"></div>`;
    });
});




document.addEventListener("DOMContentLoaded", async function () {
    async function getCountryFromIP() {
        const response = await fetch("https://ipinfo.io/json?token=800e8b0a908127");
        const data = await response.json();
        return data.country;
    }

    async function applyCustomMask() {
        const phoneInput = document.getElementById("phone-input");
        const country = await getCountryFromIP();

        let mask;
        if (country === "BY") {
            mask = '+375';
        } else if (country === "RU") {
            mask = '+7';
        } else {
            mask = '+1';
        }

        phoneInput.addEventListener('input', function (event) {
            let value = event.target.value;
            value = value.replace(/[^\d+]/g, '');

            if (value.length < 2 && !value.startsWith(mask)) {
                value = mask + value;
            } else {
                value += ''
            }

            if (value.length > mask.length + 10) {
                value = value.slice(0, mask.length + 10);
            }
            event.target.value = value;
        });
    }

    applyCustomMask();
});
