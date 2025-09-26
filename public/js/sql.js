document.getElementById('postSqlForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        param1: formData.get('param1'),
        param2: formData.get('param2'),
        paramN: formData.get('paramN')
    };

    try {
        const response = await fetch('/sql/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const message = await response.text();
        document.getElementById('postSqlResult').innerText = message;

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('postSqlResult').innerText = 'Error sending the form.';
    }
});

document.getElementById('getAllBtn').addEventListener('click', async function () {
    try {
        const response = await fetch('/sql/get-all');
        const data = await response.json();

        const list = document.getElementById('getAllResult');
        list.innerHTML = '';

        if (data.length === 0) {
            list.innerHTML = '<li>There is no registers</li>';
            return;
        }

        data.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = JSON.stringify(entry); // Puedes personalizar el formato
            list.appendChild(li);
        });

    } catch (error) {
        console.error('Error getting data:', error);
        document.getElementById('getAllResult').innerHTML = '<li>Error obtaining info.</li>';
    }
});

document.getElementById('getOneSqlForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const id = formData.get('id');

    try {
        const response = await fetch(`/sql/get-one/${id}`);
        const data = await response.json();

        const resultContainer = document.getElementById('getOneResult');
        resultContainer.innerHTML = '';

        if (!data || Object.keys(data).length === 0) {
            resultContainer.innerHTML = '<li>No se encontró ningún registro.</li>';
            return;
        }

        // Mostrar el objeto como lista
        const ul = document.createElement('ul');
        for (const key in data) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${data[key]}`;
            ul.appendChild(li);
        }

        resultContainer.appendChild(ul);
    } catch (error) {
        console.error('Error getting data:', error);
        document.getElementById('getOneResult').innerHTML = '<li>Error al obtener información.</li>';
    }
});