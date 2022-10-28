/* global blogTableSelections */
/* global usersTableSelections */

// uncheck all checkboxes on load and remove all data from selectionsArray(s)
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false
  }
  blogTableSelections.splice(0, blogTableSelections.length)
  usersTableSelections.splice(0, usersTableSelections.length)
})

// adds individual row to selections array
function checkboxClickHandler (id, tableId, selectionsArray) { // eslint-disable-line
  const headerCheckboxInputElement = document.querySelector(`#${tableId} thead tr input`)

  const rowsArray = document.querySelectorAll(`#${tableId} tbody .data-row`)

  const idIndex = selectionsArray.indexOf(id)

  // Element already in array, uncheck it.
  if (idIndex !== -1) {
    headerCheckboxInputElement.checked = false
    selectionsArray.splice(idIndex, 1)
    return
  }

  // Element not in array, check it.
  selectionsArray.push(id)
  if (rowsArray.length === selectionsArray.length) {
    headerCheckboxInputElement.checked = true
  }
}

// adds all table rows to selections array / removes all
function selectAllCheckboxClickHandler (tableId, selectionsArray) { // eslint-disable-line
  const rowsArray = document.querySelector(`#${tableId} tbody`).getElementsByClassName('data-row')

  // if all are selected: remove and uncheck all
  if (selectionsArray.length === rowsArray.length) {
    selectionsArray.splice(0, selectionsArray.length)
    for (let i = 0; i < rowsArray.length; i++) {
      rowsArray[i].querySelector('input').checked = false
    }
    return
  }

  // add all rows that aren't selected
  for (let i = 0; i < rowsArray.length; i++) {
    const rowId = rowsArray[i].id

    // don't add row if it's already selected
    if (selectionsArray.indexOf(rowId) !== -1) continue

    selectionsArray.push(rowId)

    // set checkbox to checked
    rowsArray[i].querySelector('input').checked = true
  }
}
