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
const taskSideTypeDOM = document.querySelector('.task-side-type')
const taskThreatDOM = document.querySelector('.task-threat')
const formAlertDOM = document.querySelector('.form-alert')

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
          sideType,
          threat } = task
        return `<div class="single-task ${completed && 'task-completed'}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<h6>${bookType}</h6>
<h6>${woodType}</h6>
<h6>${measures}</h6>
<h6>${pages}</h6>
<h6>${thickness}</h6>
<h6>${wayMade}</h6>
<h6>${sideType}</h6>
<h6>${threat}</h6>
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
