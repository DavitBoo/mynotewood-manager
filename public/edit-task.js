const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const bookTypeDom = document.querySelector('.task-edit-book-type-selector')
const woodTypeSelectorDOM = document.querySelector('.wood-type-selector-edit')
const taskMeasuresDOM = document.querySelector('.task-measures-edit')
const taskPagesDOM = document.querySelector('.task-pages-edit')
const taskThicknessDOM = document.querySelector('.task-thickness-edit')
const wayMadeSelectorDOM = document.querySelector('.way-made-selector-edit')
const taskSideTypeDOM = document.querySelector('.task-side-type-edit')
const taskThreatDOM = document.querySelector('.task-threat-edit')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`)
    const { 
      _id: taskID, 
      completed, 
      name, 
      bookType, 
      woodType,
      measures,
      pages,
      thickness,
      wayMade,
      sideType,
      threat 
    } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    bookTypeDom.value = bookType
    woodTypeSelectorDOM.value = woodType
    taskMeasuresDOM.value = measures
    taskPagesDOM.value = pages
    taskThicknessDOM.value = thickness
    wayMadeSelectorDOM.value = wayMade
    taskSideTypeDOM.value = sideType
    taskThreatDOM.value = threat
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskBookType = bookTypeDom.value
    const taskWoodType = woodTypeSelectorDOM.value
    const taskMeasures = taskMeasuresDOM.value
    const taskPages = taskPagesDOM.value
    const taskThickness = taskThicknessDOM.value
    const taskWayMade = wayMadeSelectorDOM.value
    const taskSideType = taskSideTypeDOM.value
    const taskThreat = taskThreatDOM.value
    const taskCompleted = taskCompletedDOM.checked

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      bookType: taskBookType,
      woodType: taskWoodType,
      measures: taskMeasures,
      pages: taskPages,
      thickness: taskThickness,
      wayMade: taskWayMade,
      sideType: taskSideType,
      threat: taskThreat,
      completed: taskCompleted,
    })

    const { 
      _id: taskID, 
      completed, 
      name, 
      bookType, 
      woodType,
      measures,
      pages,
      thickness,
      wayMade,
      sideType,
      threat 
    } = task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    bookTypeDom.value = bookType
    woodTypeSelectorDOM.value = woodType
    taskMeasuresDOM.value = measures
    taskPagesDOM.value = pages
    taskThicknessDOM.value = thickness
    wayMadeSelectorDOM.value = wayMade
    taskSideTypeDOM.value = sideType
    taskThreatDOM.value = threat
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
