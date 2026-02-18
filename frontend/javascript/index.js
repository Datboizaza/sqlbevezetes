document.addEventListener('DOMContentLoaded', () => {
    diakTable();
});
const diakTable = async () => {
    const div = document.getElementById('diakTabla');
    const result = await getMethodFetch('http://127.0.0.1:3000/api/diakok');

    try {
        result.results.forEach((element) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-primary', 'csokolj');
            button.setAttribute('id', `${element.nev}`);
            button.innerHTML = 'Jegyek megjelnítése';
            td3.appendChild(button);
            td1.innerHTML = element.nev;
            td2.innerHTML = element.osztaly;

            tr.replaceChildren(td1, td2);
            div.appendChild(tr);
        });
        const button = document.getElementsByClassName('csokolj');
        button.addEventListener('click', jegyekTable);
    } catch (error) {
        console.error('Hiba: ' + error);
    }
};

const jegyekTable = async () => {
    const div = document.getElementById('jegyTabla');
    const result = await getMethodFetch('http://127.0.0.1:3000/api/:diak_id');

    try {
        result.insertId.forEach((element) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            td1.innerHTML = element.tantargy;
            td2.innerHTML = element.jegy;
            td3.innerHTML = element.nev;
            td3.innerHTML = element.datum;
            tr.replaceChildren(td1, td2, td3, td4);
            div.appendChild(tr);
        });
    } catch (error) {
        console.error('Hiba: ' + error);
    }
};

const getMethodFetch = (url) => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Hiba: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            throw new Error(`Hiba történt: ${error.message}`);
        });
};
