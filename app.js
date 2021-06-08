//Variables
const form = document.querySelector('#formulario');
const activitiesListUI = document.getElementById('listaActividades');
const submitBtn = document.querySelector('#button');
const inputActivity = document.querySelector('#actividad');
let activities = [];
let idGlobal;


const createActivity = (activity) => {
  const item = {
    activity,
    status: false,
    id: Date.now()
  }
  activities.push(item);
  console.log(activities);
  return item;
}

const saveDataLS = () => {
  localStorage.setItem('routine', JSON.stringify(activities));
  showItemsDOM();
}

const cleanDOM = () => {
  while (activitiesListUI.firstChild) {
    activitiesListUI.removeChild(activitiesListUI.firstChild);
  }
}

const showItemsDOM = () => {
  cleanDOM();
  activities = JSON.parse(localStorage.getItem('routine'));
  if(activities === null) {
    activities = []
  } else {
    if (activities.length > 0) {
      activities.forEach(element => {
        if (element.status) {
          activitiesListUI.innerHTML += `
        <div id="${element.id}" class="alert alert-success" role="alert">
          <i class="material-icons float-left mr-2">accessibility</i>
          <b>${element.activity}</b> - ${element.status}
          <span class="float-right">
            <i class="material-icons">edit</i>
            <i class="material-icons">done</i>
            <i class="material-icons">delete</i>
          </span>
        </div>
        `
        } else {
          activitiesListUI.innerHTML += `
        <div id="${element.id}" class="alert alert-danger" role="alert">
          <i class="material-icons float-left mr-2">accessibility</i>
          <b>${element.activity}</b> - ${element.status}
          <span class="float-right">
            <i class="material-icons">edit</i>
            <i class="material-icons">done</i>
            <i class="material-icons">delete</i>
          </span>
        </div>
        `
        }
      })
    }
  }
}

const deleteLS = id => {
  activities = activities.filter(activity => activity.id != id);
  saveDataLS();
}

const editLS = (id) => {
  let index = activities.findIndex(element => element.id == id);
  activities[index].status = true;
  saveDataLS();
}

const editFormValues = id => {
  const element = activities.find(activity => activity.id == id);
  inputActivity.value = element.activity;
  submitBtn.textContent = 'Editar';
}

const editTextLs = (value) => {
  activities = activities.map(activity => {
    if(activity.id == idGlobal) {
      return {
        ...activity,
        activity: value
      }
    } else {
      return activity;
    }
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const activity = inputActivity.value;
  if(submitBtn.textContent === 'Guardar') {
    createActivity(activity);
  } else {
    editTextLs(activity);
  }
  submitBtn.textContent = 'Guardar';
  form.reset();
  saveDataLS();
})

document.addEventListener('DOMContentLoaded', showItemsDOM);

activitiesListUI.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.innerHTML === 'done' || e.target.innerHTML === 'edit' || e.target.innerHTML === 'delete') {
    if(e.target.innerHTML === 'done') {
      const elementId = e.target.parentElement.parentElement.id;
      editLS(elementId);
    }
    if(e.target.innerHTML === 'delete') {
      const elementId = e.target.parentElement.parentElement.id;
      deleteLS(elementId);
    }
    if(e.target.innerHTML === 'edit') {
      idGlobal = e.target.parentElement.parentElement.id;
      editFormValues(idGlobal);
    }
  }
}) 