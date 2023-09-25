// модалка, переключение страниц формы

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


// кнопка submit,  очистка формы


document.querySelector('.submit').addEventListener('click', function () {
    const loader = document.querySelector('.loader');

    loader.style.display = 'inline-block';
    document.getElementById('submit').disabled = true;


    setTimeout(() => {
        formParts.forEach(part => part.classList.remove('active'));
        document.querySelector('.form-part#part4').classList.add('active');
        document.getElementById('ageRange').value = 27;
        document.querySelector('.output').textContent = `${ageRange.value} лет`;
        document.getElementById('radio-1').checked = true;
        document.getElementById('name-input').value = '';
        document.getElementById('phone-input').value = '';
        document.getElementById('privacy-checkbox').checked = false;
        document.querySelector('.custom-text').value = '';
        loader.style.display = 'none';
        checkInputs();
    }, 3000)

})
document.querySelector('.close').addEventListener('click', function () {
    modal.style.display = 'none';
    formParts.forEach(part => part.classList.remove('active'));
})
document.querySelectorAll('.prev').forEach(button => {
    button.addEventListener('click', function () {
        const currentIndex = Array.from(formParts).indexOf(document.querySelector('.form-part.active'));
        showFormPart(currentIndex - 1);
    });
});


// Ограничение символов у textarea

document.querySelector('.custom-text').addEventListener('input', function () {
    const textarea = this;
    const maxLength = 370;

    if (textarea.value.length > maxLength) {
        textarea.value = textarea.value.slice(0, maxLength);
    }
});


// input range


document.addEventListener('DOMContentLoaded', function () {
    const ageRange = document.getElementById('ageRange');
    const output = document.querySelector('.output');

    ageRange.addEventListener('input', function () {
        output.textContent = `${ageRange.value} лет`;
    });
});




// выпадающий список

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


// кнопка отправки disabled


function checkInputs() {
    const nameInput = document.getElementById('name-input').value;
    const phoneInput = document.getElementById('phone-input').value;
    const submitBtn = document.getElementById('submit');
    const privacyBtn = document.getElementById('privacy-checkbox');
    const warning1 = document.querySelector('.warning-message1');
    const warning2 = document.querySelector('.warning-message2');

    if (nameInput.trim() !== '' && phoneInput.trim() !== '' && phoneInput.length >= 11 && privacyBtn.checked) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
    if (nameInput.trim() == '') {
        warning1.style.opacity = 1;
    } else {
        warning1.style.opacity = 0;
    }
    if (phoneInput.trim() == '') {
        warning2.style.opacity = 1;
    } else {
        warning2.style.opacity = 0;
    }
}

document.querySelector('.modal-content').addEventListener('input', checkInputs)




// проверка ip пользователя + маска для номера

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

            if (value.length > mask.length + 11) {
                value = value.slice(0, mask.length + 11);
            }
            event.target.value = value;
        });
    }

    applyCustomMask();
});
