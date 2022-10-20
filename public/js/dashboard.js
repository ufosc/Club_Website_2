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
  const headerCheckboxInputElement = document.getElementById(tableId).getElementsByTagName('thead')[0].getElementsByTagName('input')[0]
  const rowsArray = document.getElementById(tableId).getElementsByTagName('tbody')[0].getElementsByClassName('data-row')
  const idIndex = selectionsArray.indexOf(id)
  if (idIndex !== -1) {
    // if all rows are selected set header checkbox to unchecked
    headerCheckboxInputElement.checked = false
    // remove id from selections array
    selectionsArray.splice(idIndex, 1)
  } else {
    // add id to selections array
    selectionsArray.push(id)
    // if all rows are selected set header checkbox to checked
    if (rowsArray.length === selectionsArray.length) { headerCheckboxInputElement.checked = true }
  }
}

// adds all table rows to selections array / removes all
function selectAllCheckboxClickHandler (tableBodyId, selectionsArray) { // eslint-disable-line
  const tbodyElement = document.getElementById(tableBodyId)
  const rowsArray = tbodyElement.querySelectorAll('.data-row')

  // if all are selected: remove all
  if (selectionsArray.length === rowsArray.length) {
    selectionsArray.splice(0, selectionsArray.length)
    // set checkboxes to unchecked
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
