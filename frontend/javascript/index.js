document.addEventListener('DOMContentLoaded', () => {
    getallstat();
});

const getallstat = async () => {
    const div = document.getElementById('diakTabla');
    const result = await getMethodFetch(`http://127.0.0.1:3000/api/diakok`);

    try {
        result.results.forEach((element) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            td1.innerHTML = element.nev;
            td2.innerHTML = element.osztaly;
            tr.replaceChildren(td1, td2);
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
