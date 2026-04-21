const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_DOMINIO",
  databaseURL: "SUA_URL",
  projectId: "SEU_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;

      return db.ref("users/" + uid).set({
        name: name,
        email: email,
        role: role
      });
    })
    .then(() => {
      alert("Usuário criado e salvo no banco!");
    })
    .catch((error) => {
      console.error(error);
      alert("Erro: " + error.message);
    });
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      alert("Login realizado!");

      loadDashboard(user.uid);
    })
    .catch((error) => {
      alert("Erro: " + error.message);
      console.error(error);
    });
}

function loadDashboard(uid) {
  db.ref("users/" + uid).once("value")
    .then(snapshot => {
      const data = snapshot.val();

      if (!data) {
        document.getElementById("content").innerHTML =
          "<p>Usuário não encontrado no banco</p>";
        return;
      }

      const role = data.role;

      let html = `<p>Bem-vindo ${data.name} (${role})</p>`;

      db.ref("public-data").once("value")
        .then(snap => {
          html += "<h3>Dados Públicos</h3><pre>" + JSON.stringify(snap.val(), null, 2) + "</pre>";

          if (role === "admin") {
            db.ref("admin-data").once("value")
              .then(snap2 => {
                html += "<h3>Dados Admin</h3><pre>" + JSON.stringify(snap2.val(), null, 2) + "</pre>";
                document.getElementById("content").innerHTML = html;
              });
          } else {
            html += "<p>Sem acesso aos dados admin</p>";
            document.getElementById("content").innerHTML = html;
          }
        });
    })
    .catch(error => {
      console.error(error);
      document.getElementById("content").innerHTML =
        "<p>Erro ao carregar dados</p>";
    });
}