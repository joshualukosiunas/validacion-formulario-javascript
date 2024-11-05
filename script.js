const firebaseConfig = {

  apiKey: "AIzaSyCX6dptuwpaJY9MFqA4i4SepUXWVwiHGms",

  authDomain: "datos-de-formulario-71c65.firebaseapp.com",

  projectId: "datos-de-formulario-71c65",

  storageBucket: "datos-de-formulario-71c65.firebasestorage.app",

  messagingSenderId: "333859393950",

  appId: "1:333859393950:web:f43c061c750fdba7d1468f",

  measurementId: "G-0H2F1WFJWQ"

};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (Event) =>{
    Event.preventDefault()

    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor, introducí tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }
    //Validar correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introducí un mail valido'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }
    //Validar la contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, numeros, minusculas, mayusculas y caracteres especiales'
        contrasenaError.classList.add('error.message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    //Si todos los campos son validos enviar formulario

    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){
        //Backend que reciba la información

        // Add a second document with a generated ID.
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value,
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert('error')
        });
    }
})