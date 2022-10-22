/* global blogTableSelections */

// uncheck all checkboxes on load and remove all data from selectionsArray(s)
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false
  }
  blogTableSelections.splice(0, blogTableSelections.length)
})

// adds individual row to selections array
function checkboxClickHandler (id, tableId, selectionsArray) { // eslint-disable-line
  const headerCheckboxInputElement = document.getElementById(tableId)
    .getElementsByTagName('thead')[0]
    .getElementsByTagName('input')[0]

  const rowsArray = document.getElementById(tableId)
    .getElementsByTagName('tbody')[0]
    .getElementsByClassName('data-row')

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
function selectAllCheckboxClickHandler (tableBodyId, selectionsArray) { // eslint-disable-line
  const tbodyElement = document.getElementById(tableBodyId)
  const rowsArray = tbodyElement.querySelectorAll('.data-row')

  // if all are selected: remove and uncheck all
  if (selectionsArray.length === rowsArray.length) {
    selectionsArray.splice(0, selectionsArray.length)
    for (let i = 0; i < rowsArray.length; i++) {
      rowsArray[i].getElementsByTagName('input')[0].checked = false
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
    rowsArray[i].getElementsByTagName('input')[0].checked = true
  }
}
