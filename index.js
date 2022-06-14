//берем ul по ид, добавляем к нему ребенка li
const getAccs = async () => {
  const response = await fetch("http://92.255.77.207:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `{
        accs{
          id,
          login,
          password,
          mmr
          createdAt,
          updatedAt,
        }
      }`,
    }),
  });

  return response.json();
};

const createAcc = async (acc) => {
  const response = await fetch("http://92.255.77.207:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation {
        createAcc(createAccInput:{
          login:"${acc.login}",
          password: "${acc.password}",
          mmr: ${acc.mmr}
        }){
          id,
          login,
          password,
          mmr
        }
      }`,
    }),
  });

  return response.json();
};

const removeAcc = async (id) => {
  const response = await fetch("http://92.255.77.207:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation {
        removeAcc(id:"${id}")
      }`,
    }),
  });

  return response.json();
};

const createButton = (buttonClass, type, text) => {
  const button = document.createElement('button');
  button.innerText = text;
  button.setAttribute('class', buttonClass);
  button.setAttribute('type', type);
  return button;
}

const insertAccIntoDom = (acc) => {
    const accText = document.createElement('p');
    accText.innerText = `login: ${acc.login}
    password: ${acc.password}
    mmr: ${acc.mmr}
    `;
    const accElement = document.createElement('li');
    const deleteButton = createButton ("deleteAccButton", "button", "X");
    deleteButton.addEventListener('click', () => handleDeleteAccButton(acc.id))
    const updateButton = createButton ("updateAccButton", "button", "edit");
    updateButton.addEventListener('click', () => handleUpdateAccButton(acc))
    accElement.setAttribute('id', acc.id);
    accElement.appendChild(accText);
    const div = document.createElement("div");
    div.className = "buttons"
    div.appendChild(updateButton)
    div.appendChild(deleteButton);
    accElement.appendChild(div);
    document.getElementById('accsList').appendChild(accElement);

}

// const deleteAccFromDom = (acc) => {

// }

const validateAccInput = (acc) => {
    if (!acc.login || !acc.password || !acc.mmr) {
        return false;
    }

    if (acc.mmr <= 0 || acc.mmr >=12000) {
        return false;
    }

    return true;
}
const handleUpdateAccButton = async (acc) => {
    
}
const handleDeleteAccButton = async (id) => {
  document.getElementById(id).remove();
  removeAcc(id);
}
const handleCreateAccButton = async () => {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const mmr = document.getElementById('mmr').value;
    let acc = {
        login,
        password,
        mmr
    }
    const mmrIsValid = validateAccInput(acc);
    if (!mmrIsValid) {
        alert("ВВЕДИ НОРМАЛЬНЫE ДАННЫЕ");
        return;
    }
    acc = (await createAcc(acc)).data.createAcc;
    insertAccIntoDom(acc);

}

const main = async () => {
    document.getElementById("createAccButton").addEventListener("click", handleCreateAccButton);
    const accs = (await getAccs()).data.accs;
    accs.forEach(acc => insertAccIntoDom(acc));
    // const buttons = document.getElementsByClassName("deleteAccButton");//forEach(element => {element.addEventListener("click", handleDeleteAccButton(element.parentNode))});
    // for(const element of buttons){
    //   element.addEventListener("click", handleDeleteAccButton(element.parentNode));
    // }
    // butns[0].addEventListener("click", handleDeleteAccButton());
    // butns[1].addEventListener("click", handleDeleteAccButton);
    // console.log(buttons);
  }

main();
