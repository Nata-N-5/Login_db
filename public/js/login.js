document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);


  const dictionary={
        q:"juanxd",
        w:"uwu",
        e:"xd2",
        r:"club",
        t:"penguin",
        y:"es",
        u:"lo",
        i:"mejor",
        o:"de",
        p:"la",
        a:"vida",
        s:"me",
        d:"encanta",
        f:"XD",
        g:"mucho",
        h:"aleja",
        j:"es",
        k:"la",
        l:"mejor",
        z:"y",
        x:"juan",
        c:"tmb",
        v:"quiero",
        b:"mucho",
        n:"a",
        m:"mis",
        "1":"amigues",
        "2":"pongan",
        "3":"bachata",
        "4":"memotenpiedad",
        "5":"tilin",
        "6":"puffle",
        "7":"pinguino",
        "8":"fife",
        "9":"elbicho",
    };

function encrypt(password) {
        // 1. Pasar todo a minúsculas
        let lower = password.toLowerCase();

        // 2. Convertir en array
        const arraypassword = Array.from(lower);

        // 3. Acumular resultado
        let result = "";

        // 4. Recorrer con un for
        for (let i = 0; i < arraypassword.length; i++) {
            let character = arraypassword[i];

            // 5. Revisar si el caracter está en rules
            if (dictionary[character] === undefined) {
                result += character; // si no está, lo dejo igual
            } else {
                result += dictionary[character]; // si está, lo reemplazo
            }
        }

        return result;
    }

    let originalpassword = formData.get('password');
    let hashedpassword = encrypt(originalpassword);


    const data = {
        name: formData.get('name'),
        password: hashedpassword
    };

    try {
        const response = await fetch('/sql/login-user', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        });

        const message = await response.text();
        document.getElementById('postNoSqlResult').innerText = message;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('postNoSqlResult').innerText = 'Error iniciando sesión.';
    }
});









