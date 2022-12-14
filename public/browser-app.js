const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const bookTypeSelectorDOM = document.querySelector('.book-type-selector')
const woodTypeSelectorDOM = document.querySelector('.wood-type-selector')
const taskMeasuresDOM = document.querySelector('.task-measures')
const taskPagesDOM = document.querySelector('.task-pages')
const taskThicknessDOM = document.querySelector('.task-thickness')
const wayMadeSelectorDOM = document.querySelector('.way-made-selector')
const taskWayMadeDescriptionDOM = document.querySelector('.task-way-made-description')
const taskSideTypeDOM = document.querySelector('.task-side-type')
const taskThreatDOM = document.querySelector('.task-threat')
const formAlertDOM = document.querySelector('.form-alert')

taskWayMadeDescriptionDOM.classList.add("hide");

// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks')
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">¡Todavía no has guardado ninguno!</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = tasks
      .map((task) => {
        const { 
          completed, 
          _id: taskID, 
          name, 
          bookType, 
          woodType,
          measures,
          pages,
          thickness,
          wayMade,
          wayMadeDescription,
          sideType,
          threat } = task
        return `<div class="single-task ${completed && 'task-completed'}">
<div><h5><span><i class="far fa-check-circle"></i></span>${name}</h5></div>
<div class="task-links">
<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
<div class="task-attributes-row">
  <div class="task-attributes-col"><h6>${bookType}</h6></div>
  <div class="task-attributes-col"><h6>Tipo de Madera: ${woodType}</h6></div>
  <div class="task-attributes-col"><h6>Tamaño: ${measures}</h6></div>
</div>
<div class="task-attributes-row">
  <div class="task-attributes-col"><h6>Número de páginas: ${pages}</h6></div>
  <div class="task-attributes-col"><h6>Grsor: ${thickness}</h6></div>
  <div class="task-attributes-col"><h6>${wayMade}</h6></div>
</div>
<div class="task-attributes-row">
  <div class="task-attributes-col"><h6>${wayMadeDescription}</h6></div>
  <div class="task-attributes-col"><h6>${sideType}</h6></div>
  <div class="task-attributes-col"><h6>${threat}</h6></div>
</div>

</div>`
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value
  const bookType = bookTypeSelectorDOM.value
  const woodType = woodTypeSelectorDOM.value
  const measures = taskMeasuresDOM.value
  const pages = taskPagesDOM.value
  const thickness = taskThicknessDOM.value
  const wayMade = wayMadeSelectorDOM.value
  const wayMadeDescription = taskWayMadeDescriptionDOM.value
  const sideType = taskSideTypeDOM.value
  const threat = taskThreatDOM.value

  try {
    await axios.post('/api/v1/tasks', { 
      name, 
      bookType,
      woodType,
      measures,
      pages,
      thickness,
      wayMade,
      wayMadeDescription,
      sideType,
      threat
     })
    showTasks()
    taskInputDOM.value = ''
    bookTypeSelectorDOM.value = ""
    woodTypeSelectorDOM.value = ""
    taskMeasuresDOM.value = ""
    taskPagesDOM.value = ""
    taskThicknessDOM.value = ""
    wayMadeSelectorDOM.value = ""
    taskWayMadeDescriptionDOM.value = ""
    taskSideTypeDOM.value = ""
    taskThreatDOM.value = ""
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})


wayMadeSelectorDOM.addEventListener('change', () => {
  if(wayMadeSelectorDOM.value === "false"){
    taskWayMadeDescriptionDOM.classList.add("hide");
  }else{
    taskWayMadeDescriptionDOM.classList.remove("hide");
  }
})